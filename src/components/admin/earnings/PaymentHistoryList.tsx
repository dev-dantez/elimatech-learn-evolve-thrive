
import React from 'react';

interface Payment {
  id: string;
  amount: number;
  date: string;
  enrollments: number;
}

interface PaymentHistoryListProps {
  payments: Payment[];
  formatCurrency: (amount: number) => string;
  formatDate: (dateString: string) => string;
}

const PaymentHistoryList: React.FC<PaymentHistoryListProps> = ({ payments, formatCurrency, formatDate }) => {
  if (!payments || payments.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-muted-foreground">No payment history available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {payments.map(payment => (
        <div key={payment.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
          <div>
            <p className="font-medium">{formatCurrency(payment.amount)}</p>
            <p className="text-sm text-muted-foreground">{formatDate(payment.date)}</p>
          </div>
          <div className="text-right">
            <p className="text-sm">{payment.enrollments} enrollments</p>
            <p className="text-xs text-muted-foreground">ID: {payment.id}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaymentHistoryList;
