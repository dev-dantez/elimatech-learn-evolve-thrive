
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

interface Payment {
  id: string;
  amount: number;
  date: string;
  courses: string;
  enrollments: number;
  status: string;
}

interface PayoutsTabProps {
  paymentHistory: Payment[];
  formatCurrency: (amount: number) => string;
  formatDate: (dateString: string) => string;
}

const PayoutsTab: React.FC<PayoutsTabProps> = ({ paymentHistory, formatCurrency, formatDate }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment History</CardTitle>
        <CardDescription>Record of all your payout transactions</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Enrollments</TableHead>
              <TableHead>Courses</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paymentHistory.map(payment => (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">{payment.id}</TableCell>
                <TableCell>{formatDate(payment.date)}</TableCell>
                <TableCell>{payment.enrollments}</TableCell>
                <TableCell>{payment.courses}</TableCell>
                <TableCell className="text-right">{formatCurrency(payment.amount)}</TableCell>
                <TableCell className="text-right">
                  <span className="capitalize px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {payment.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">
          Payouts are processed on the 1st and 15th of each month.
        </p>
        <Button variant="outline" className="ml-auto">
          <Download className="h-4 w-4 mr-2" />
          Download Statement
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PayoutsTab;
