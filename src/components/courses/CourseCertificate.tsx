
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Share2 } from 'lucide-react';
import { GraduationCap } from 'lucide-react';

interface CourseCertificateProps {
  courseName: string;
  studentName: string;
  completionDate: string;
  instructorName: string;
  certificateId: string;
}

const CourseCertificate = ({
  courseName,
  studentName,
  completionDate,
  instructorName,
  certificateId,
}: CourseCertificateProps) => {
  return (
    <Card className="overflow-hidden">
      <div className="bg-muted p-8 text-center relative">
        <div className="absolute top-4 left-4">
          <GraduationCap className="h-8 w-8 text-primary" />
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-muted-foreground">CERTIFICATE OF COMPLETION</h3>
        </div>
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">This is to certify that</p>
          <p className="text-2xl font-bold my-2">{studentName}</p>
          <p className="text-sm text-muted-foreground">has successfully completed</p>
        </div>
        <div className="mb-6">
          <h2 className="text-3xl font-bold">{courseName}</h2>
          <p className="text-sm text-muted-foreground mt-2">
            on {completionDate}
          </p>
        </div>
        <div className="mt-8">
          <div className="border-t border-muted-foreground/20 pt-4 w-48 mx-auto">
            <p className="font-medium">{instructorName}</p>
            <p className="text-xs text-muted-foreground">Instructor</p>
          </div>
        </div>
        <div className="absolute bottom-4 right-4 text-xs text-muted-foreground">
          Certificate ID: {certificateId}
        </div>
      </div>
      <CardFooter className="flex justify-between p-4">
        <Button variant="outline" className="flex-1 mr-2" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
        <Button variant="outline" className="flex-1" size="sm">
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCertificate;
