
import React, { useState } from 'react';
import { Save, User, Bell, Shield, CreditCard, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import PageHeader from '@/components/common/PageHeader';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  // Profile settings state
  const [profileForm, setProfileForm] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+254 712 345 678',
    bio: 'Student at Nairobi University, studying Computer Science.',
    location: 'Nairobi, Kenya'
  });

  // Notification settings state
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    marketing: false,
    announcements: true,
    courseUpdates: true,
    newMessages: true
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  const handleNotificationUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Notification preferences saved",
      description: "Your notification settings have been updated.",
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Settings" 
        description="Manage your account settings and preferences"
      />

      <Tabs 
        defaultValue="profile" 
        value={activeTab} 
        onValueChange={setActiveTab} 
        className="w-full"
      >
        <TabsList className="grid grid-cols-4 w-full max-w-4xl">
          <TabsTrigger value="profile" className="flex items-center">
            <User className="h-4 w-4 mr-2" /> Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center">
            <Bell className="h-4 w-4 mr-2" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center">
            <Shield className="h-4 w-4 mr-2" /> Security
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center">
            <CreditCard className="h-4 w-4 mr-2" /> Billing
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          {/* Profile Settings */}
          <TabsContent value="profile">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your personal information and public profile.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <div className="flex flex-col sm:flex-row gap-6">
                      <div className="flex flex-col items-center">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src="/placeholder.svg" alt="Profile picture" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <Button variant="outline" size="sm" className="mt-4">
                          <Pencil className="h-3 w-3 mr-2" /> Change Avatar
                        </Button>
                      </div>
                      <div className="space-y-4 flex-1">
                        <div className="grid gap-4">
                          <div>
                            <Label htmlFor="name">Full Name</Label>
                            <Input 
                              id="name" 
                              value={profileForm.name}
                              onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="email">Email Address</Label>
                              <Input 
                                id="email" 
                                type="email" 
                                value={profileForm.email}
                                onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                              />
                            </div>
                            <div>
                              <Label htmlFor="phone">Phone Number</Label>
                              <Input 
                                id="phone" 
                                value={profileForm.phone}
                                onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                              />
                            </div>
                          </div>
                          
                          <div>
                            <Label htmlFor="location">Location</Label>
                            <Input 
                              id="location" 
                              value={profileForm.location}
                              onChange={(e) => setProfileForm({...profileForm, location: e.target.value})}
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea 
                              id="bio" 
                              placeholder="Tell us a little about yourself"
                              value={profileForm.bio}
                              onChange={(e) => setProfileForm({...profileForm, bio: e.target.value})}
                              className="min-h-[100px]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <CardFooter className="px-0 pt-6">
                      <Button type="submit" className="ml-auto">
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                    </CardFooter>
                  </form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications">
            <form onSubmit={handleNotificationUpdate}>
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Configure how you receive notifications and updates.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Notification Channels</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="email-notifications" className="flex-1">Email Notifications</Label>
                        <Switch 
                          id="email-notifications" 
                          checked={notifications.email}
                          onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="push-notifications" className="flex-1">Push Notifications</Label>
                        <Switch 
                          id="push-notifications" 
                          checked={notifications.push}
                          onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="marketing" className="flex-1">Marketing Communications</Label>
                        <Switch 
                          id="marketing" 
                          checked={notifications.marketing}
                          onCheckedChange={(checked) => setNotifications({...notifications, marketing: checked})}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Notification Types</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="announcements" className="flex-1">Announcements</Label>
                        <Switch 
                          id="announcements" 
                          checked={notifications.announcements}
                          onCheckedChange={(checked) => setNotifications({...notifications, announcements: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="course-updates" className="flex-1">Course Updates</Label>
                        <Switch 
                          id="course-updates" 
                          checked={notifications.courseUpdates}
                          onCheckedChange={(checked) => setNotifications({...notifications, courseUpdates: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="new-messages" className="flex-1">New Messages</Label>
                        <Switch 
                          id="new-messages" 
                          checked={notifications.newMessages}
                          onCheckedChange={(checked) => setNotifications({...notifications, newMessages: checked})}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="ml-auto">
                    <Save className="h-4 w-4 mr-2" />
                    Save Preferences
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your account security and password.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-4">Change Password</h3>
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div>
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div>
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm">Enable two-factor authentication for enhanced security.</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        You'll be asked for an additional authentication code when logging in.
                      </p>
                    </div>
                    <Button variant="outline">Enable 2FA</Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Session Management</h3>
                  <div>
                    <p className="text-sm">View and manage your active sessions.</p>
                    <div className="mt-4 border rounded-md p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <p className="text-sm font-medium">Current Session</p>
                          <p className="text-xs text-muted-foreground">Started: May 17, 2025, 10:30 AM</p>
                        </div>
                        <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                      </div>
                      <p className="text-xs">Nairobi, Kenya (Approximate location)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto">Update Security Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Billing Settings (placeholder linking to Billing page) */}
          <TabsContent value="billing">
            <Card>
              <CardHeader>
                <CardTitle>Billing Information</CardTitle>
                <CardDescription>
                  Manage your billing information and view your payment history.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center py-6">
                <p className="mb-4">Your billing information and payment history can be viewed on the billing page.</p>
                <Button asChild>
                  <a href="/billing">Go to Billing Page</a>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Settings;
