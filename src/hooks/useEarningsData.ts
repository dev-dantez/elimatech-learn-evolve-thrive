
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { getTutorEarnings, getTutorCourses, getPaymentsByTutor } from '@/services/courseService';

export interface RevenueDataPoint {
  month: string;
  revenue: number;
  enrollments: number;
}

export interface CourseEarning {
  id: string;
  course: string;
  enrollments: number;
  revenue: number;
  rating: number;
  lastEnrolled: string;
}

export interface Payment {
  id: string;
  amount: number;
  date: string;
  courses: string;
  enrollments: number;
  status: string;
}

export const useEarningsData = (timeRange: string) => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        setUserId(data.session.user.id);
      }
    };
    
    checkUser();
  }, []);

  const { data: earningsData, isLoading: earningsLoading } = useQuery({
    queryKey: ['tutor-earnings', userId, timeRange],
    queryFn: () => userId ? getTutorEarnings(userId) : Promise.resolve({ totalEarnings: 0, payments: [] }),
    enabled: !!userId,
  });

  const { data: coursesData, isLoading: coursesLoading } = useQuery({
    queryKey: ['tutor-courses', userId],
    queryFn: () => userId ? getTutorCourses(userId) : Promise.resolve([]),
    enabled: !!userId,
  });

  const { data: paymentsData, isLoading: paymentsLoading } = useQuery({
    queryKey: ['tutor-payments', userId, timeRange],
    queryFn: () => userId ? getPaymentsByTutor(userId) : Promise.resolve([]),
    enabled: !!userId,
  });

  const prepareRevenueChartData = (): RevenueDataPoint[] => {
    if (!paymentsData || paymentsData.length === 0) {
      return [];
    }

    const monthlyData: Record<string, { revenue: number, enrollments: number }> = {};
    const now = new Date();
    const monthsToShow = timeRange === '1m' ? 1 : timeRange === '3m' ? 3 : timeRange === '6m' ? 6 : 12;
    
    // Initialize months
    for (let i = 0; i < monthsToShow; i++) {
      const date = new Date(now);
      date.setMonth(now.getMonth() - i);
      const monthKey = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      monthlyData[monthKey] = { revenue: 0, enrollments: 0 };
    }
    
    // Fill with actual data
    paymentsData.forEach(payment => {
      if (!payment.paid_at) return;
      
      const paymentDate = new Date(payment.paid_at);
      const monthsSince = (now.getFullYear() - paymentDate.getFullYear()) * 12 + now.getMonth() - paymentDate.getMonth();
      
      if (monthsSince < monthsToShow) {
        const monthKey = paymentDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        
        if (!monthlyData[monthKey]) {
          monthlyData[monthKey] = { revenue: 0, enrollments: 0 };
        }
        
        monthlyData[monthKey].revenue += payment.amount || 0;
        monthlyData[monthKey].enrollments += 1;
      }
    });
    
    // Convert to array and sort
    return Object.entries(monthlyData)
      .map(([month, data]) => ({
        month,
        revenue: data.revenue,
        enrollments: data.enrollments
      }))
      .sort((a, b) => {
        const dateA = new Date(a.month);
        const dateB = new Date(b.month);
        return dateA.getTime() - dateB.getTime();
      });
  };

  const revenueData = prepareRevenueChartData();
  
  const courseEarnings: CourseEarning[] = coursesData && coursesData.length > 0 
    ? coursesData.map(course => {
        const coursePayments = paymentsData?.filter(p => p.course_id === course.id) || [];
        const courseRevenue = coursePayments.reduce((sum, p) => sum + (p.amount || 0), 0);
        const courseEnrollments = coursePayments.length;
        const lastPayment = coursePayments.sort((a, b) => 
          new Date(b.paid_at || '').getTime() - new Date(a.paid_at || '').getTime()
        )[0];
        
        return {
          id: course.id,
          course: course.title,
          enrollments: courseEnrollments,
          revenue: courseRevenue,
          rating: 4.5, // Default rating since we don't have this data yet
          lastEnrolled: lastPayment?.paid_at || new Date().toISOString(),
        };
      })
    : [];

  // Use real payment data - no default data
  const paymentHistory: Payment[] = paymentsData && paymentsData.length > 0
    ? paymentsData.slice(0, 5).map(payment => ({
        id: payment.transaction_ref || payment.id,
        amount: payment.amount || 0,
        date: payment.paid_at || new Date().toISOString(),
        courses: 'Course Payment',
        enrollments: 1,
        status: payment.status || 'paid'
      }))
    : [];

  // Calculate totals from real data
  const totalRevenue = earningsData?.totalEarnings || courseEarnings.reduce((sum, course) => sum + course.revenue, 0);
  const totalEnrollments = courseEarnings.reduce((sum, course) => sum + course.enrollments, 0);

  const isLoading = earningsLoading || coursesLoading || paymentsLoading;

  return {
    revenueData,
    courseEarnings,
    paymentHistory,
    totalRevenue,
    totalEnrollments,
    isLoading,
    userId
  };
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount / 100);
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};
