import { addToCart, getCartItems, removeFromCart } from "@/lib/api";
import { Course } from "@/types";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface CartContextType {
  cart: Course[];
  fetchCart: () => Promise<void>;
  handleAddToCart: (courseId: string) => Promise<void>;
  handleRemoveFromCart: (courseId: string) => Promise<void>;
}

// Create Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart Provider
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<Course[]>([]);
  const navigate = useNavigate();

  // Fetch Cart Items
  const fetchCart = async () => {
    try {
      const response = await getCartItems();
      if (response?.data) {
        setCart(response.data.cart); // Update cart state
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
      toast.error("Failed to fetch cart items.");
    }
  };

  // Add to Cart
  const handleAddToCart = async (courseId: string) => {
    // Check if the course is already in the cart
    const isCourseInCart = cart.some((item) => item._id === courseId);
    if (isCourseInCart) {
      toast.error("Course is already in the cart.");
      return;
    }
    try {
      const response = await addToCart(courseId);
      if (!response) {
        toast.error("Failed to add course to cart. Please try again.");
        return;
      }
      toast.success(response.data.message, {
        action: {
          label: "Go to Cart",
          onClick: () => {
            navigate("/cart");
          },
          actionButtonStyle: {
            backgroundColor: "#2dd4bf",
            color: "#0c3835",
          },
        },
        duration: 5000,
      });
      console.log("backend called");

      fetchCart();
    } catch (error) {
      console.error("Error adding course to cart:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to add course to cart. Please try again."
      );
    }
  };

  // Remove from Cart
  const handleRemoveFromCart = async (courseId: string) => {
    // Temporarily remove the item from the cart
    const updatedCart = cart.filter((item) => item._id !== courseId);
    setCart(updatedCart);

    // Show toast with undo option
    toast.success("Course removed from cart.", {
      action: {
        label: "Undo",
        onClick: () => {
          // Revert the cart state if undo is clicked
          setCart(cart);
        },
        actionButtonStyle: {
          backgroundColor: "#2dd4bf",
          color: "#0c3835",
        },
      },
      duration: 5000,
      onDismiss: async () => {
        // If the toast is dismissed without undo, make the backend call
        if (cart.length !== updatedCart.length) {
          try {
            const response = await removeFromCart(courseId);
            console.log("backend called");

            if (!response) {
              toast.error(
                "Failed to remove course from cart. Please try again."
              );
              // Revert the cart state if the backend call fails
              setCart(cart);
              return;
            }
            toast.success(response.data.message);
            // Refresh cart items after removal
            fetchCart();
          } catch (error) {
            console.error("Error removing course from cart:", error);
            toast.error(
              error.response?.data?.message ||
                "Failed to remove course from cart. Please try again."
            );
            // Revert the cart state if the backend call fails
            setCart(cart);
          }
        }
      },
    });
  };

  // Fetch cart items on mount
  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{ cart, fetchCart, handleAddToCart, handleRemoveFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook to Use Cart Context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
