"use client"

import { useState } from 'react'
import { Course } from '@/types/index'
import { CourseCard } from '@/components/course-card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface CategoryCoursesProps {
  category: string
  initialCourses: Course[]
  course: Course
}

export default function CategoryCourses({ category, initialCourses }: CategoryCoursesProps) {

  const [courses, setCourses] = useState(initialCourses)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('popularity')

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === 'price-low-to-high') return a.price - b.price
    if (sortBy === 'price-high-to-low') return b.price - a.price
    if (sortBy === 'rating') return b.averageRating - a.averageRating
    // Default to sort by popularity
    return b.totalLearners - a.totalLearners
  })
  console.log(sortedCourses,'sorted ----------------------');
  

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 capitalize">{category} Courses</h1>
      
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <Input
          type="search"
          placeholder="Search courses..."
          className="max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popularity">Most Popular</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="price-low-to-high">Price: Low to High</SelectItem>
            <SelectItem value="price-high-to-low">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedCourses.map(course => (
          <CourseCard key={course._id}
          title={course.title}
          instructor={course.createdBy.username}
          rating={course.averageRating}
          totalRatings={course.studentsEnrolled.length}
          price={course.price}
          originalPrice={course.price} // Assuming original price is not provided in the new interface
          thumbnail={course.thumbnail}
          onAddToCart={course.onAddToCart}
          onAddToWishlist={course.onAddToWishlist} />
        ))}
      </div>

      {sortedCourses.length === 0 && (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-2">No courses found</h2>
          <p className="text-muted-foreground">Try adjusting your search or filter to find what you're looking for.</p>
        </div>
      )}
    </div>
  )
}

