
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, BookOpen, Clock, Users, Star, CheckCircle2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import PageHeader from '@/components/common/PageHeader';

// Mock data for courses
const myCourses = [
  {
    id: '1',
    title: 'Introduction to Web Development',
    description: 'Learn HTML, CSS, and JavaScript fundamentals',
    instructor: 'John Smith',
    enrolledDate: '2025-04-01',
    progress: 65,
    image: '/placeholder.svg',
    level: 'Beginner',
    duration: '24 hours',
    studentsCount: 1250,
    rating: 4.8,
    category: 'Development',
    status: 'in-progress' // 'in-progress', 'completed', 'not-started'
  },
  {
    id: '2',
    title: 'Python for Data Science',
    description: 'Master Python programming for data analysis',
    instructor: 'Jane Doe',
    enrolledDate: '2025-04-15',
    progress: 32,
    image: '/placeholder.svg',
    level: 'Intermediate',
    duration: '36 hours',
    studentsCount: 890,
    rating: 4.6,
    category: 'Data Science',
    status: 'in-progress'
  },
  {
    id: '3',
    title: 'Mobile App Development with React Native',
    description: 'Build cross-platform mobile apps',
    instructor: 'Mike Johnson',
    enrolledDate: '2025-05-01',
    progress: 18,
    image: '/placeholder.svg',
    level: 'Advanced',
    duration: '40 hours',
    studentsCount: 750,
    rating: 4.7,
    category: 'Development',
    status: 'in-progress'
  },
  {
    id: '4',
    title: 'Introduction to Digital Marketing',
    description: 'Learn the fundamentals of digital marketing',
    instructor: 'Sarah Adams',
    enrolledDate: '2025-03-15',
    progress: 100,
    image: '/placeholder.svg',
    level: 'Beginner',
    duration: '15 hours',
    studentsCount: 2100,
    rating: 4.5,
    category: 'Marketing',
    status: 'completed'
  },
  {
    id: '5',
    title: 'UI/UX Design Principles',
    description: 'Learn design principles for better user interfaces',
    instructor: 'David Wilson',
    enrolledDate: '2025-05-10',
    progress: 0,
    image: '/placeholder.svg',
    level: 'Beginner',
    duration: '20 hours',
    studentsCount: 1050,
    rating: 4.9,
    category: 'Design',
    status: 'not-started'
  }
];

// Mock data for available courses
const availableCourses = [
  {
    id: '6',
    title: 'Advanced JavaScript Concepts',
    description: 'Master advanced JavaScript techniques and patterns',
    instructor: 'Daniel Brown',
    image: '/placeholder.svg',
    level: 'Advanced',
    duration: '30 hours',
    studentsCount: 680,
    rating: 4.7,
    category: 'Development',
    price: 4999 // in KES
  },
  {
    id: '7',
    title: 'Data Visualization with D3.js',
    description: 'Create interactive data visualizations on the web',
    instructor: 'Emma Johnson',
    image: '/placeholder.svg',
    level: 'Intermediate',
    duration: '24 hours',
    studentsCount: 520,
    rating: 4.5,
    category: 'Data Science',
    price: 3999
  },
  {
    id: '8',
    title: 'Social Media Marketing',
    description: 'Learn to create effective social media marketing campaigns',
    instructor: 'Karen Smith',
    image: '/placeholder.svg',
    level: 'Beginner',
    duration: '18 hours',
    studentsCount: 1450,
    rating: 4.6,
    category: 'Marketing',
    price: 2999
  },
  {
    id: '9',
    title: 'Machine Learning Fundamentals',
    description: 'Introduction to machine learning algorithms and applications',
    instructor: 'Robert Chen',
    image: '/placeholder.svg',
    level: 'Intermediate',
    duration: '40 hours',
    studentsCount: 760,
    rating: 4.8,
    category: 'Data Science',
    price: 5999
  }
];

