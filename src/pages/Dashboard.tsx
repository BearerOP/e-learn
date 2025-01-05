"use client";

import { useState, useEffect } from "react";
import { addToCart, fetchAllCourse } from "@/lib/api";
import { toast } from "sonner";
import { CourseCarousel } from "@/components/course-carousel";
import { HeroCarousel } from "@/components/hero-carousel";
import { Course } from "@/types";
import MinimalLoaderComponent from "@/components/ui/minimal-loader";
import { useNavigate } from "react-router-dom";
import { LazyMotion,domAnimation } from "motion/react";

export default function Dashboard() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await fetchAllCourse();
        setCourses(data?.data?.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setLoading(false);
        toast.error("Failed to fetch courses. Please try again.");
      }
    };
    loadCourses();
  }, []);

  const handleAddToCart = async (courseId: string) => {
    try {
      const response = await addToCart(courseId);
      if (!response) {
        toast.error("Failed to add course to cart. Please try again.");
        return;
      }
      toast.success(response.data.message, 
        {
          action: {
            label: 'Go to Cart',
            onClick: () => {
              navigate('/cart');
            },
            actionButtonStyle: {
              backgroundColor: '#2dd4bf',
              color:'#0c3835',
            },
          },
          duration: 5000,
        }
        );
    } catch (error) {
      console.error("Error adding course to cart:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to add course to cart. Please try again."
      );
    }
  };

  const handleAddToWishlist = (courseId: string) => {
    console.log("Adding to wishlist:", courseId);
    toast.success("Course added to wishlist");
    // Add your wishlist logic here
  };

  // if (loading) {
  //   return (
  //     <div className="flex h-[90vh] items-center justify-center bg-black">
  //       <MinimalLoaderComponent />
  //     </div>
  //   );
  // }

  // Function to get random courses
  const getRandomCourses = (count: number) => {
    const shuffled = [...courses].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // Function to get top-rated courses
  const getTopRatedCourses = (count: number) => {
    return [...courses]
      .sort((a, b) => b.averageRating - a.averageRating)
      .slice(0, count);
  };

  return (
    <>
    <LazyMotion features={domAnimation}>

      <div className="space-y-12 p-6">
        <HeroCarousel loading={loading} items={getTopRatedCourses(5)} />
        <CourseCarousel
          title="Recommended for you"
          courses={getRandomCourses(10).map((course) => ({
            ...course,
            onAddToCart: () => handleAddToCart(course._id),
            onAddToWishlist: () => handleAddToWishlist(course._id),
          }))}
        />
        <CourseCarousel
          title="Top Rated Courses"
          courses={getTopRatedCourses(10).map((course) => ({
            ...course,
            onAddToCart: () => handleAddToCart(course._id),
            onAddToWishlist: () => handleAddToWishlist(course._id),
          }))}
        />
        <CourseCarousel
          title="All Courses"
          courses={courses.map((course) => ({
            ...course,
            onAddToCart: () => handleAddToCart(course._id),
            onAddToWishlist: () => handleAddToWishlist(course._id),
          }))}
        />
      </div>
    </LazyMotion>
    </>

  );
}
