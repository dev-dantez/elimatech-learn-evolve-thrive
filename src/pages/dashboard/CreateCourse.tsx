
import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import CourseCreateForm from '@/components/courses/CourseCreateForm';

const CreateCourse = () => {
  return (
    <>
      <PageHeader
        title="Create New Course"
        description="Fill out the form below to create a new course"
      />
      <div className="mt-6">
        <CourseCreateForm />
      </div>
    </>
  );
};

export default CreateCourse;
