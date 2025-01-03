"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Lock, CreditCard, Building2, Wallet } from 'lucide-react'
import { initializeRazorpay } from "@/utils/payment"
import type { PaymentDetails } from "@/types/index"
import { useToast } from "@/components/ui/use-toast"
import { createOrder as createOrderApi } from "@/lib/api"
import axios from "axios"
import Razorpay from "react-razorpay/dist/razorpay"
import { useAuth } from "@/contexts/auth-context"
import favicon from "../../favicon.svg"

interface OrderItem {
  id: string
  title: string
  price: number
  originalPrice: number
  image: string
}

const orderItems: OrderItem[] = [
  {
    id: "1",
    title: "SQL - MySQL for Data Analytics and Business Intelligence",
    price: 449,
    originalPrice: 3999,
    image: "/placeholder.svg?height=40&width=40"
  },
  {
    id: "2",
    title: "The Ultimate MySQL Bootcamp: Go from SQL Beginner to Expert",
    price: 449,
    originalPrice: 3999,
    image: "/placeholder.svg?height=40&width=40"
  },
  {
    id: "3",
    title: "15 Days of SQL: The Complete SQL Masterclass 2024",
    price: 399,
    originalPrice: 2999,
    image: "/placeholder.svg?height=40&width=40"
  },
  {
    id: "4",
    title: "SQL for Data Science: The Complete Course 2024",
    price: 399,
    originalPrice: 2499,
    image: "/placeholder.svg?height=40&width=40"
  }
]

