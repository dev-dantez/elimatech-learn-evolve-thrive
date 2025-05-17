import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Bell, Camera, User, Lock, Shield, Globe, Pencil, Mail, Phone, Check, X } from 'lucide-react';
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
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { toast } from '@/components/ui/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import PageHeader from '@/components/common/PageHeader';

const profileSchema = z.object({
  fullName: z.string().min(3, { message: 'Full name must be at least 3 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().optional(),
  bio: z.string().max(500, { message: 'Bio must not exceed 500 characters.' }).optional(),
  country: z.string().optional(),
  language: z.string().optional(),
  timezone: z.string().optional(),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
  newPassword: z.string()
    .min(8, { message: 'Password must be at least 8 characters.' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter.' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter.' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number.' }),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ProfileFormValues = z.infer<typeof profileSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;

// Mock user data
const userData = {
  id: 'user1',
  fullName: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+254 700 123456',
  avatar: '/placeholder.svg',
  bio: 'Web developer passionate about creating intuitive user experiences. Currently learning React and TypeScript.',
  country: 'Kenya',
  language: 'English',
  timezone: 'Africa/Nairobi',
  role: 'student',
  enrolledCourses: 3,
  completedCourses: 1,
  certificates: 1,
  joinDate: '2025-03-15',
  skills: ['HTML', 'CSS', 'JavaScript', 'React'],
  notifications: {
    courseUpdates: true,
    newMessages: true,
    promotions: false,
    newsletter: true,
  },
};

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  // Profile form
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: userData.fullName,
      email: userData.email,
      phone: userData.phone,
      bio: userData.bio,
      country: userData.country,
      language: userData.language,
      timezone: userData.timezone,
    },
  });
  
  // Password form
  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });
  
  // Handle profile update
  const onProfileSubmit = async (data: ProfileFormValues) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // In a real app, you'd update the profile here
      console.log('Profile data:', data);
      
      toast({
        title: "Profile Updated",
        description: "Your profile information has been updated successfully.",
      });
    }, 1000);
  };
  
  // Handle password update
  const onPasswordSubmit = async (data: PasswordFormValues) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // In a real app, you'd update the password here
      console.log('Password data:', data);
      
      toast({
        title: "Password Updated",
        description: "Your password has been changed successfully.",
      });
      
      passwordForm.reset({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    }, 1000);
  };
  
  return (
    <div className="space-y-8">
      <PageHeader
        title="My Profile"
        description="Manage your account settings and preferences"
      />
      
      <div className="grid gap-6 lg:grid-cols-8">
        {/* Sidebar */}
        <Card className="lg:col-span-2">
          <CardHeader className="text-center">
            <div className="mx-auto relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={userData.avatar} alt={userData.fullName} />
                <AvatarFallback className="text-xl">{userData.fullName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <Button size="icon" variant="secondary" className="absolute -right-2 bottom-0 h-8 w-8 rounded-full">
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <CardTitle className="mt-2">{userData.fullName}</CardTitle>
            <CardDescription className="capitalize">{userData.role}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{userData.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{userData.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span>{userData.country}</span>
              </div>
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-2xl font-semibold text-primary">{userData.enrolledCourses}</p>
                <p className="text-xs text-muted-foreground">Enrolled Courses</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold text-primary">{userData.completedCourses}</p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold text-primary">{userData.certificates}</p>
                <p className="text-xs text-muted-foreground">Certificates</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold text-primary">
                  {Math.floor((Date.now() - new Date(userData.joinDate).getTime()) / (1000 * 60 * 60 * 24))}
                </p>
                <p className="text-xs text-muted-foreground">Days Active</p>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="mb-2 text-muted-foreground text-xs font-medium">MY SKILLS</h4>
              <div className="flex flex-wrap gap-1">
                {userData.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Main Content */}
        <div className="lg:col-span-6 space-y-6">
          <Tabs defaultValue="general" className="space-y-6">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="general" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>General</span>
              </TabsTrigger>
              <TabsTrigger value="password" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                <span>Password</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                <span>Notifications</span>
              </TabsTrigger>
            </TabsList>
            
            {/* General Settings */}
            <TabsContent value="general">
              <Card>
                <CardHeader>
                  <CardTitle>General Information</CardTitle>
                  <CardDescription>
                    Update your personal information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...profileForm}>
                    <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={profileForm.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={profileForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="john@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={profileForm.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input placeholder="+254 700 000000" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={profileForm.control}
                          name="country"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Country</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select your country" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Kenya">Kenya</SelectItem>
                                  <SelectItem value="Uganda">Uganda</SelectItem>
                                  <SelectItem value="Tanzania">Tanzania</SelectItem>
                                  <SelectItem value="Rwanda">Rwanda</SelectItem>
                                  <SelectItem value="Ethiopia">Ethiopia</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={profileForm.control}
                          name="language"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Language</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select your language" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="English">English</SelectItem>
                                  <SelectItem value="Swahili">Swahili</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={profileForm.control}
                          name="timezone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Time Zone</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select your timezone" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Africa/Nairobi">East Africa Time (UTC+3)</SelectItem>
                                  <SelectItem value="Africa/Lagos">West Africa Time (UTC+1)</SelectItem>
                                  <SelectItem value="Africa/Cairo">Central Africa Time (UTC+2)</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={profileForm.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Tell us a little about yourself" 
                                className="min-h-[120px]" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex justify-end">
                        <Button type="submit" className="w-full md:w-auto" disabled={isLoading}>
                          {isLoading ? 'Saving...' : 'Save Changes'}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Password Settings */}
            <TabsContent value="password">
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>
                    Update your password to enhance security
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...passwordForm}>
                    <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6">
                      <FormField
                        control={passwordForm.control}
                        name="currentPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="••••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={passwordForm.control}
                        name="newPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="••••••••" {...field} />
                            </FormControl>
                            <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                              <div className={`flex items-center gap-1 ${field.value.length >= 8 ? 'text-green-600' : 'text-muted-foreground'}`}>
                                {field.value.length >= 8 ? (
                                  <Check className="h-3 w-3" />
                                ) : (
                                  <X className="h-3 w-3" />
                                )}
                                At least 8 characters
                              </div>
                              <div className={`flex items-center gap-1 ${/[A-Z]/.test(field.value) ? 'text-green-600' : 'text-muted-foreground'}`}>
                                {/[A-Z]/.test(field.value) ? (
                                  <Check className="h-3 w-3" />
                                ) : (
                                  <X className="h-3 w-3" />
                                )}
                                One uppercase letter
                              </div>
                              <div className={`flex items-center gap-1 ${/[a-z]/.test(field.value) ? 'text-green-600' : 'text-muted-foreground'}`}>
                                {/[a-z]/.test(field.value) ? (
                                  <Check className="h-3 w-3" />
                                ) : (
                                  <X className="h-3 w-3" />
                                )}
                                One lowercase letter
                              </div>
                              <div className={`flex items-center gap-1 ${/[0-9]/.test(field.value) ? 'text-green-600' : 'text-muted-foreground'}`}>
                                {/[0-9]/.test(field.value) ? (
                                  <Check className="h-3 w-3" />
                                ) : (
                                  <X className="h-3 w-3" />
                                )}
                                One number
                              </div>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={passwordForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm New Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="••••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex justify-end">
                        <Button type="submit" className="w-full md:w-auto" disabled={isLoading}>
                          {isLoading ? 'Updating...' : 'Update Password'}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Notification Settings */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>
                    Manage how you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Course Updates</p>
                            <p className="text-sm text-muted-foreground">Receive notifications about course content updates</p>
                          </div>
                          <Switch checked={userData.notifications.courseUpdates} />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">New Messages</p>
                            <p className="text-sm text-muted-foreground">Get notified when you receive messages from instructors</p>
                          </div>
                          <Switch checked={userData.notifications.newMessages} />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Promotions</p>
                            <p className="text-sm text-muted-foreground">Receive updates about discounts and special offers</p>
                          </div>
                          <Switch checked={userData.notifications.promotions} />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Newsletter</p>
                            <p className="text-sm text-muted-foreground">Monthly digest of educational content and tips</p>
                          </div>
                          <Switch checked={userData.notifications.newsletter} />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Push Notifications</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Mobile Notifications</p>
                            <p className="text-sm text-muted-foreground">Enable push notifications on your mobile device</p>
                          </div>
                          <Switch />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Browser Notifications</p>
                            <p className="text-sm text-muted-foreground">Enable desktop notifications when using the web app</p>
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button className="w-full md:w-auto">
                        Save Preferences
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
