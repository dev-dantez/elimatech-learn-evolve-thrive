
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type LiveClassSchedulerProps = {
  courseId?: string;
  onScheduleClass?: (data: any) => void;
};

const LiveClassScheduler = ({ courseId, onScheduleClass }: LiveClassSchedulerProps) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState('60');
  const [platform, setPlatform] = useState('google-meet');
  const [link, setLink] = useState('');
  const [title, setTitle] = useState('');
  const { toast } = useToast();

  const handleSchedule = () => {
    if (!date || !startTime || !title) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const classData = {
      courseId,
      title,
      date: date ? format(date, 'yyyy-MM-dd') : '',
      startTime,
      duration: parseInt(duration),
      platform,
      link: link || generateMeetingLink(platform),
    };

    if (onScheduleClass) {
      onScheduleClass(classData);
    }

    toast({
      title: "Live Class Scheduled",
      description: `Your class "${title}" has been scheduled for ${format(date, 'PPP')} at ${startTime}`,
    });

    // Reset form
    setDate(undefined);
    setStartTime('');
    setDuration('60');
    setLink('');
    setTitle('');
  };

  const generateMeetingLink = (platform: string) => {
    // In a real app, we would integrate with Google Meet or Zoom APIs
    // For this demo, we'll just return placeholder links
    if (platform === 'google-meet') {
      return `https://meet.google.com/${Math.random().toString(36).substring(2, 10)}`;
    } else {
      return `https://zoom.us/j/${Math.floor(Math.random() * 1000000000)}`;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule Live Class</CardTitle>
        <CardDescription>
          Create a live session for your students using Google Meet or Zoom
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Class Title</Label>
          <Input
            id="title"
            placeholder="Introduction to React Hooks"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="startTime">Start Time</Label>
            <Input
              id="startTime"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="duration">Duration (minutes)</Label>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger>
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
                <SelectItem value="90">1.5 hours</SelectItem>
                <SelectItem value="120">2 hours</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="platform">Platform</Label>
            <Select value={platform} onValueChange={setPlatform}>
              <SelectTrigger>
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="google-meet">Google Meet</SelectItem>
                <SelectItem value="zoom">Zoom</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="link">
            Meeting Link (Optional)
          </Label>
          <Input
            id="link"
            placeholder="https://meet.google.com/abc-defg-hij"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <p className="text-sm text-muted-foreground">
            Leave empty to generate a new meeting automatically
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSchedule} className="ml-auto">
          Schedule Live Class
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LiveClassScheduler;
