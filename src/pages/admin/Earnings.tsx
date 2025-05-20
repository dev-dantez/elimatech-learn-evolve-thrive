
import React, { useState } from 'react';
import { Download, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/common/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';
import { useEarningsData, formatCurrency, formatDate } from '@/hooks/useEarningsData';
import StatCards from '@/components/admin/earnings/StatCards';
import OverviewTab from '@/components/admin/earnings/OverviewTab';
import CoursesTab from '@/components/admin/earnings/CoursesTab';
import PayoutsTab from '@/components/admin/earnings/PayoutsTab';

const Earnings = () => {
  const [timeRange, setTimeRange] = useState('6m');
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();
  
  const {
    revenueData,
    courseEarnings,
    paymentHistory,
    totalRevenue,
    totalEnrollments,
    isLoading
  } = useEarningsData(timeRange);

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Your earnings data is being exported",
    });
    // Implement actual export functionality here
  };

  return (
    <div className="space-y-8">
      <PageHeader 
        title="Instructor Earnings" 
        description="Track your course earnings and revenue"
      >
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2" onClick={handleExport}>
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
      </PageHeader>

      <StatCards 
        totalRevenue={totalRevenue}
        totalEnrollments={totalEnrollments}
        formatCurrency={formatCurrency}
      />
      
      <div className="flex items-center justify-between">
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">Course Earnings</TabsTrigger>
            <TabsTrigger value="payouts">Payouts</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">Last Month</SelectItem>
              <SelectItem value="3m">Last 3 Months</SelectItem>
              <SelectItem value="6m">Last 6 Months</SelectItem>
              <SelectItem value="1y">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <TabsContent value="overview" className="mt-0">
        <OverviewTab
          revenueData={revenueData}
          courseEarnings={courseEarnings}
          paymentHistory={paymentHistory}
          formatCurrency={formatCurrency}
          formatDate={formatDate}
        />
      </TabsContent>

      <TabsContent value="courses" className="mt-0">
        <CoursesTab
          courseEarnings={courseEarnings}
          formatCurrency={formatCurrency}
          formatDate={formatDate}
        />
      </TabsContent>

      <TabsContent value="payouts" className="mt-0">
        <PayoutsTab
          paymentHistory={paymentHistory}
          formatCurrency={formatCurrency}
          formatDate={formatDate}
        />
      </TabsContent>
    </div>
  );
};

export default Earnings;
