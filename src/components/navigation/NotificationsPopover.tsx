
import React from 'react';
import { Bell } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: 'course' | 'message' | 'system';
}

// Mock notifications - would come from API in real app
const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Course Update',
    description: 'New module added to "Introduction to React"',
    time: '10 minutes ago',
    read: false,
    type: 'course'
  },
  {
    id: '2',
    title: 'Message from Instructor',
    description: 'David replied to your question about APIs',
    time: '1 hour ago',
    read: false,
    type: 'message'
  },
  {
    id: '3',
    title: 'Assignment Graded',
    description: 'Your "React Hooks" assignment has been graded',
    time: '3 hours ago',
    read: true,
    type: 'course'
  },
  {
    id: '4',
    title: 'System Maintenance',
    description: 'The system will be down for maintenance on Sunday',
    time: '1 day ago',
    read: true,
    type: 'system'
  }
];

const NotificationsPopover = () => {
  const unreadCount = mockNotifications.filter(n => !n.read).length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-elimu-primary text-[10px] font-medium text-white">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[380px] p-0" align="end">
        <div className="flex items-center justify-between p-4">
          <h3 className="font-medium">Notifications</h3>
          {unreadCount > 0 && (
            <Button variant="link" size="sm" className="text-xs h-auto p-0">
              Mark all as read
            </Button>
          )}
        </div>
        <Separator />
        <div className="max-h-[400px] overflow-auto">
          {mockNotifications.length > 0 ? (
            <div className="grid gap-1 p-1">
              {mockNotifications.map((notification) => (
                <button
                  key={notification.id}
                  className={cn(
                    "flex flex-col gap-1 rounded-md p-3 text-left text-sm transition-colors hover:bg-accent",
                    !notification.read && "bg-muted"
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div className="font-medium">{notification.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {notification.time}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {notification.description}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
              No new notifications
            </div>
          )}
        </div>
        <Separator />
        <div className="p-2">
          <Button variant="outline" size="sm" className="w-full">
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsPopover;
