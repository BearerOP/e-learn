"use client";

import { useState, useEffect } from "react";
import { Course } from "@/types/index";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import CheckoutButton from "@/components/checkout";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CartSkeleton } from "@/components/skeletons";
import { useCart } from "@/contexts/cart-context";

export default function CartContents() {
  const [cartItems, setCartItems] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { handleRemoveFromCart, cart } = useCart();

  useEffect(() => {
    setCartItems(cart);
    setLoading(false);
    window.scrollTo(0, 0);
  }, [cart]);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  const onCheckout = () => {
    toast.info("Redirecting to checkout page...");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {loading && <CartSkeleton />}
      {cartItems.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className="text-center py-12"
        >
          <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-4">
            Looks like you haven't added any courses yet.
          </p>
          <Button onClick={() => navigate("/")}>Browse Courses</Button>
        </motion.div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
              >
                <Card>
                  <CardContent className="flex items-center p-4">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-24 h-16 object-cover rounded mr-4"
                    />
                    <div className="flex-grow">
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        <strong>Created By:</strong>{" "}
                        {item.createdBy?.username || "Unknown"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Average Rating:</strong>{" "}
                        {item.averageRating
                          ? item.averageRating.toFixed(1)
                          : "N/A"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">₹{item.price}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveFromCart(item._id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
          >
            <Card>
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-4">Total:</h2>
                <p className="text-3xl font-bold mb-6">
                  ₹{totalPrice.toFixed(2)}
                </p>
                <div className="w-fit" onClick={onCheckout}>
                  <CheckoutButton
                    orderItems={cartItems}
                    totalAmount={parseInt(totalPrice.toFixed(2))}
                    currency="INR"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}
    </div>
  );
}
