
import React, { useState } from 'react';
import { Download, Share2, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import PageHeader from '@/components/common/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import CourseCertificate from '@/components/courses/CourseCertificate';

// Mock data - would come from API in real app
const certificates = [
  {
    id: '1',
    courseName: 'Introduction to Web Development',
    completionDate: 'May 10, 2025',
    instructorName: 'John Smith',
    certificateId: 'CERT-WD-2025-001',
  },
  {
    id: '2',
    courseName: 'UI/UX Design Fundamentals',
    completionDate: 'April 15, 2025',
    instructorName: 'Sarah Wilson',
    certificateId: 'CERT-UX-2025-042',
  },
  {
    id: '3',
    courseName: 'Introduction to Python Programming',
    completionDate: 'March 22, 2025',
    instructorName: 'Michael Chen',
    certificateId: 'CERT-PY-2025-108',
  },
];

const Certificates = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCertificate, setSelectedCertificate] = useState<null | typeof certificates[0]>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredCertificates = certificates.filter(cert => 
    cert.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cert.instructorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cert.certificateId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const viewCertificate = (certificate: typeof certificates[0]) => {
    setSelectedCertificate(certificate);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="My Certificates" 
        description="View and share your course completion certificates"
      />

      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex-1">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full max-w-md">
              <TabsTrigger value="all" className="flex-1">All Certificates</TabsTrigger>
              <TabsTrigger value="recent" className="flex-1">Recent</TabsTrigger>
              <TabsTrigger value="shared" className="flex-1">Shared</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="flex items-center gap-2 min-w-[240px]">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search certificates..." 
              value={searchQuery}
              onChange={handleSearch}
              className="pl-8"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <TabsContent value="all" className="mt-0 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCertificates.length > 0 ? (
            filteredCertificates.map((certificate) => (
              <Card key={certificate.id} className="overflow-hidden">
                <div className="bg-muted p-6 text-center relative">
                  <h3 className="text-sm font-medium text-muted-foreground">CERTIFICATE OF COMPLETION</h3>
                  <h2 className="mt-4 text-lg font-bold truncate">{certificate.courseName}</h2>
                  <p className="text-sm mt-2">Completed on {certificate.completionDate}</p>
                </div>
                <CardFooter className="flex justify-between p-4">
                  <Button variant="outline" size="sm" className="flex-1 mr-2" onClick={() => viewCertificate(certificate)}>
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Share2 className="h-4 w-4 mr-1" /> Share
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No certificates found matching your search.</p>
            </div>
          )}
        </div>
      </TabsContent>
            
      <TabsContent value="recent" className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCertificates.slice(0, 1).map((certificate) => (
            <Card key={certificate.id} className="overflow-hidden">
              <div className="bg-muted p-6 text-center relative">
                <h3 className="text-sm font-medium text-muted-foreground">CERTIFICATE OF COMPLETION</h3>
                <h2 className="mt-4 text-lg font-bold truncate">{certificate.courseName}</h2>
                <p className="text-sm mt-2">Completed on {certificate.completionDate}</p>
              </div>
              <CardFooter className="flex justify-between p-4">
                <Button variant="outline" size="sm" className="flex-1 mr-2" onClick={() => viewCertificate(certificate)}>
                  View
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Share2 className="h-4 w-4 mr-1" /> Share
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="shared" className="mt-0">
        <div className="text-center py-12">
          <p className="text-muted-foreground">You haven't shared any certificates yet.</p>
        </div>
      </TabsContent>

      {/* Certificate dialog */}
      <Dialog open={!!selectedCertificate} onOpenChange={(open) => !open && setSelectedCertificate(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Certificate of Completion</DialogTitle>
            <DialogDescription>
              Your achievement for completing {selectedCertificate?.courseName}
            </DialogDescription>
          </DialogHeader>
          {selectedCertificate && (
            <div className="py-4">
              <CourseCertificate
                courseName={selectedCertificate.courseName}
                studentName="John Doe" // This would come from user profile in a real app
                completionDate={selectedCertificate.completionDate}
                instructorName={selectedCertificate.instructorName}
                certificateId={selectedCertificate.certificateId}
              />
              <div className="flex justify-center gap-4 mt-6">
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  Download Certificate
                </Button>
                <Button variant="outline">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Certificate
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Certificates;
