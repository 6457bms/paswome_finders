"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { processPayment } from "@/services/payment";
import { PaymentInfo } from "@/services/payment";
import { toast } from "@/hooks/use-toast";
import { useTransition } from "react";
import { summarizeOrder } from "@/ai/flows/summarize-order-flow";

const CheckoutPage = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const paymentInfo: PaymentInfo = {
      amount: 100, // hardcode amount for now
      currency: "USD", // hardcode currency for now
      paymentMethod: paymentMethod,
    };

    startTransition(async () => {
      const paymentSuccessful = await processPayment(paymentInfo);
      if (paymentSuccessful) {
        toast({
          title: "Order placed!",
          description: "Your order has been successfully processed.",
        });
      } else {
        toast({
          title: "Payment failed.",
          description: "There was an error processing your payment. Please try again.",
        });
      }
    });
  };

  const handleSummarizeOrder = async () => {
    const orderDetails = `Name: ${name}, Address: ${address}, Payment Method: ${paymentMethod}`;
    try {
      const summary = await summarizeOrder({ orderDetails });
      toast({
        title: "Order Summary",
        description: summary.summary,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to summarize the order.",
      });
    }
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-semibold mb-6">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Shipping Information</CardTitle>
            <CardDescription>Enter your shipping address</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  placeholder="123 Main St, Anytown, USA"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <Input
                  type="text"
                  id="paymentMethod"
                  placeholder="Credit Card"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Processing..." : "Place Order"}
              </Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
            <CardDescription>Review your order details</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Full Name: {name}</p>
            <p>Address: {address}</p>
            <p>Payment Method: {paymentMethod}</p>
            <Button onClick={handleSummarizeOrder}>
              Summarize Order
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CheckoutPage;

