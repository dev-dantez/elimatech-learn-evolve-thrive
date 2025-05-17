
import React from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '@/components/common/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Play, FileText, Download, CheckCircle, Clock, Calendar, BookOpen } from 'lucide-react';

const CourseDetails = () => {
  const { courseId } = useParams();
  
  // This would come from an API call in a real app
  const course = {
    id: courseId || '1',
    title: 'Introduction to Web Development',
    description: 'Learn the fundamentals of web development including HTML, CSS, and JavaScript.',
    category: 'Development',
    level: 'Beginner',
    duration: '12 hours',
    totalLessons: 28,
    completedLessons: 12,
    progress: 42, // percentage
    instructor: {
      name: 'Sarah Johnson',
      title: 'Senior Developer & Educator',
      avatar: '/placeholder.svg',
    },
    rating: 4.7,
    ratingCount: 145,
    enrolled: 1253,
    createdAt: '2023-03-15',
    updatedAt: '2023-05-20',
    modules: [
      {
        id: 1,
        title: 'Getting Started with HTML',
        description: 'Learn the basics of HTML structure',
        duration: '2h 30m',
        lessons: [
          {
            id: 1,
            title: 'Introduction to HTML',
            type: 'video',
            duration: '15m',
            completed: true
          },
          {
            id: 2,
            title: 'HTML Document Structure',
            type: 'video',
            duration: '20m',
            completed: true
          },
          {
            id: 3,
            title: 'Working with HTML Tags',
            type: 'video',
            duration: '25m',
            completed: true
          },
          {
            id: 4,
            title: 'HTML Quiz',
            type: 'quiz',
            duration: '15m',
            completed: false
          }
        ]
      },
      {
        id: 2,
        title: 'CSS Fundamentals',
        description: 'Style your web pages with CSS',
        duration: '3h 15m',
        lessons: [
          {
            id: 5,
            title: 'Introduction to CSS',
            type: 'video',
            duration: '20m',
            completed: true
          },
          {
            id: 6,
            title: 'CSS Selectors',
            type: 'video',
            duration: '25m',
            completed: true
          },
          {
            id: 7,
            title: 'CSS Box Model',
            type: 'video',
            duration: '30m',
            completed: true
          },
          {
            id: 8,
            title: 'CSS Layouts',
            type: 'video',
            duration: '35m',
            completed: false
          },
          {
            id: 9,
            title: 'CSS Assignment',
            type: 'assignment',
            duration: '1h',
            completed: false
          }
        ]
      },
      {
        id: 3,
        title: 'JavaScript Basics',
        description: 'Add interactivity to your website',
        duration: '4h 45m',
        lessons: [
          {
            id: 10,
            title: 'Introduction to JavaScript',
            type: 'video',
            duration: '25m',
            completed: true
          },
          {
            id: 11,
            title: 'JavaScript Variables and Data Types',
            type: 'video',
            duration: '30m',
            completed: true
          },
          {
            id: 12,
            title: 'JavaScript Functions',
            type: 'video',
            duration: '35m',
            completed: true
          },
          {
            id: 13,
            title: 'DOM Manipulation',
            type: 'video',
            duration: '40m',
            completed: false
          },
          {
            id: 14,
            title: 'Events in JavaScript',
            type: 'video',
            duration: '30m',
            completed: false
          },
          {
            id: 15,
            title: 'JavaScript Project',
            type: 'project',
            duration: '2h',
            completed: false
          }
        ]
      }
    ]
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Play className="h-4 w-4" />;
      case 'quiz':
        return <FileText className="h-4 w-4" />;
      case 'assignment':
        return <FileText className="h-4 w-4" />;
      case 'project':
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <>
      <PageHeader 
        title={course.title} 
        description={`Learn ${course.title} with ${course.instructor.name}`}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main content */}
        <div className="lg:col-span-2">
          {/* Course Tabs */}
          <Tabs defaultValue="content" className="mb-6">
            <TabsList className="mb-4">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            {/* Content Tab */}
            <TabsContent value="content">
              <Card>
                <CardHeader>
                  <CardTitle>Course Content</CardTitle>
                  <CardDescription>
                    {course.totalLessons} lessons • {course.duration} total length
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {course.modules.map((module) => (
                      <div key={module.id} className="border rounded-lg">
                        <div className="bg-muted/40 p-4 flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">{module.title}</h3>
                            <p className="text-sm text-muted-foreground">{module.description} • {module.duration}</p>
                          </div>
                          <Badge variant="outline">{module.lessons.length} Lessons</Badge>
                        </div>
                        <div className="divide-y">
                          {module.lessons.map((lesson) => (
                            <div 
                              key={lesson.id} 
                              className={`p-4 flex items-center justify-between ${lesson.completed ? 'bg-muted/20' : ''}`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`rounded-full p-1.5 ${lesson.completed ? 'bg-green-100 text-green-700' : 'bg-muted'}`}>
                                  {lesson.completed ? <CheckCircle className="h-4 w-4" /> : getLessonIcon(lesson.type)}
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium">{lesson.title}</h4>
                                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <span className="capitalize">{lesson.type}</span>
                                    <span>•</span>
                                    <span>{lesson.duration}</span>
                                  </div>
                                </div>
                              </div>
                              <Button variant="ghost" size="sm">
                                {lesson.completed ? 'Revisit' : 'Start'}
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Overview Tab */}
            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>Course Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">About This Course</h3>
                    <p className="text-muted-foreground">
                      {course.description} This comprehensive course is designed for beginners who want to enter the field of web development. 
                      Through a series of hands-on projects, you'll gain the skills to build responsive and interactive websites from scratch.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">What You'll Learn</h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Create structured web content with HTML5</li>
                      <li>Style web pages using CSS3 and responsive design techniques</li>
                      <li>Implement interactive features using JavaScript</li>
                      <li>Deploy websites to production environments</li>
                      <li>Optimize websites for performance and accessibility</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Prerequisites</h3>
                    <p className="text-muted-foreground">
                      No prior programming experience is required. Basic computer skills and a willingness to learn are all you need to get started.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Resources Tab */}
            <TabsContent value="resources">
              <Card>
                <CardHeader>
                  <CardTitle>Course Resources</CardTitle>
                  <CardDescription>
                    Downloadable materials to support your learning
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between border p-4 rounded-md">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <h4 className="text-sm font-medium">Resource File {i}.pdf</h4>
                          <p className="text-xs text-muted-foreground">PDF • 2.4 MB</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Reviews Tab */}
            <TabsContent value="reviews">
              <Card>
                <CardHeader>
                  <CardTitle>Student Reviews</CardTitle>
                  <CardDescription>
                    {course.ratingCount} reviews • {course.rating} average rating
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-2">
                    <div className="text-3xl font-bold">{course.rating}</div>
                    <div className="flex text-yellow-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className="h-5 w-5" 
                          fill={star <= Math.floor(course.rating) ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { name: 'Michael K.', rating: 5, comment: 'Excellent course! The instructor explains complex concepts in a clear and concise manner.' },
                      { name: 'Jane S.', rating: 4, comment: 'Great content but I would have liked more practice exercises.' },
                      { name: 'David L.', rating: 5, comment: 'This course helped me land my first web development job. Highly recommended!' }
                    ].map((review, i) => (
                      <div key={i} className="border-t pt-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{review.name}</span>
                          </div>
                          <div className="flex text-yellow-400">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star} 
                                className="h-4 w-4" 
                                fill={star <= review.rating ? "currentColor" : "none"} 
                              />
                            ))}
                          </div>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Sidebar */}
        <div>
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Your Progress</h3>
                <Progress value={course.progress} className="h-2 mb-1" />
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{course.completedLessons} of {course.totalLessons} lessons completed</span>
                  <span>{course.progress}%</span>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{course.duration} total length</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{course.totalLessons} lessons</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Last updated {course.updatedAt}</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <Button className="w-full">Continue Learning</Button>
                <Button variant="outline" className="w-full">Download Resources</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default CourseDetails;
