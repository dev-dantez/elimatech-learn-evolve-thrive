
import React, { useState } from 'react';
import { ChevronDown, CreditCard, Download, FileText, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import PageHeader from '@/components/common/PageHeader';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";

// Mock data - would come from API in real app
const paymentMethods = [
  {
    id: 'pm_1',
    type: 'visa',
    last4: '4242',
    expiry: '06/26',
    isDefault: true,
  }
];

const invoices = [
  { 
    id: 'inv_001', 
    date: '2025-05-01', 
    amount: 4999, 
    description: 'Monthly Subscription - Premium Plan',
    status: 'paid' 
  },
  { 
    id: 'inv_002', 
    date: '2025-04-01', 
    amount: 4999, 
    description: 'Monthly Subscription - Premium Plan',
    status: 'paid' 
  },
  { 
    id: 'inv_003', 
    date: '2025-03-01', 
    amount: 2999, 
    description: 'Monthly Subscription - Basic Plan',
    status: 'paid' 
  }
];

const subscriptionDetails = {
  plan: 'Premium Plan',
  price: 4999,
  interval: 'monthly',
  status: 'active',
  nextBillingDate: '2025-06-01',
  features: [
    'Unlimited course access',
    'Certificate downloads',
    'Priority support',
    'Offline viewing',
  ],
};

const Billing = () => {
  const [activeTab, setActiveTab] = useState('subscription');
  const [isPaymentDetailsOpen, setIsPaymentDetailsOpen] = useState(false);
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount / 100);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleAddPaymentMethod = () => {
    toast({
      title: "Feature coming soon",
      description: "Adding new payment methods will be available shortly.",
    });
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    toast({
      title: "Invoice downloaded",
      description: `Invoice ${invoiceId} has been downloaded.`,
    });
  };

  const handleCancelSubscription = () => {
    toast({
      title: "Subscription management",
      description: "Please contact support to cancel your subscription.",
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Billing & Subscription" 
        description="Manage your subscription and payment information"
      />

      <Tabs defaultValue="subscription" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
          <TabsTrigger value="billing-history">Billing History</TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          {/* Subscription Tab */}
          <TabsContent value="subscription">
            <div className="grid gap-6 md:grid-cols-3">
              {/* Current Plan */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Current Subscription</CardTitle>
                  <CardDescription>
                    Your current plan and billing details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold">{subscriptionDetails.plan}</h3>
                        <p className="text-muted-foreground">
                          {formatCurrency(subscriptionDetails.price)} / {subscriptionDetails.interval}
                        </p>
                      </div>
                      <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                        {subscriptionDetails.status.charAt(0).toUpperCase() + subscriptionDetails.status.slice(1)}
                      </Badge>
                    </div>
                    
                    <div>
                      <p className="text-sm">
                        Next billing date: <span className="font-medium">{formatDate(subscriptionDetails.nextBillingDate)}</span>
                      </p>
                    </div>
                    
                    <div className="pt-4 space-y-2">
                      <h4 className="text-sm font-medium">Plan Features:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {subscriptionDetails.features.map((feature, index) => (
                          <li key={index} className="text-sm">{feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-4 sm:flex-row sm:justify-between">
                  <Button variant="outline">Change Plan</Button>
                  <Button variant="destructive" onClick={handleCancelSubscription}>Cancel Subscription</Button>
                </CardFooter>
              </Card>

              {/* Payment Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Subscription Price</span>
                    <span>{formatCurrency(subscriptionDetails.price)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Billing Period</span>
                    <span className="capitalize">{subscriptionDetails.interval}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Payment Method</span>
                    <span>Visa •••• 4242</span>
                  </div>
                  
                  <Collapsible 
                    open={isPaymentDetailsOpen} 
                    onOpenChange={setIsPaymentDetailsOpen}
                    className="border-t pt-4 mt-4"
                  >
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" className="w-full flex justify-between p-0 h-auto">
                        <span className="text-sm">View Payment Details</span>
                        <ChevronDown className={`h-4 w-4 transition-transform ${isPaymentDetailsOpen ? 'rotate-180' : ''}`} />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pt-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Subtotal</span>
                          <span>{formatCurrency(subscriptionDetails.price)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Tax</span>
                          <span>{formatCurrency(0)}</span>
                        </div>
                        <div className="flex justify-between font-medium pt-2 border-t">
                          <span>Total</span>
                          <span>{formatCurrency(subscriptionDetails.price)}</span>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Payment Methods Tab */}
          <TabsContent value="payment-methods">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>
                  Manage your payment methods and billing information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentMethods.length > 0 ? (
                    paymentMethods.map(method => (
                      <div key={method.id} className="flex justify-between items-center border p-4 rounded-md">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-14 bg-muted rounded flex items-center justify-center">
                            <CreditCard className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium capitalize">{method.type} •••• {method.last4}</p>
                            <p className="text-xs text-muted-foreground">Expires {method.expiry}</p>
                          </div>
                        </div>
                        {method.isDefault && (
                          <Badge variant="outline" className="ml-auto mr-4">Default</Badge>
                        )}
                        <Button variant="ghost" size="sm">Edit</Button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No payment methods found.</p>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full sm:w-auto" onClick={handleAddPaymentMethod}>
                  <Plus className="h-4 w-4 mr-2" /> Add Payment Method
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Billing History Tab */}
          <TabsContent value="billing-history">
            <Card>
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
                <CardDescription>
                  View your past invoices and payment history
                </CardDescription>
              </CardHeader>
              <CardContent>
                {invoices.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Invoice</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Download</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {invoices.map(invoice => (
                        <TableRow key={invoice.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4" />
                              <span className="font-medium">{invoice.id}</span>
                            </div>
                          </TableCell>
                          <TableCell>{formatDate(invoice.date)}</TableCell>
                          <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                          <TableCell>
                            <Badge variant={invoice.status === 'paid' ? 'outline' : 'default'} className={
                              invoice.status === 'paid' ? 'bg-green-100 text-green-800 hover:bg-green-100' : ''
                            }>
                              {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDownloadInvoice(invoice.id)}
                            >
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Download</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No billing history available.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Billing;
