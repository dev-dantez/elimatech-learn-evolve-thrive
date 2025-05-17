
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Clock, 
  Award, 
  BarChart, 
  BookOpen, 
  Users, 
  Calendar, 
  Download, 
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Play,
  FileText,
  MessageSquare,
  Brain
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Mock data for course details
const courseData = {
  id: '1',
  title: 'Introduction to Web Development',
  description: 'A comprehensive introduction to web development, covering HTML, CSS, and JavaScript fundamentals. Learn how to build responsive websites from scratch and understand core web concepts.',
  instructor: {
    name: 'John Smith',
    bio: 'Senior Web Developer with 10+ years of experience. Specialized in frontend technologies and passionate about teaching.',
    avatar: '/placeholder.svg',
  },
  enrolledDate: '2025-04-01',
  progress: 65,
  lastActivity: '2025-05-16',
  image: '/placeholder.svg',
  level: 'Beginner',
  duration: '24 hours',
  studentsCount: 1250,
  rating: 4.8,
  category: 'Development',
  status: 'in-progress', // 'in-progress', 'completed', 'not-started'
  language: 'English',
  updatedAt: '2025-04-15',
  modules: [
    {
      id: 'm1',
      title: 'HTML Fundamentals',
      duration: '5 hours',
      progress: 100,
      lessons: [
        {
          id: 'l1',
          title: 'Introduction to HTML',
          duration: '45 minutes',
          type: 'video',
          completed: true,
        },
        {
          id: 'l2',
          title: 'HTML Document Structure',
          duration: '50 minutes',
          type: 'video',
          completed: true,
        },
        {
          id: 'l3',
          title: 'Working with Text Elements',
          duration: '55 minutes',
          type: 'video',
          completed: true,
        },
        {
          id: 'l4',
          title: 'HTML Forms & Inputs',
          duration: '60 minutes',
          type: 'video',
          completed: true,
        },
        {
          id: 'l5',
          title: 'HTML Quiz',
          duration: '30 minutes',
          type: 'quiz',
          completed: true,
        },
      ],
    },
    {
      id: 'm2',
      title: 'CSS Basics',
      duration: '6 hours',
      progress: 83,
      lessons: [
        {
          id: 'l6',
          title: 'Introduction to CSS',
          duration: '45 minutes',
          type: 'video',
          completed: true,
        },
        {
          id: 'l7',
          title: 'Selectors & Properties',
          duration: '50 minutes',
          type: 'video',
          completed: true,
        },
        {
          id: 'l8',
          title: 'Box Model & Layouts',
          duration: '60 minutes',
          type: 'video',
          completed: true,
        },
        {
          id: 'l9',
          title: 'CSS Flexbox Layout',
          duration: '55 minutes',
          type: 'video',
          completed: true,
        },
        {
          id: 'l10',
          title: 'CSS Grid Layout',
          duration: '60 minutes',
          type: 'video',
          completed: false,
        },
        {
          id: 'l11',
          title: 'CSS Quiz',
          duration: '30 minutes',
          type: 'quiz',
          completed: false,
        },
      ],
    },
    {
      id: 'm3',
      title: 'JavaScript Essentials',
      duration: '8 hours',
      progress: 25,
      lessons: [
        {
          id: 'l12',
          title: 'Introduction to JavaScript',
          duration: '45 minutes',
          type: 'video',
          completed: true,
        },
        {
          id: 'l13',
          title: 'Variables & Data Types',
          duration: '50 minutes',
          type: 'video',
          completed: true,
        },
        {
          id: 'l14',
          title: 'Functions & Scope',
          duration: '60 minutes',
          type: 'video',
          completed: false,
        },
        {
          id: 'l15',
          title: 'DOM Manipulation',
          duration: '70 minutes',
          type: 'video',
          completed: false,
        },
        {
          id: 'l16',
          title: 'Events & Event Handling',
          duration: '55 minutes',
          type: 'video',
          completed: false,
        },
        {
          id: 'l17',
          title: 'JavaScript Project',
          duration: '120 minutes',
          type: 'project',
          completed: false,
        },
        {
          id: 'l18',
          title: 'JavaScript Quiz',
          duration: '30 minutes',
          type: 'quiz',
          completed: false,
        },
      ],
    },
    {
      id: 'm4',
      title: 'Building Your First Website',
      duration: '5 hours',
      progress: 0,
      lessons: [
        {
          id: 'l19',
          title: 'Project Planning & Setup',
          duration: '45 minutes',
          type: 'video',
          completed: false,
        },
        {
          id: 'l20',
          title: 'Creating HTML Structure',
          duration: '60 minutes',
          type: 'video',
          completed: false,
        },
        {
          id: 'l21',
          title: 'Styling with CSS',
          duration: '75 minutes',
          type: 'video',
          completed: false,
        },
        {
          id: 'l22',
          title: 'Adding Interactivity with JavaScript',
          duration: '90 minutes',
          type: 'video',
          completed: false,
        },
        {
          id: 'l23',
          title: 'Final Project Submission',
          duration: '30 minutes',
          type: 'project',
          completed: false,
        },
      ],
    },
  ],
  resources: [
    { id: 'r1', name: 'HTML Cheat Sheet', type: 'PDF', size: '1.2 MB' },
    { id: 'r2', name: 'CSS Reference Guide', type: 'PDF', size: '2.4 MB' },
    { id: 'r3', name: 'JavaScript Cookbook', type: 'PDF', size: '3.5 MB' },
    { id: 'r4', name: 'Sample Code Repository', type: 'ZIP', size: '4.8 MB' },
  ],
  reviews: [
    {
      id: 'rev1',
      user: 'Emily W.',
      avatar: '/placeholder.svg',
      rating: 5,
      comment: 'Excellent course for beginners! The instructor explains concepts clearly and provides helpful examples.',
      date: '2025-04-10',
    },
    {
      id: 'rev2',
      user: 'Michael T.',
      avatar: '/placeholder.svg',
      rating: 4,
      comment: 'Great content and well-structured. Could use more practical exercises in the JavaScript section.',
      date: '2025-04-05',
    },
    {
      id: 'rev3',
      user: 'Sarah K.',
      avatar: '/placeholder.svg',
      rating: 5,
      comment: 'This course helped me transition into web development. Highly recommended!',
      date: '2025-03-28',
    },
  ]
};

