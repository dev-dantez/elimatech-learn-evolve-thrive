
import React, { useState } from 'react';
import { Calendar, Download, Filter, Users, BookOpen, CreditCard, TrendingUp } from 'lucide-react';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Sample data - would come from API in real app
const revenueData = [
  { name: 'Jan', earnings: 2400 },
  { name: 'Feb', earnings: 1398 },
  { name: 'Mar', earnings: 3800 },
  { name: 'Apr', earnings: 3908 },
  { name: 'May', earnings: 4800 },
  { name: 'Jun', earnings: 5300 },
  { name: 'Jul', earnings: 4300 },
];

const enrollmentData = [
  { name: 'Jan', students: 40 },
  { name: 'Feb', students: 30 },
  { name: 'Mar', students: 50 },
  { name: 'Apr', students: 55 },
  { name: 'May', students: 60 },
  { name: 'Jun', students: 70 },
  { name: 'Jul', students: 65 },
];

const courseData = [
  { name: 'Web Dev', students: 845, completion: 72 },
  { name: 'Python', students: 675, completion: 68 },
  { name: 'UI/UX', students: 290, completion: 84 },
  { name: 'React', students: 430, completion: 76 },
  { name: 'Data Science', students: 510, completion: 62 },
];

const recentUsers = [
  { id: '1', name: 'Sarah Johnson', email: 'sarah.j@example.com', date: '2025-05-15', role: 'Student' },
  { id: '2', name: 'Michael Brown', email: 'm.brown@example.com', date: '2025-05-14', role: 'Student' },
  { id: '3', name: 'Jessica Williams', email: 'jessica.w@example.com', date: '2025-05-14', role: 'Instructor' },
  { id: '4', name: 'David Miller', email: 'david.m@example.com', date: '2025-05-13', role: 'Student' },
  { id: '5', name: 'Emily Parker', email: 'emily.p@example.com', date: '2025-05-12', role: 'Student' },
];

