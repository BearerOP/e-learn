"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { CourseCard } from "@/components/course-card"
import { Course } from "@/types"

interface CourseCarouselProps {
  title: string
  courses: Course[]
}

export function CourseCarousel({ title, courses }: CourseCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount)
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("left")}
            className="rounded-full"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("right")}
            className="rounded-full"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
      >
        {courses.map((course) => (
          <CourseCard
            key={course._id}
            title={course.title}
            instructor={course.createdBy.username}
            rating={course.averageRating}
            totalRatings={course.studentsEnrolled.length}
            price={course.price}
            originalPrice={course.price} // Assuming original price is not provided in the new interface
            thumbnail={course.thumbnail}
            onAddToCart={course.onAddToCart}
            onAddToWishlist={course.onAddToWishlist}
          />
        ))}
      </div>
    </div>
  )
}

