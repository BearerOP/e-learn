"use client"

import { useState, useEffect } from "react"
import { fetchAllCourse } from "@/lib/api"
import { toast, Toaster } from "sonner"
import { CourseCarousel } from "@/components/course-carousel"
import { HeroCarousel } from "@/components/hero-carousel"
import { CarouselItem, Course } from "@/types"

const courseItems: CarouselItem[] = [
  {
    id: '1',
    title: 'Introduction to React',
    imageUrl: 'https://www.bearerop.tech/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Ftheslugproject.appspot.com%2Fo%2Fportfolio%252Fstartup-template.jpg%3Falt%3Dmedia%26token%3De20f0c2d-71d7-4736-8369-220d1b3c149d&w=1600&q=75',
  },
  {
    id: '2',
    title: 'Advanced JavaScript Techniques',
    imageUrl: 'https://www.bearerop.tech/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Ftheslugproject.appspot.com%2Fo%2Fportfolio%252Fgyansagar.jpg%3Falt%3Dmedia%26token%3Dd939d4e6-76eb-413e-828a-e3d789172c24&w=1600&q=75',
  },
  {
    id: '3',
    title: 'Building RESTful APIs',
    imageUrl: 'https://www.bearerop.tech/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Ftheslugproject.appspot.com%2Fo%2Fportfolio%252Favadhi.jpg%3Falt%3Dmedia%26token%3D27115960-b6fa-41d4-af7d-c54f693c767a&w=1600&q=75',
  },
  {
    id: '4',
    title: 'Machine Learning Fundamentals',
    imageUrl: 'https://www.bearerop.tech/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Ftheslugproject.appspot.com%2Fo%2Fportfolio%252FScreenshot%25202024-08-29%2520at%252009.10.23.png%3Falt%3Dmedia%26token%3D7b55cdc6-9df5-482f-9a2c-92da4949ae69&w=1600&q=75',
  },
]

export default function Dashboard() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await fetchAllCourse()
        setCourses(data?.data?.data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching courses:", error)
        setLoading(false)
        toast.error("Failed to fetch courses. Please try again.")
      }
    }
    loadCourses()
  }, [])

  const handleAddToCart = (courseId: string) => {
    console.log("Adding to cart:", courseId)
    toast.success("Course added to cart")
    // Add your cart logic here
  }

  const handleAddToWishlist = (courseId: string) => {
    console.log("Adding to wishlist:", courseId)
    toast.success("Course added to wishlist")
    // Add your wishlist logic here
  }

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <span className="text-lg text-muted-foreground">Loading courses...</span>
      </div>
    )
  }

  // Function to get random courses
  const getRandomCourses = (count: number) => {
    const shuffled = [...courses].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }

  // Function to get top-rated courses
  const getTopRatedCourses = (count: number) => {
    return [...courses].sort((a, b) => b.averageRating - a.averageRating).slice(0, count)
  }

  return (
    <>
      <div className="space-y-12 p-6">
        <HeroCarousel items={courseItems} />
        <CourseCarousel 
          title="Recommended for you" 
          courses={getRandomCourses(10).map(course => ({
            ...course,
            onAddToCart: () => handleAddToCart(course._id),
            onAddToWishlist: () => handleAddToWishlist(course._id)
          }))} 
        />
        <CourseCarousel 
          title="Top Rated Courses" 
          courses={getTopRatedCourses(10).map(course => ({
            ...course,
            onAddToCart: () => handleAddToCart(course._id),
            onAddToWishlist: () => handleAddToWishlist(course._id)
          }))} 
        />
        <CourseCarousel 
          title="All Courses" 
          courses={courses.map(course => ({
            ...course,
            onAddToCart: () => handleAddToCart(course._id),
            onAddToWishlist: () => handleAddToWishlist(course._id)
          }))} 
        />
      </div>
    </>
  )
}

