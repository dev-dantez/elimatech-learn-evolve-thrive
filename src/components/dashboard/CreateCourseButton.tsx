
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CreateCourseButton = () => {
  const navigate = useNavigate();

  const handleCreateCourse = () => {
    navigate('/dashboard/courses/create');
  };

  return (
    <Button 
      onClick={handleCreateCourse} 
      className="gap-2"
    >
      <Plus className="h-4 w-4" />
      Create New Course
    </Button>
  );
};

export default CreateCourseButton;
