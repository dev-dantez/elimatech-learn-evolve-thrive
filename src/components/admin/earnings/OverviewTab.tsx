
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import RevenueOverviewChart from './RevenueOverviewChart';
import CourseRevenueChart from './CourseRevenueChart';
import PaymentHistoryList from './PaymentHistoryList';

interface CourseEarning {
  id: string;
  course: string;
  enrollments: number;
  revenue: number;
  rating: number;
  lastEnrolled: string;
}

interface Payment {
  id: string;
  amount: number;
  date: string;
  courses: string;
  enrollments: number;
  status: string;
}

interface OverviewTabProps {
  revenueData: Array<{
    month: string;
    revenue: number;
    enrollments: number;
  }>;
  courseEarnings: CourseEarning[];
  paymentHistory: Payment[];
  formatCurrency: (amount: number) => string;
  formatDate: (dateString: string) => string;
}

const OverviewTab: React.FC<OverviewTabProps> = ({
  revenueData,
  courseEarnings,
  paymentHistory,
  formatCurrency,
  formatDate
}) => {
  const hasRevenueData = revenueData && revenueData.length > 0;
  const hasCourseData = courseEarnings && courseEarnings.length > 0;
  const hasPaymentData = paymentHistory && paymentHistory.length > 0;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Revenue Overview</CardTitle>
          <CardDescription>Your earnings and enrollments over time</CardDescription>
        </CardHeader>
        <CardContent className="h-96">
          {hasRevenueData ? (
            <RevenueOverviewChart data={revenueData} />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">No revenue data available yet</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Course</CardTitle>
            <CardDescription>How each course contributes to your revenue</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <CourseRevenueChart 
              data={hasCourseData ? courseEarnings.map(course => ({
                name: course.course.length > 20 ? course.course.substring(0, 20) + '...' : course.course,
                revenue: course.revenue / 100, // Converting cents to dollars for better visualization
              })) : []}
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Payouts</CardTitle>
            <CardDescription>Your most recent payment transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <PaymentHistoryList 
              payments={paymentHistory} 
              formatCurrency={formatCurrency} 
              formatDate={formatDate} 
            />
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" disabled={!hasPaymentData}>View All Payouts</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default OverviewTab;