const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <>
      <PageHeader
        title="Admin Dashboard"
        description="Welcome to the ElimuTech LMS Admin Dashboard"
      >
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span>Export Data</span>
          </Button>
        </div>
      </PageHeader>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between mb-4">
          <TabsList className="grid grid-cols-3 w-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="12m">Last 12 months</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="text-sm font-medium text-muted-foreground">Total Students</div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,345</div>
                <p className="text-xs text-muted-foreground mt-1">+12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <div className="text-sm font-medium text-muted-foreground">Active Courses</div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78</div>
                <p className="text-xs text-muted-foreground mt-1">+3 new this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <div className="text-sm font-medium text-muted-foreground">Revenue (KES)</div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">321,490</div>
                <p className="text-xs text-muted-foreground mt-1">+8% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <div className="text-sm font-medium text-muted-foreground">Completion Rate</div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">68%</div>
                <p className="text-xs text-muted-foreground mt-1">+5% from last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 mt-4">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Student Growth</CardTitle>
                <CardDescription>New student enrollments over time</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={enrollmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="students" 
                      stroke="#8884d8" 
                      strokeWidth={2} 
                      name="New Students"
                      activeDot={{ r: 8 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>Revenue generated over time</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="earnings" 
                      stroke="#82ca9d" 
                      strokeWidth={2} 
                      name="Revenue (KES)"
                      activeDot={{ r: 8 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-3 mt-4">
            <Card className="col-span-3 md:col-span-2">
              <CardHeader>
                <CardTitle>Course Performance</CardTitle>
                <CardDescription>Enrollment and completion data by course</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={courseData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="students" fill="#8884d8" name="Students Enrolled" />
                    <Bar yAxisId="right" dataKey="completion" fill="#82ca9d" name="Completion Rate (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="col-span-3 md:col-span-1">
              <CardHeader>
                <CardTitle>Recent User Registrations</CardTitle>
                <CardDescription>New users who joined recently</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentUsers.slice(0, 4).map((user) => (
                    <div key={user.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{user.role}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full">
                  View All Users
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="students">
          <div className="grid gap-4 grid-cols-1">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Student Demographics
                  </CardTitle>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="h-96 flex justify-center items-center">
                <div className="text-center text-muted-foreground">
                  <p>Student demographics visualization will be displayed here</p>
                  <p className="text-sm">Showing age, gender, location, and education level distribution</p>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Student Engagement</CardTitle>
                  <CardDescription>Hours spent learning per week</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { week: 'Week 1', hours: 3.5 },
                        { week: 'Week 2', hours: 4.2 },
                        { week: 'Week 3', hours: 3.8 },
                        { week: 'Week 4', hours: 5.1 },
                        { week: 'Week 5', hours: 4.7 },
                        { week: 'Week 6', hours: 5.3 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="hours" stroke="#8884d8" name="Avg. Hours" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Enrollment Status</CardTitle>
                  <CardDescription>Current student enrollment status</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="h-full flex flex-col items-center justify-center">
                    <div className="grid grid-cols-2 gap-8 w-full">
                      <div className="flex flex-col items-center p-6 border rounded-lg bg-muted/20">
                        <div className="text-3xl font-bold text-primary">1,843</div>
                        <div className="text-sm text-muted-foreground mt-2">Active Students</div>
                      </div>
                      <div className="flex flex-col items-center p-6 border rounded-lg bg-muted/20">
                        <div className="text-3xl font-bold text-orange-500">502</div>
                        <div className="text-sm text-muted-foreground mt-2">Inactive Students</div>
                      </div>
                      <div className="flex flex-col items-center p-6 border rounded-lg bg-muted/20">
                        <div className="text-3xl font-bold text-green-500">412</div>
                        <div className="text-sm text-muted-foreground mt-2">Completed Courses</div>
                      </div>
                      <div className="flex flex-col items-center p-6 border rounded-lg bg-muted/20">
                        <div className="text-3xl font-bold text-blue-500">213</div>
                        <div className="text-sm text-muted-foreground mt-2">New This Week</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="courses">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78</div>
                <p className="text-xs text-muted-foreground mt-1">Across 12 categories</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Students</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,843</div>
                <p className="text-xs text-muted-foreground mt-1">+213 this week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Revenue Per Course</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">KES 4,121</div>
                <p className="text-xs text-muted-foreground mt-1">+8.2% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Completion Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">68%</div>
                <p className="text-xs text-muted-foreground mt-1">+5% from last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 mt-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Course Performance Overview</CardTitle>
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    May 2025
                  </Button>
                </div>
                <CardDescription>Course performance metrics including enrollment, completion, and revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Course Name</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Category</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Enrolled</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Completion %</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Revenue</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Rating</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:bg-muted/50">
                        <td className="p-4 align-middle">Introduction to Web Development</td>
                        <td className="p-4 align-middle">Development</td>
                        <td className="p-4 align-middle">845</td>
                        <td className="p-4 align-middle">72%</td>
                        <td className="p-4 align-middle">KES 380,250</td>
                        <td className="p-4 align-middle">4.7/5</td>
                      </tr>
                      <tr className="border-b hover:bg-muted/50">
                        <td className="p-4 align-middle">Python for Data Science</td>
                        <td className="p-4 align-middle">Data</td>
                        <td className="p-4 align-middle">675</td>
                        <td className="p-4 align-middle">68%</td>
                        <td className="p-4 align-middle">KES 303,750</td>
                        <td className="p-4 align-middle">4.8/5</td>
                      </tr>
                      <tr className="border-b hover:bg-muted/50">
                        <td className="p-4 align-middle">UI/UX Design Fundamentals</td>
                        <td className="p-4 align-middle">Design</td>
                        <td className="p-4 align-middle">290</td>
                        <td className="p-4 align-middle">84%</td>
                        <td className="p-4 align-middle">KES 130,500</td>
                        <td className="p-4 align-middle">4.9/5</td>
                      </tr>
                      <tr className="border-b hover:bg-muted/50">
                        <td className="p-4 align-middle">React for Beginners</td>
                        <td className="p-4 align-middle">Development</td>
                        <td className="p-4 align-middle">430</td>
                        <td className="p-4 align-middle">76%</td>
                        <td className="p-4 align-middle">KES 193,500</td>
                        <td className="p-4 align-middle">4.6/5</td>
                      </tr>
                      <tr className="hover:bg-muted/50">
                        <td className="p-4 align-middle">Data Science Masterclass</td>
                        <td className="p-4 align-middle">Data</td>
                        <td className="p-4 align-middle">510</td>
                        <td className="p-4 align-middle">62%</td>
                        <td className="p-4 align-middle">KES 280,500</td>
                        <td className="p-4 align-middle">4.5/5</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View All Courses</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default AdminDashboard;
