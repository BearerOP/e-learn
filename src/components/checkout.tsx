import { useState } from "react";
import { Button } from "./ui/button";
import favicon from "../../favicon.svg";
import { useAuth } from "@/contexts/auth-context";
import { Course, PaymentDetails } from "@/types";
import {
  createOrder as createOrderApi,
  purchaseCourse as purchaseCourseApi,
} from "@/lib/api";
import Razorpay from "react-razorpay/dist/razorpay";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function CheckoutButton({
  orderItems,
  currency,
  totalAmount,
}: {
  orderItems: Course[];
  currency: string;
  totalAmount: number;
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const createOrderFunction = async (): Promise<PaymentDetails | null> => {
    try {
      const response = await createOrderApi({
        amount: totalAmount,
        currency,
      });

      const data = response.data?.data;

      if (data?.error) {
        throw new Error(data.error);
      }

      return {
        orderId: data.id,
        amount: totalAmount,
        currency,
      };
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error(error.message || "An error occurred while creating order.");
      return null;
    }
  };

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      const orderData = await createOrderFunction();
      if (!orderData) {
        setIsProcessing(false);
        return;
      }

      const options = {
        key: "rzp_test_UFqvqMvAS64vKp",
        amount: orderData.amount * 100, // Convert to paise
        currency: orderData.currency,
        name: "Gyansagar",
        description: `Purchase of ${orderItems.length} course(s)`,
        image: favicon,
        order_id: orderData.orderId,
        handler: async (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) => {
          console.log("Payment successful:", response);

          try {
            const purchasel = await purchaseCourseApi(orderItems);

            console.log("Purchase response:", purchasel.data);

            navigate("/my-learning");
          } catch (error) {
            console.error("Error updating user courses:", error);
            toast.error(
              error.response.message ||
                "An error occurred while updating user courses."
            );
          }

          toast.success(
            `Payment successful! \n
            Payment ID: ${response.razorpay_payment_id}\n
            Order ID: ${response.razorpay_order_id}\n
            Signature: ${response.razorpay_signature}`
          );
        },
        prefill: {
          name: user?.username || "Guest User",
          email: user?.email || "guest@example.com",
          contact: "",
        },
        notes: {
          address: "Course Platform Corporate Office",
        },
        theme: {
          color: "#0c3835",
        },
        timeout: 300,
        redirect: true,
        hidden: true,
        modal: {
          backdropclose: false,
          escape: true,
          handleback: true,
          confirm_close: true,
          ondismiss: () => {
            toast.info("Payment Cancelled");
          },
          animation: true,
        },
        remebmer_customer: true,
      };

      const razorpay = new Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(
        error.message || "An error occurred while processing payment."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Button onClick={handlePayment} disabled={isProcessing}>
      {isProcessing ? "Processing..." : "Checkout"}
    </Button>
  );
}
