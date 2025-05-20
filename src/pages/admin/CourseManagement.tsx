
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import PageHeader from '@/components/common/PageHeader';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from '@/hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createCourse, updateCourse, publishCourse, getTutorCourses } from '@/services/courseService';
import { supabase } from '@/integrations/supabase/client';
import { PlusCircle, Edit, Eye, MoreHorizontal, Check, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const CourseManagement = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    thumbnail: ''
  });

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        setUserId(data.session.user.id);
      }
    };
    
    checkUser();
  }, []);

  const { data: courses, isLoading } = useQuery({
    queryKey: ['tutor-courses', userId],
    queryFn: () => userId ? getTutorCourses(userId) : Promise.resolve([]),
    enabled: !!userId
  });

  const createCourseMutation = useMutation({
    mutationFn: (courseData: any) => createCourse(courseData, userId!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tutor-courses'] });
      setIsCreateDialogOpen(false);
      resetForm();
      toast({
        title: "Course Created",
        description: "Your course has been created successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to create course: ${error}`,
        variant: "destructive",
      });
    }
  });

  const updateCourseMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: any }) => updateCourse(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tutor-courses'] });
      setIsEditDialogOpen(false);
      toast({
        title: "Course Updated",
        description: "Your course has been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update course: ${error}`,
        variant: "destructive",
      });
    }
  });

  const publishCourseMutation = useMutation({
    mutationFn: (courseId: string) => publishCourse(courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tutor-courses'] });
      toast({
        title: "Course Published",
        description: "Your course is now available to students.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to publish course: ${error}`,
        variant: "destructive",
      });
    }
  });

  const handleCreateCourse = () => {
    if (!formData.title || !formData.description) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    createCourseMutation.mutate({
      title: formData.title,
      description: formData.description,
      price: Number(formData.price) * 100, // Convert to cents
      thumbnail: formData.thumbnail
    });
  };

  const handleUpdateCourse = () => {
    if (!currentCourse || !formData.title || !formData.description) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    updateCourseMutation.mutate({
      id: currentCourse.id,
      data: {
        title: formData.title,
        description: formData.description,
        price: Number(formData.price) * 100, // Convert to cents
        thumbnail: formData.thumbnail
      }
    });
  };

  const handleEditCourse = (course: any) => {
    setCurrentCourse(course);
    setFormData({
      title: course.title,
      description: course.description || '',
      price: (course.price || 0) / 100, // Convert from cents
      thumbnail: course.thumbnail || ''
    });
    setIsEditDialogOpen(true);
  };

  const handlePublishCourse = (courseId: string) => {
    publishCourseMutation.mutate(courseId);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: 0,
      thumbnail: ''
    });
    setCurrentCourse(null);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatPrice = (price: number | null) => {
    if (price === null || price === undefined) return '$0.00';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(price / 100);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Course Management" 
        description="Create and manage your courses"
      >
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Create Course
        </Button>
      </PageHeader>

      <Card>
        <CardHeader>
          <CardTitle>Your Courses</CardTitle>
          <CardDescription>
            View and manage all your created courses
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Loading courses...</p>
          ) : courses && courses.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.map((course: any) => (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium">{course.title}</TableCell>
                    <TableCell>{formatPrice(course.price)}</TableCell>
                    <TableCell>
                      {course.is_published ? (
                        <Badge variant="outline" className="bg-green-100 text-green-800">Published</Badge>
                      ) : (
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Draft</Badge>
                      )}
                    </TableCell>
                    <TableCell>{formatDate(course.created_at)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleEditCourse(course)}>
                            <Edit className="h-4 w-4 mr-2" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" /> View
                          </DropdownMenuItem>
                          {!course.is_published && (
                            <DropdownMenuItem onClick={() => handlePublishCourse(course.id)}>
                              <Check className="h-4 w-4 mr-2" /> Publish
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground mb-4">
                You haven't created any courses yet.
              </p>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                Create Your First Course
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create Course Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Course</DialogTitle>
            <DialogDescription>
              Add the details of your new course. You can add lessons after creating the course.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Course Title</Label>
              <Input 
                id="title"
                placeholder="e.g. Introduction to Programming"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description"
                placeholder="Describe what students will learn in this course"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={5}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input 
                id="price"
                type="number"
                placeholder="0.00"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="thumbnail">Thumbnail URL</Label>
              <Input 
                id="thumbnail"
                placeholder="https://example.com/thumbnail.jpg"
                value={formData.thumbnail}
                onChange={(e) => setFormData({...formData, thumbnail: e.target.value})}
              />
              <p className="text-sm text-muted-foreground">
                Add a URL to an image that represents your course.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateCourse} disabled={createCourseMutation.isPending}>
              {createCourseMutation.isPending ? "Creating..." : "Create Course"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Course Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Course</DialogTitle>
            <DialogDescription>
              Update the details of your course.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-title">Course Title</Label>
              <Input 
                id="edit-title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea 
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={5}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-price">Price ($)</Label>
              <Input 
                id="edit-price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-thumbnail">Thumbnail URL</Label>
              <Input 
                id="edit-thumbnail"
                value={formData.thumbnail}
                onChange={(e) => setFormData({...formData, thumbnail: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateCourse} disabled={updateCourseMutation.isPending}>
              {updateCourseMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourseManagement;
