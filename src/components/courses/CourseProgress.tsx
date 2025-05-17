
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, BookOpen } from 'lucide-react';

interface CourseProgressProps {
  totalLessons: number;
  completedLessons: number;
  duration: string;
  lastAccessed?: string;
}

const CourseProgress = ({
  totalLessons,
  completedLessons,
  duration,
  lastAccessed,
}: CourseProgressProps) => {
  const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Your Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center justify-between text-sm mb-1">
            <span>Course Completion</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>
              {completedLessons} of {totalLessons} lessons completed
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{duration} total course length</span>
          </div>
          
          {lastAccessed && (
            <div className="flex items-center gap-2 text-sm">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <span>Last accessed: {lastAccessed}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseProgress;