export function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState("upi")
  const [upiMethod, setUpiMethod] = useState("qr")
  const [upiId, setUpiId] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("")
  const { user, isAuthenticated } = useAuth()
  const { toast } = useToast()

  const totalOriginalPrice = orderItems.reduce((sum, item) => sum + item.originalPrice, 0)
  const totalPrice = orderItems.reduce((sum, item) => sum + item.price, 0)
  const totalDiscount = totalOriginalPrice - totalPrice
  const discountPercentage = Math.round((totalDiscount / totalOriginalPrice) * 100)

  useEffect(() => {
    initializeRazorpay()
  }, [])

  const createOrderFunction = async (): Promise<PaymentDetails | null> => {
    try {
      const response = await createOrderApi({
        amount: totalPrice,
        currency: "INR",
      })
      const data = response.data.data
      console.log(data, 'data');

      if (data.error) {
        throw new Error(data.error)
      }

      return {
        orderId: data.id,
        amount: totalPrice,
        currency: "INR",
      }
    } catch (error) {
      console.log(error);

      console.error("Error creating order:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not create payment order. Please try again.",
      })
      return null
    }
  }

  const handlePayment = async () => {
    setIsProcessing(true)

    try {
      const orderData = await createOrderFunction()
      if (!orderData) {
        setIsProcessing(false)
        return
      }

      if (paymentMethod === "upi" && upiMethod === "qr") {
        // Generate and display QR code for UPI
        try {
          const response = await axios.post(
            `https://api.razorpay.com/v1/payments/qr_codes/${orderData?.orderId}`,
            {},
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${btoa(`rzp_test_5nVjl1yDsQjHtS:6YoDpCeLv0WhwaH662GWbRLT`)}`,
              },
            }
          )
          setQrCodeUrl(response.data.qr_code_url) // Make sure qr_code_url is the correct key
        } catch (error) {
          console.error("QR code error:", error)
          toast({
            variant: "destructive",
            title: "Error",
            description: "Could not generate QR code. Please try again.",
          })
        }

      } else {
        // Standard Razorpay Checkout for other methods
        const options: RazorpayOptions = {
          key: 'rzp_test_5nVjl1yDsQjHtS',
          amount: orderData.amount * 100, // Amount in paise
          currency: orderData.currency,
          name: "Gyansagar",
          description: `Purchase of ${orderItems.length} courses`,
          image: favicon,
          order_id: orderData.orderId,
          remember_customer: true,
          handler: (response) => {
            toast({
              title: "Payment Successful",
              description: `Payment ID: ${response.razorpay_payment_id}`,
            })
          },
          prefill: {
            username: user?.username,
            email: user?.email,
            contact: "",
          },
          notes: {
            address: "Course Platform Corporate Office",
          },
          theme: {
            color: "#0c3835",
          },
        }

        const razorpay = new Razorpay(options)
        razorpay.open()
      }
    } catch (error) {
      console.error("Payment error:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Payment failed. Please try again.",
      })
    } finally {
      setIsProcessing(false)
    }
  }


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <h1 className="text-2xl font-semibold">Checkout</h1>

          {/* Billing Address */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Billing address</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Country</Label>
                <Select defaultValue="IN">
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="IN">India</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>State / Union Territory</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="RJ">Rajasthan</SelectItem>
                    {/* Add other states */}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              We are required by law to collect applicable transaction taxes for purchases made in certain tax jurisdictions.
            </p>
          </div>

          {/* Payment Method */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Payment method</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Lock className="h-4 w-4" />
                Secure and encrypted
              </div>
            </div>

            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center gap-4">
                  <RadioGroupItem value="upi" id="upi" />
                  <Label htmlFor="upi" className="flex items-center gap-2">
                    <img
                      src="/placeholder.svg?height=24&width=24"
                      alt="UPI"
                      width={24}
                      height={24}
                    />
                    UPI
                  </Label>
                </div>

                {paymentMethod === "upi" && (
                  <div className="pl-8">
                    <p className="mb-4">How would you like to use UPI?</p>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Button
                        variant={upiMethod === "qr" ? "default" : "outline"}
                        onClick={() => setUpiMethod("qr")}
                      >
                        QR code
                      </Button>
                      <Button
                        variant={upiMethod === "id" ? "default" : "outline"}
                        onClick={() => setUpiMethod("id")}
                      >
                        Enter UPI ID
                      </Button>
                    </div>
                    {upiMethod === "id" && (
                      <Input
                        className="mt-4"
                        placeholder="Enter your UPI ID"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                      />
                    )}
                    {qrCodeUrl && upiMethod === "qr" && (
                      <div className="mt-4 flex justify-center">
                        <img
                          src={qrCodeUrl}
                          alt="Payment QR Code"
                          width={200}
                          height={200}
                          className="rounded-lg"
                        />
                      </div>
                    )}
                    <p className="text-sm text-center mt-4">Complete your payment</p>
                    <p className="text-sm text-center text-muted-foreground">
                      Click the "Proceed" button to {upiMethod === "qr" ? "generate a QR code" : "proceed"} for UPI payment.
                    </p>
                  </div>
                )}
              </div>

              {/* Cards Option */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-4">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Cards
                  </Label>
                  <div className="flex gap-2 ml-auto">
                    {["visa", "mastercard", "amex", "diners", "rupay"].map((card) => (
                      <img
                        key={card}
                        src={`/placeholder.svg?height=24&width=32`}
                        alt={card}
                        width={32}
                        height={24}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Net Banking Option */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-4">
                  <RadioGroupItem value="netbanking" id="netbanking" />
                  <Label htmlFor="netbanking" className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Net Banking
                  </Label>
                </div>
              </div>

              {/* Mobile Wallets Option */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-4">
                  <RadioGroupItem value="wallet" id="wallet" />
                  <Label htmlFor="wallet" className="flex items-center gap-2">
                    <Wallet className="h-5 w-5" />
                    Mobile Wallets
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Order Details */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Order details ({orderItems.length} courses)</h2>
            <div className="space-y-4">
              {orderItems.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    width={40}
                    height={40}
                    className="rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.title}</h3>
                    <div className="flex gap-2">
                      <span className="font-semibold">₹{item.price}</span>
                      <span className="text-muted-foreground line-through">₹{item.originalPrice}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Original Price:</span>
                <span>₹{totalOriginalPrice}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Discounts ({discountPercentage}% Off):</span>
                <span>-₹{totalDiscount}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                <span>Total ({orderItems.length} courses):</span>
                <span>₹{totalPrice}</span>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <Button
                className="w-full"
                size="lg"
                onClick={handlePayment}
                disabled={isProcessing}
              >
                <Lock className="mr-2 h-4 w-4" />
                {isProcessing ? "Processing..." : "Proceed"}
              </Button>

              <p className="text-sm text-center">
                By completing your purchase you agree to these{" "}
                <a href="#" className="text-primary hover:underline">
                  Terms of Service
                </a>
                .
              </p>

              <div className="text-center space-y-2">
                <h3 className="font-semibold">30-Day Money-Back Guarantee</h3>
                <p className="text-sm text-muted-foreground">
                  Not satisfied? Get a full refund within 30 days.
                  <br />
                  No questions asked!
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

