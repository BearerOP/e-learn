import { Course, CourseCategory } from "@/types/index"
import { Skeleton } from "@/components/ui/skeleton"
import { LearningCourseCard } from "./learning-course-card"
import { WishlistCourseCard } from "./wishlist-course-card"
import { CartCourseCard } from "./cart-course-card"
import { ArchivedCourseCard } from "./archived-course-card"

interface CourseGridProps {
  courses: Course[]
  loading: boolean
  category: CourseCategory
  onAddToCart?: (courseId: string) => void
  onCheckout?: (courseId: string) => void
  onUnarchive?: (courseId: string) => void
}

export function CourseGrid({ 
  courses, 
  loading, 
  category,
  onAddToCart = () => {},
  onCheckout = () => {},
  onUnarchive = () => {}
}: CourseGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-[180px] w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    )
  }

  if (!courses.length) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold">No courses found</h3>
        <p className="text-muted-foreground mt-2">
          {category === 'purchased' && "You haven't enrolled in any courses yet."}
          {category === 'wishlist' && "Your wishlist is empty."}
          {category === 'cart' && "Your cart is empty."}
          {category === 'archived' && "You don't have any archived courses."}
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {courses.map((course) => {
        switch (category) {
          case 'purchased':
            return <LearningCourseCard key={course._id} course={course} />
          case 'wishlist':
            return <WishlistCourseCard key={course._id} course={course} onAddToCart={onAddToCart} />
          case 'cart':
            return <CartCourseCard key={course._id} course={course} onCheckout={onCheckout} />
          case 'archived':
            return <ArchivedCourseCard key={course._id} course={course} onUnarchive={onUnarchive} />
          default:
            return null
        }
      })}
    </div>
  )
}

