
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CourseEarning {
  id: string;
  course: string;
  enrollments: number;
  revenue: number;
  rating: number;
  lastEnrolled: string;
}

interface CoursesTabProps {
  courseEarnings: CourseEarning[];
  formatCurrency: (amount: number) => string;
  formatDate: (dateString: string) => string;
}

const CoursesTab: React.FC<CoursesTabProps> = ({ courseEarnings, formatCurrency, formatDate }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Revenue Breakdown</CardTitle>
        <CardDescription>Performance metrics for each of your courses</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course</TableHead>
              <TableHead className="text-right">Enrollments</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
              <TableHead className="text-center">Rating</TableHead>
              <TableHead>Last Enrolled</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courseEarnings.map(course => (
              <TableRow key={course.id}>
                <TableCell className="font-medium">{course.course}</TableCell>
                <TableCell className="text-right">{course.enrollments}</TableCell>
                <TableCell className="text-right">{formatCurrency(course.revenue)}</TableCell>
                <TableCell className="text-center">{course.rating}/5.0</TableCell>
                <TableCell>{formatDate(course.lastEnrolled)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="ml-auto">
          <Download className="h-4 w-4 mr-2" />
          Export Course Data
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CoursesTab;
