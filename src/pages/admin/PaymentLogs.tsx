
import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Download, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Sample data - would come from API in real app
const payments = [
  {
    id: 'PAY-1234567',
    student: 'John Doe',
    course: 'Introduction to Web Development',
    amount: 5000,
    method: 'M-Pesa',
    status: 'completed',
    date: '2025-04-15',
  },
  {
    id: 'PAY-2345678',
    student: 'Jane Smith',
    course: 'Advanced Python Programming',
    amount: 8500,
    method: 'PayPal',
    status: 'completed',
    date: '2025-04-12',
  },
  {
    id: 'PAY-3456789',
    student: 'Alice Johnson',
    course: 'UX/UI Design Fundamentals',
    amount: 6000,
    method: 'M-Pesa',
    status: 'pending',
    date: '2025-04-15',
  },
  {
    id: 'PAY-4567890',
    student: 'Bob Wilson',
    course: 'Mobile App Development with React Native',
    amount: 9000,
    method: 'Credit Card',
    status: 'completed',
    date: '2025-04-10',
  },
  {
    id: 'PAY-5678901',
    student: 'Carol Martinez',
    course: 'Data Science Essentials',
    amount: 7500,
    method: 'M-Pesa',
    status: 'failed',
    date: '2025-04-09',
  },
];

const PaymentLogs = () => {
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMethodBadgeColor = (method: string) => {
    switch (method) {
      case 'M-Pesa':
        return 'bg-emerald-100 text-emerald-800';
      case 'PayPal':
        return 'bg-blue-100 text-blue-800';
      case 'Credit Card':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <PageHeader
        title="Payment Logs"
        description="Monitor all payment transactions across the platform"
      >
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </PageHeader>

      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Amount (KES)</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.id}</TableCell>
                  <TableCell>{payment.student}</TableCell>
                  <TableCell>{payment.course}</TableCell>
                  <TableCell>{payment.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getMethodBadgeColor(payment.method)}>
                      {payment.method}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusBadgeColor(payment.status)}>
                      {payment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{payment.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </>
  );
};

export default PaymentLogs;
