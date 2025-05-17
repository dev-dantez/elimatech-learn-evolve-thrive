
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Calendar, 
  Award,
  Brain,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import PageHeader from '@/components/common/PageHeader';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

// Mock data - would come from API in real app
const enrolledCourses = [
  {
    id: '1',
    title: 'Introduction to Web Development',
    instructor: 'John Smith',
    progress: 65,
    image: '/placeholder.svg',
    nextLesson: 'CSS Flexbox Layout',
    nextLessonTime: '25 minutes',
    lastAccessed: '2 days ago'
  },
  {
    id: '2',
    title: 'Python for Data Science',
    instructor: 'Jane Doe',
    progress: 32,
    image: '/placeholder.svg',
    nextLesson: 'Pandas DataFrames',
    nextLessonTime: '45 minutes',
    lastAccessed: '5 days ago'
  },
  {
    id: '3',
    title: 'Mobile App Development with React Native',
    instructor: 'Mike Johnson',
    progress: 18,
    image: '/placeholder.svg',
    nextLesson: 'Building Your First Screen',
    nextLessonTime: '30 minutes',
    lastAccessed: '1 week ago'
  }
];

const upcomingDeadlines = [
  { 
    id: '1', 
    title: 'JavaScript Assignment', 
    course: 'Introduction to Web Development', 
    dueDate: '2025-05-20', 
    submitted: false 
  },
  { 
    id: '2', 
    title: 'Data Visualization Project', 
    course: 'Python for Data Science', 
    dueDate: '2025-05-25', 
    submitted: false 
  },
  { 
    id: '3', 
    title: 'CSS Quiz', 
    course: 'Introduction to Web Development', 
    dueDate: '2025-05-18', 
    submitted: true 
  }
];

const achievements = [
  { 
    id: '1', 
    title: 'First Course Completed', 
    description: 'Completed your first course', 
    date: '2025-04-10', 
    icon: <Award className="h-6 w-6 text-primary" /> 
  },
  { 
    id: '2', 
    title: '7-Day Streak', 
    description: 'Studied for 7 consecutive days', 
    date: '2025-05-15', 
    icon: <TrendingUp className="h-6 w-6 text-primary" /> 
  }
];

const recommendedCourses = [
  {
    id: '4',
    title: 'Advanced JavaScript Concepts',
    instructor: 'Sarah Wilson',
    duration: '24 hours',
    level: 'Intermediate',
    image: '/placeholder.svg'
  },
  {
    id: '5',
    title: 'UI/UX Design Fundamentals',
    instructor: 'Michael Chen',
    duration: '18 hours',
    level: 'Beginner',
    image: '/placeholder.svg'
  }
];

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Student Dashboard"
        description="Welcome back! Here's an overview of your learning progress."
      >
        <Button>
          <BookOpen className="mr-2 h-4 w-4" />
          Browse Courses
        </Button>
      </PageHeader>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Courses Enrolled</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              2 in progress, 1 completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">38%</div>
            <Progress value={38} className="h-2 mt-1" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Learning Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48h 23m</div>
            <p className="text-xs text-muted-foreground">
              +2h 45m from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certificates Earned</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">
              View your certificates
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Continue Learning Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">Continue Learning</h2>
          <Link to="/my-courses" className="text-sm text-primary hover:underline">
            View all courses
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {enrolledCourses.map(course => (
            <Card key={course.id} className="overflow-hidden">
              <div className="h-32 bg-muted">
                <img 
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle className="text-base">{course.title}</CardTitle>
                </div>
                <CardDescription>{course.instructor}</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span>Progress</span>
                    <span className="font-medium">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-1" />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Next Lesson</p>
                      <p className="text-sm">{course.nextLesson}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Duration</p>
                      <p className="text-sm">{course.nextLessonTime}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/50 pt-3">
                <Button className="w-full">Continue Course</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Bottom Sections */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Upcoming Deadlines */}
        <Card className="md:row-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>Upcoming Deadlines</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingDeadlines.length > 0 ? (
              upcomingDeadlines.map((deadline) => (
                <div key={deadline.id} className="flex items-start justify-between border-b pb-3 last:border-b-0 last:pb-0">
                  <div>
                    <p className="font-medium">{deadline.title}</p>
                    <p className="text-sm text-muted-foreground">{deadline.course}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={deadline.submitted ? "outline" : "default"} className={deadline.submitted ? "bg-green-100 hover:bg-green-100 text-green-800 border-green-200" : ""}>
                        {deadline.submitted ? (
                          <>
                            <CheckCircle2 className="mr-1 h-3 w-3" />
                            Submitted
                          </>
                        ) : "Due " + new Date(deadline.dueDate).toLocaleDateString()}
                      </Badge>
                    </div>
                  </div>
                  {!deadline.submitted && (
                    <Button variant="outline" size="sm">
                      Submit
                    </Button>
                  )}
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <CheckCircle2 className="h-10 w-10 text-muted-foreground/50 mb-2" />
                <p className="text-muted-foreground">No upcoming deadlines</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* AI Tutor Widget */}
        <Card className="md:row-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              <span>AI Learning Assistant</span>
            </CardTitle>
            <CardDescription>
              Get help with your course content
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Button className="w-full bg-gradient-to-r from-elimu-primary to-elimu-accent">
                <MessageSquare className="mr-2 h-4 w-4" />
                Ask AI Tutor
              </Button>
            </div>
            <div className="text-xs text-muted-foreground">
              Recent questions:
              <ul className="mt-2 space-y-1">
                <li className="cursor-pointer hover:text-primary">"Explain how CSS flexbox works"</li>
                <li className="cursor-pointer hover:text-primary">"What are Python list comprehensions?"</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              <span>Recent Achievements</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="flex items-start gap-3 border-b pb-3 last:border-b-0 last:pb-0">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  {achievement.icon}
                </div>
                <div>
                  <p className="font-medium">{achievement.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {achievement.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Earned on {new Date(achievement.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="outline" className="w-full">
              View All Achievements
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
