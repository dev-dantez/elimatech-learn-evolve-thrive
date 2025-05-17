
import React, { useState } from 'react';
import { Download, Calendar, TrendingUp, CreditCard, ChevronDown, ChevronUp, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import PageHeader from '@/components/common/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

// Mock data
const revenueData = [
  { month: 'Jan', revenue: 2450, enrollments: 12 },
  { month: 'Feb', revenue: 3680, enrollments: 18 },
  { month: 'Mar', revenue: 5200, enrollments: 25 },
  { month: 'Apr', revenue: 3950, enrollments: 19 },
  { month: 'May', revenue: 4800, enrollments: 22 },
  { month: 'Jun', revenue: 6500, enrollments: 32 },
];

// Mock course earnings data
const courseEarnings = [
  { 
    id: '1',
    course: 'Introduction to Web Development',
    enrollments: 245,
    revenue: 122500,
    rating: 4.8,
    lastEnrolled: '2025-05-15',
  },
  { 
    id: '2',
    course: 'Advanced JavaScript Concepts',
    enrollments: 178,
    revenue: 89000,
    rating: 4.7,
    lastEnrolled: '2025-05-16',
  },
  { 
    id: '3',
    course: 'UI/UX Design Fundamentals',
    enrollments: 312,
    revenue: 156000,
    rating: 4.9,
    lastEnrolled: '2025-05-17',
  },
  { 
    id: '4',
    course: 'Python for Data Science',
    enrollments: 195,
    revenue: 97500,
    rating: 4.6,
    lastEnrolled: '2025-05-14',
  },
  { 
    id: '5',
    course: 'Mobile App Development with React Native',
    enrollments: 163,
    revenue: 81500,
    rating: 4.5,
    lastEnrolled: '2025-05-13',
  },
];

// Mock payment history
const paymentHistory = [
  {
    id: 'pmt_001',
    amount: 56700,
    date: '2025-05-15',
    courses: 'Multiple Courses',
    enrollments: 12,
    status: 'paid'
  },
  {
    id: 'pmt_002',
    amount: 42500,
    date: '2025-05-01',
    courses: 'Multiple Courses',
    enrollments: 9,
    status: 'paid'
  },
  {
    id: 'pmt_003',
    amount: 38900,
    date: '2025-04-15',
    courses: 'Multiple Courses',
    enrollments: 8,
    status: 'paid'
  },
];

const Earnings = () => {
  const [timeRange, setTimeRange] = useState('6m');
  const [activeTab, setActiveTab] = useState('overview');
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount / 100);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Calculate total revenue
  const totalRevenue = courseEarnings.reduce((sum, course) => sum + course.revenue, 0);
  const totalEnrollments = courseEarnings.reduce((sum, course) => sum + course.enrollments, 0);

  return (
    <div className="space-y-8">
      <PageHeader 
        title="Instructor Earnings" 
        description="Track your course earnings and revenue"
      >
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
      </PageHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Enrollments</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEnrollments}</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8/5.0</div>
            <p className="text-xs text-muted-foreground">+0.2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M6 8.32a7.43 7.43 0 0 1 12 0" />
              <line x1="4" x2="20" y1="4" y2="4" />
              <line x1="12" x2="12" y1="4" y2="22" />
              <path d="m9 22 3-3 3 3" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Added 1 this month</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex items-center justify-between">
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">Course Earnings</TabsTrigger>
            <TabsTrigger value="payouts">Payouts</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">Last Month</SelectItem>
              <SelectItem value="3m">Last 3 Months</SelectItem>
              <SelectItem value="6m">Last 6 Months</SelectItem>
              <SelectItem value="1y">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <TabsContent value="overview" className="mt-0">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Your earnings and enrollments over time</CardDescription>
          </CardHeader>
          <CardContent className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={revenueData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 10,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="revenue"
                  name="Revenue ($)"
                  stroke="#8884d8"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="enrollments" 
                  name="Enrollments" 
                  stroke="#82ca9d" 
                  strokeWidth={2} 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue by Course</CardTitle>
              <CardDescription>How each course contributes to your revenue</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={courseEarnings.map(course => ({
                    name: course.course.length > 20 ? course.course.substring(0, 20) + '...' : course.course,
                    revenue: course.revenue / 100, // Converting cents to dollars for better visualization
                  }))}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 60,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip formatter={(value) => ['$' + value, 'Revenue']} />
                  <Bar dataKey="revenue" name="Revenue ($)" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Payouts</CardTitle>
              <CardDescription>Your most recent payment transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentHistory.map(payment => (
                  <div key={payment.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium">{formatCurrency(payment.amount)}</p>
                      <p className="text-sm text-muted-foreground">{formatDate(payment.date)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">{payment.enrollments} enrollments</p>
                      <p className="text-xs text-muted-foreground">ID: {payment.id}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View All Payouts</Button>
            </CardFooter>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="courses" className="mt-0">
        <Card>
          <CardHeader>
            <CardTitle>Course Revenue Breakdown</CardTitle>
            <CardDescription>Performance metrics for each of your courses</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead className="text-right">Enrollments</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                  <TableHead className="text-center">Rating</TableHead>
                  <TableHead>Last Enrolled</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courseEarnings.map(course => (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium">{course.course}</TableCell>
                    <TableCell className="text-right">{course.enrollments}</TableCell>
                    <TableCell className="text-right">{formatCurrency(course.revenue)}</TableCell>
                    <TableCell className="text-center">{course.rating}/5.0</TableCell>
                    <TableCell>{formatDate(course.lastEnrolled)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="ml-auto">
              <Download className="h-4 w-4 mr-2" />
              Export Course Data
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="payouts" className="mt-0">
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>Record of all your payout transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Enrollments</TableHead>
                  <TableHead>Courses</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentHistory.map(payment => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.id}</TableCell>
                    <TableCell>{formatDate(payment.date)}</TableCell>
                    <TableCell>{payment.enrollments}</TableCell>
                    <TableCell>{payment.courses}</TableCell>
                    <TableCell className="text-right">{formatCurrency(payment.amount)}</TableCell>
                    <TableCell className="text-right">
                      <span className="capitalize px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {payment.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">
              Payouts are processed on the 1st and 15th of each month.
            </p>
            <Button variant="outline" className="ml-auto">
              <Download className="h-4 w-4 mr-2" />
              Download Statement
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </div>
  );
};

export default Earnings;
