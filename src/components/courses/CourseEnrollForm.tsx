
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { CheckCircle } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from 'lucide-react';

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
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  
  const form = useForm<EnrollmentFormValues>({
    resolver: zodResolver(enrollmentSchema),
    defaultValues: {
      agreedToTerms: false,
    },
  });

  const onSubmit = (values: EnrollmentFormValues) => {
    // Only show confirmation dialog if the course is paid
    if (price > 0) {
      setShowConfirmationDialog(true);
    } else {
      processEnrollment();
    }
  };
  
  const processEnrollment = () => {
    setIsEnrolling(true);
    
    // In a real app, this would make an API call to process the enrollment
    console.log('Enrolling in course:', courseId);
    
    // Simulate successful enrollment with a delay
    setTimeout(() => {
      setIsEnrolling(false);
      setShowConfirmationDialog(false);
      
      toast({
        title: "Enrolled successfully!",
        description: `You have enrolled in ${courseName}`,
      });
      
      if (onSuccess) onSuccess();
    }, 2000);
  };

  return (
    <>
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
              <Button type="submit" className="w-full" disabled={isEnrolling}>
                {isEnrolling ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    {price > 0 ? 'Enroll Now - KES ' + price.toLocaleString() : 'Enroll For Free'}
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      
      {/* Payment Confirmation Dialog */}
      <Dialog open={showConfirmationDialog} onOpenChange={setShowConfirmationDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Payment</DialogTitle>
            <DialogDescription>
              You are about to purchase access to <strong>{courseName}</strong>. The amount of <strong>KES {price.toLocaleString()}</strong> will be charged.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="mb-4">Payment will be processed securely. Once confirmed, you'll have immediate access to all course content.</p>
            <p className="text-sm text-muted-foreground">By proceeding, you agree to our payment terms and refund policy.</p>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowConfirmationDialog(false)}
              disabled={isEnrolling}
            >
              Cancel
            </Button>
            <Button 
              onClick={processEnrollment}
              disabled={isEnrolling}
            >
              {isEnrolling ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                'Confirm Payment'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CourseEnrollForm;
