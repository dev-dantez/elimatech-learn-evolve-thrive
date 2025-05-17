
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2, ArrowLeft, Check } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsEmailSent(true);
      
      // In a real app, you'd handle password reset here
      console.log('Reset password for:', data.email);
      
      toast({
        title: "Reset Link Sent",
        description: "Check your email for instructions to reset your password.",
      });
    }, 1500);
  };

  return (
    <div>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">Reset Password</h1>
        <p className="text-muted-foreground text-sm mt-1">
          {isEmailSent 
            ? "We've sent you an email with instructions" 
            : "Enter your email and we'll send you a reset link"}
        </p>
      </div>

      {isEmailSent ? (
        <div className="space-y-4 text-center">
          <div className="p-3 bg-muted rounded-full w-12 h-12 mx-auto flex items-center justify-center">
            <Check className="h-6 w-6 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground">
            If an account exists for <span className="font-medium">{form.getValues().email}</span>,
            you will receive password reset instructions.
          </p>
          <div className="pt-4">
            <Button variant="outline" className="w-full" onClick={() => navigate('/login')}>
              Return to Login
            </Button>
          </div>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Send Reset Link
            </Button>
          </form>
        </Form>
      )}

      <div className="mt-6 text-center">
        <Link to="/login" className="text-sm flex items-center justify-center gap-1 text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" />
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