// Helper function to get the current lesson
const getCurrentLesson = () => {
  for (const module of courseData.modules) {
    for (const lesson of module.lessons) {
      if (!lesson.completed) {
        return { moduleId: module.id, lesson };
      }
    }
  }
  
  // If all lessons are completed, return the last lesson
  const lastModule = courseData.modules[courseData.modules.length - 1];
  const lastLesson = lastModule.lessons[lastModule.lessons.length - 1];
  return { moduleId: lastModule.id, lesson: lastLesson };
};

// Helper function to format time string from minutes
const formatTime = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours > 0) {
    return `${hours}h ${mins > 0 ? `${mins}m` : ''}`;
  }
  
  return `${mins}m`;
};

const CourseDetails = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [currentModule, setCurrentModule] = useState<string>('m2'); // Default to CSS module
  
  const { moduleId, lesson } = getCurrentLesson();
  
  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Play className="h-4 w-4" />;
      case 'quiz':
        return <FileText className="h-4 w-4" />;
      case 'project':
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };
  
  // We'd normally fetch course data based on the courseId parameter
  // For now, we'll just use our mock data

  return (
    <div className="space-y-8 pb-16">
      {/* Course Header */}
      <div className="relative rounded-xl overflow-hidden">
        <div className="h-48 md:h-64 bg-muted">
          <img 
            src={courseData.image}
            alt={courseData.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
          <div className="flex flex-wrap gap-2 mb-2">
            <Badge variant="secondary" className="bg-primary text-primary-foreground">
              {courseData.category}
            </Badge>
            <Badge variant="outline" className="bg-black/40 text-white border-white/20">
              {courseData.level}
            </Badge>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">{courseData.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 mt-2">
            <div className="flex items-center gap-1">
              <Avatar className="h-6 w-6">
                <AvatarImage src={courseData.instructor.avatar} alt={courseData.instructor.name} />
                <AvatarFallback>{courseData.instructor.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm">{courseData.instructor.name}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span className="text-sm">{courseData.duration}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span className="text-sm">{courseData.studentsCount.toLocaleString()} students</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">Last updated {new Date(courseData.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Progress Card */}
      <div className="bg-muted/50 border rounded-lg p-4 md:p-6">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <h2 className="text-lg font-medium mb-2">Your Progress</h2>
            <div className="mb-2">
              <div className="flex items-center justify-between text-sm mb-1">
                <span>{courseData.progress}% complete</span>
                <span>{Math.round(courseData.progress / 100 * courseData.modules.reduce((acc, module) => acc + module.lessons.length, 0))} / {courseData.modules.reduce((acc, module) => acc + module.lessons.length, 0)} lessons</span>
              </div>
              <Progress value={courseData.progress} className="h-2" />
            </div>
            <p className="text-sm text-muted-foreground">
              Last activity: {new Date(courseData.lastActivity).toLocaleDateString()}
            </p>
          </div>
          
          <div className="flex items-center justify-center md:justify-end">
            <Button size="lg" className="w-full md:w-auto">
              <Play className="mr-2 h-4 w-4" />
              Continue Learning
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main Content Tabs */}
      <Tabs defaultValue="curriculum" className="space-y-6">
        <TabsList className="w-full md:w-auto grid grid-cols-3 md:inline-flex">
          <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>
        
        {/* Curriculum Tab */}
        <TabsContent value="curriculum" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Modules List */}
            <div className="space-y-4">
              <h3 className="font-medium">Course Modules</h3>
              
              <div className="space-y-2">
                {courseData.modules.map((module) => (
                  <div 
                    key={module.id} 
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${module.id === currentModule ? 'border-primary bg-primary/5' : 'hover:bg-muted'}`}
                    onClick={() => setCurrentModule(module.id)}
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{module.title}</h4>
                      <Badge variant="outline">{module.progress}%</Badge>
                    </div>
                    <div className="mt-1 flex justify-between items-center text-sm text-muted-foreground">
                      <span>{module.lessons.length} lessons</span>
                      <span>{module.duration}</span>
                    </div>
                    <Progress value={module.progress} className="mt-2 h-1" />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Current Module Lessons */}
            <div className="md:col-span-2 space-y-4">
              {courseData.modules.filter(m => m.id === currentModule).map((module) => (
                <div key={module.id}>
                  <h3 className="font-medium">{module.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{module.lessons.length} lessons · {module.duration}</p>
                  
                  <div className="space-y-2">
                    {module.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${lesson.id === lesson?.id ? 'border-primary bg-primary/5' : 'hover:bg-muted'}`}
                      >
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${lesson.completed ? 'bg-green-100 text-green-600' : 'bg-muted'}`}>
                          {lesson.completed ? (
                            <CheckCircle2 className="h-5 w-5" />
                          ) : (
                            getLessonIcon(lesson.type)
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <h4 className="font-medium">{lesson.title}</h4>
                            <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-[10px] py-0 px-1.5 h-4">
                              {lesson.type.charAt(0).toUpperCase() + lesson.type.slice(1)}
                            </Badge>
                            {lesson.completed && (
                              <span className="flex items-center text-xs text-green-600">
                                <CheckCircle2 className="mr-1 h-3 w-3" />
                                Completed
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              {/* Course Description */}
              <div>
                <h3 className="text-lg font-medium mb-2">About This Course</h3>
                <p className="text-muted-foreground">{courseData.description}</p>
              </div>
              
              {/* What You'll Learn */}
              <div>
                <h3 className="text-lg font-medium mb-2">What You'll Learn</h3>
                <ul className="grid md:grid-cols-2 gap-2">
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>HTML fundamentals and document structure</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>CSS styling and layouts (Flexbox and Grid)</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>JavaScript fundamentals and DOM manipulation</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>Building responsive websites</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>Web development best practices</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>Creating forms and handling user input</span>
                  </li>
                </ul>
              </div>
              
              {/* Reviews */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium">Student Reviews</h3>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {courseData.reviews.map((review) => (
                    <div key={review.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={review.avatar} alt={review.user} />
                            <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <span className="font-medium">{review.user}</span>
                            <div className="flex items-center mt-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`h-3.5 w-3.5 ${i < review.rating ? 'text-amber-500 fill-amber-500' : 'text-muted-foreground'}`} />
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              {/* Instructor */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Instructor</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={courseData.instructor.avatar} alt={courseData.instructor.name} />
                      <AvatarFallback>{courseData.instructor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{courseData.instructor.name}</h4>
                      <p className="text-sm text-muted-foreground">Web Development Instructor</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {courseData.instructor.bio}
                  </p>
                </CardContent>
              </Card>
              
              {/* AI Tutor */}
              <Card className="bg-gradient-to-br from-primary/10 to-accent/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    <span>AI Learning Assistant</span>
                  </CardTitle>
                  <CardDescription>
                    Get help with course content anytime
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg bg-background border p-3 text-sm">
                    <p className="font-medium">Ask your question:</p>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center gap-2 p-2 rounded-md hover:bg-muted cursor-pointer">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        <span>Explain how CSS flexbox works</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 rounded-md hover:bg-muted cursor-pointer">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        <span>What is the difference between inline and block elements?</span>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-elimu-primary to-elimu-accent">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Ask AI Tutor
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Course Resources</h3>
            <p className="text-muted-foreground">
              Download supplementary materials for the course.
            </p>
            
            <div className="grid gap-2">
              {courseData.resources.map((resource) => (
                <div 
                  key={resource.id} 
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded bg-primary/10 text-primary flex items-center justify-center">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">{resource.name}</p>
                      <p className="text-xs text-muted-foreground">{resource.type} · {resource.size}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseDetails;
