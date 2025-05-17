
import React, { useState } from 'react';
import { Calendar, Download, Filter, PieChart, BarChart as BarChartIcon, LineChart as LineChartIcon, Users } from 'lucide-react';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart as RechartPieChart, Pie, Sector } from 'recharts';

// Sample data
const coursePerformanceData = [
  { name: 'Web Dev', students: 845, completion: 72, revenue: 42250 },
  { name: 'Python', students: 675, completion: 68, revenue: 33750 },
  { name: 'UI/UX', students: 290, completion: 84, revenue: 14500 },
  { name: 'React', students: 430, completion: 76, revenue: 21500 },
  { name: 'Data Science', students: 510, completion: 62, revenue: 25500 },
];

const studentGrowthData = [
  { name: 'Jan', count: 340 },
  { name: 'Feb', count: 385 },
  { name: 'Mar', count: 450 },
  { name: 'Apr', count: 520 },
  { name: 'May', count: 590 },
  { name: 'Jun', count: 650 },
  { name: 'Jul', count: 720 },
];

const completionRateData = [
  { name: 'Jan', rate: 64 },
  { name: 'Feb', rate: 68 },
  { name: 'Mar', rate: 65 },
  { name: 'Apr', rate: 70 },
  { name: 'May', rate: 72 },
  { name: 'Jun', rate: 75 },
  { name: 'Jul', rate: 78 },
];

const deviceUsageData = [
  { name: 'Desktop', value: 62 },
  { name: 'Mobile', value: 28 },
  { name: 'Tablet', value: 10 },
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('6m');
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <>
      <PageHeader
        title="Analytics Dashboard"
        description="Detailed analytics for course performance and student engagement"
      >
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </Button>
        </div>
      </PageHeader>

      <div className="flex items-center justify-between my-6">
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 max-w-xl">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
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

      <TabsContent value="overview" className="space-y-6 mt-0">
        {/* Overview stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,345</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Completion Rate</CardTitle>
              <LineChartIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">72%</div>
              <p className="text-xs text-muted-foreground">+4% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
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
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$137,500</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
              <BarChartIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">48</div>
              <p className="text-xs text-muted-foreground">+3 new this month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main overview charts */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Student Growth</CardTitle>
              <CardDescription>New student enrollments over time</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={studentGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="count" 
                    name="Students" 
                    stroke="#8884d8" 
                    strokeWidth={2}
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Course Completion Rate</CardTitle>
              <CardDescription>Average completion percentage over time</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={completionRateData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="rate" 
                    name="Completion %" 
                    stroke="#82ca9d" 
                    strokeWidth={2}
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Course Performance</CardTitle>
              <CardDescription>Enrollment and completion data by course</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={coursePerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="students" name="Students Enrolled" fill="#8884d8" />
                  <Bar yAxisId="right" dataKey="completion" name="Completion Rate (%)" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Device Usage</CardTitle>
              <CardDescription>How students access courses</CardDescription>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartPieChart>
                  <Pie
                    data={deviceUsageData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {deviceUsageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </RechartPieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle>Course Revenue</CardTitle>
              <CardDescription>Revenue by course</CardDescription>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={coursePerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                  <Legend />
                  <Bar dataKey="revenue" name="Revenue ($)" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="students" className="space-y-6 mt-0">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Student Demographics
            </CardTitle>
            <CardDescription>
              Understanding your student base
            </CardDescription>
          </CardHeader>
          <CardContent className="h-96 flex justify-center items-center">
            <div className="text-center text-muted-foreground">
              <p>Student demographics visualization will be displayed here</p>
              <p className="text-sm">Showing age, gender, location, and education level distribution</p>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Student Acquisition</CardTitle>
              <CardDescription>How new students find your courses</CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex justify-center items-center">
              <div className="text-center text-muted-foreground">
                <p>Student acquisition chart will be displayed here</p>
                <p className="text-sm">Tracking referral sources, marketing campaigns, etc.</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Student Retention</CardTitle>
              <CardDescription>How many students complete multiple courses</CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex justify-center items-center">
              <div className="text-center text-muted-foreground">
                <p>Student retention data will be displayed here</p>
                <p className="text-sm">Showing course series completion and continued enrollment</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="courses" className="space-y-6 mt-0">
        <Card>
          <CardHeader>
            <CardTitle>Course Popularity</CardTitle>
            <CardDescription>Enrollment trends across different courses</CardDescription>
          </CardHeader>
          <CardContent className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={coursePerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="students" name="Students Enrolled" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Course Completion Analysis</CardTitle>
              <CardDescription>How students progress through courses</CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex justify-center items-center">
              <div className="text-center text-muted-foreground">
                <p>Course completion funnel will be displayed here</p>
                <p className="text-sm">Showing drop-off points and completion milestones</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Content Engagement</CardTitle>
              <CardDescription>Most engaged content by type</CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex justify-center items-center">
              <div className="text-center text-muted-foreground">
                <p>Content engagement chart will be displayed here</p>
                <p className="text-sm">Showing which content types get most engagement</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="engagement" className="space-y-6 mt-0">
        <Card>
          <CardHeader>
            <CardTitle>Student Activity</CardTitle>
            <CardDescription>Daily active users and engagement metrics</CardDescription>
          </CardHeader>
          <CardContent className="h-96 flex justify-center items-center">
            <div className="text-center text-muted-foreground">
              <p>Student activity heatmap will be displayed here</p>
              <p className="text-sm">Showing peak usage times and patterns</p>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Discussion Activity</CardTitle>
              <CardDescription>Forum and comment participation</CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex justify-center items-center">
              <div className="text-center text-muted-foreground">
                <p>Discussion metrics will be displayed here</p>
                <p className="text-sm">Forums, comments, and Q&A statistics</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Quiz Performance</CardTitle>
              <CardDescription>Assessment and quiz completion rates</CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex justify-center items-center">
              <div className="text-center text-muted-foreground">
                <p>Quiz performance metrics will be displayed here</p>
                <p className="text-sm">Pass rates, retry rates, and difficulty analysis</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Video Engagement</CardTitle>
              <CardDescription>Video watch and completion metrics</CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex justify-center items-center">
              <div className="text-center text-muted-foreground">
                <p>Video engagement data will be displayed here</p>
                <p className="text-sm">Watch time, drop-off points, and rewatch rates</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </>
  );
};

export default Analytics;
