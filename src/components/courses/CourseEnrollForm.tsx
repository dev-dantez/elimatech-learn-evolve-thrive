
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// Define the form schema
const enrollmentSchema = z.object({
  agreedToTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

type EnrollmentFormValues = z.infer<typeof enrollmentSchema>;

interface CourseEnrollFormProps {
  courseId: string;
  courseName: string;
  price: number;
  onSuccess?: () => void;
}

const CourseEnrollForm = ({
  courseId,
  courseName,
  price,
  onSuccess,
}: CourseEnrollFormProps) => {
  const form = useForm<EnrollmentFormValues>({
    resolver: zodResolver(enrollmentSchema),
    defaultValues: {
      agreedToTerms: false,
    },
  });

  const onSubmit = (values: EnrollmentFormValues) => {
    // In a real app, this would make an API call to process the enrollment
    console.log('Enrolling in course:', courseId, values);
    
    // Simulate successful enrollment
    setTimeout(() => {
      toast({
        title: "Enrolled successfully!",
        description: `You have enrolled in ${courseName}`,
      });
      
      if (onSuccess) onSuccess();
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enroll in this Course</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="text-center mb-4">
              <p className="text-2xl font-bold">KES {price.toLocaleString()}</p>
              {price === 0 && <p className="text-sm text-green-600">Free Course</p>}
            </div>
            
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Full lifetime access</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Access on mobile and desktop</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Certificate of completion</span>
              </li>
            </ul>
            
            <FormField
              control={form.control}
              name="agreedToTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-4">
                  <FormControl>
                    <input
                      type="checkbox"
                      className="h-4 w-4 mt-1"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I agree to the terms and conditions
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              {price > 0 ? 'Enroll Now - KES ' + price.toLocaleString() : 'Enroll For Free'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default CourseEnrollForm;