interface CourseFilters {
  category: string;
  level: string;
  status: string;
}

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<CourseFilters>({
    category: '',
    level: '',
    status: ''
  });
  
  // Filter my courses based on search query and filters
  const filteredMyCourses = myCourses.filter(course => {
    // Search filter
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Category filter
    const matchesCategory = !filters.category || course.category === filters.category;
    
    // Level filter
    const matchesLevel = !filters.level || course.level === filters.level;
    
    // Status filter
    const matchesStatus = !filters.status || course.status === filters.status;
    
    return matchesSearch && matchesCategory && matchesLevel && matchesStatus;
  });

  // Filter available courses based on search query
  const filteredAvailableCourses = availableCourses.filter(course => {
    return course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
           course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
           course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const clearFilters = () => {
    setFilters({
      category: '',
      level: '',
      status: ''
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in-progress':
        return <Badge variant="outline" className="bg-blue-100 hover:bg-blue-100 text-blue-800 border-blue-200">In Progress</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-100 hover:bg-green-100 text-green-800 border-green-200">Completed</Badge>;
      case 'not-started':
        return <Badge variant="outline" className="bg-gray-100 hover:bg-gray-100 text-gray-800 border-gray-200">Not Started</Badge>;
      default:
        return null;
    }
  };

  const anyFiltersActive = filters.category || filters.level || filters.status;

  return (
    <div className="space-y-8">
      <PageHeader
        title="Courses"
        description="Browse and manage your learning journey"
      />

      <Tabs defaultValue="my-courses" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="my-courses">My Courses</TabsTrigger>
          <TabsTrigger value="explore">Explore</TabsTrigger>
        </TabsList>

        {/* My Courses Tab */}
        <TabsContent value="my-courses" className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="flex items-center gap-2">
                <Select
                  value={filters.category}
                  onValueChange={(value) => setFilters({...filters, category: value})}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
                    <SelectItem value="Development">Development</SelectItem>
                    <SelectItem value="Data Science">Data Science</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={filters.level}
                  onValueChange={(value) => setFilters({...filters, level: value})}
                >
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Levels</SelectItem>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={filters.status}
                  onValueChange={(value) => setFilters({...filters, status: value})}
                >
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Statuses</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="not-started">Not Started</SelectItem>
                  </SelectContent>
                </Select>

                {anyFiltersActive && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={clearFilters}
                    className="ml-1 h-9 w-9"
                    aria-label="Clear filters"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Course list */}
          {filteredMyCourses.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredMyCourses.map((course) => (
                <Link to={`/courses/${course.id}`} key={course.id} className="group">
                  <Card className="overflow-hidden h-full transition-all hover:border-primary/50 hover:shadow-md">
                    <div className="h-40 bg-muted relative">
                      <img 
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        {getStatusBadge(course.status)}
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {course.title}
                      </CardTitle>
                      <CardDescription>{course.instructor}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {course.description}
                      </p>
                      {course.status !== 'not-started' && (
                        <div>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span>Progress</span>
                            <span className="font-medium">{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-1" />
                        </div>
                      )}
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-2 text-sm">
                        <div className="flex items-center gap-1.5">
                          <BookOpen className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{course.level}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{course.studentsCount.toLocaleString()} students</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Star className="h-3.5 w-3.5 text-amber-500" />
                          <span>{course.rating}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button className="w-full" variant={course.status === 'in-progress' ? 'default' : 'outline'}>
                        {course.status === 'not-started' ? 'Start Course' : 
                         course.status === 'in-progress' ? 'Continue Learning' : 
                         'View Certificate'}
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <div className="rounded-full bg-muted p-3">
                <Search className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-medium">No courses found</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              {anyFiltersActive && (
                <Button variant="outline" onClick={clearFilters} className="mt-4">
                  Clear Filters
                </Button>
              )}
            </div>
          )}
        </TabsContent>

        {/* Explore Tab */}
        <TabsContent value="explore" className="space-y-6">
          {/* Search */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Course list */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredAvailableCourses.map((course) => (
              <Link to={`/courses/${course.id}`} key={course.id} className="group">
                <Card className="overflow-hidden h-full transition-all hover:border-primary/50 hover:shadow-md">
                  <div className="h-40 bg-muted">
                    <img 
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {course.title}
                    </CardTitle>
                    <CardDescription>{course.instructor}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {course.description}
                    </p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-2 text-sm">
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{course.level}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{course.studentsCount.toLocaleString()} students</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Star className="h-3.5 w-3.5 text-amber-500" />
                        <span>{course.rating}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <div className="w-full">
                      <p className="mb-2 text-lg font-bold text-center">
                        KES {course.price.toLocaleString()}
                      </p>
                      <Button className="w-full">
                        Enroll Now
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Courses;
