import { Heart, ShoppingCart, Star, StarHalf } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useNavigate } from 'react-router-dom'
import { Course } from '@/types'


export const CourseCard: React.FC<Course> = ( course ) => {

  const navigate = useNavigate()

  // Format number with commas
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  // Format price to INR
  const formatPrice = (price: number) => {
    return `₹${price}`
  }

  // Generate rating stars
  const renderRatingStars = (rating: number) => {
    const stars = []
    const totalStars = 5
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < totalStars; i++) {
      if (i < fullStars) {
        stars.push(
          <Star
            key={`star-${i}`}
            className="h-4 w-4 fill-yellow-400 text-yellow-400"
          />
        )
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <StarHalf
            key="half-star"
            className="h-4 w-4 fill-yellow-400 text-yellow-400"
          />
        )
      } else {
        stars.push(
          <Star
            key={`star-${i}`}
            className="h-4 w-4 text-gray-300"
          />
        )
      }
    }

    return stars
  }

  return (
    <>

      <Card className="group relative min-w-[278px] overflow-hidden transition-all hover:shadow-lg">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={course?.thumbnail}
            alt={course?.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Hover Actions */}
          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <Button
              onClick={course?.onAddToCart}
              variant="secondary"
              size="sm"
              className="flex items-center gap-2"
            >
              <ShoppingCart className="h-4 w-4" />
              Add to cart
            </Button>
            <Button
              onClick={course?.onAddToWishlist}
              variant="secondary"
              size="icon"
              className="h-8 w-8"
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="space-y-3">
            <h3 className="line-clamp-2 font-bold">{course?.title}</h3>
            <p className="text-sm text-muted-foreground">{course?.createdBy?.username}</p>
            <div className="flex items-center gap-2">
              {course?.averageRating > 0 ? (
                <>
                  <span className="font-bold">{course?.averageRating.toFixed(1)}</span>
                  <div className="flex items-center">
                    {renderRatingStars(course?.averageRating)}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({formatNumber(course?.averageRating)})
                  </span>
                </>
              ) : (
                <>
                  <div className="flex items-center">
                    {renderRatingStars(0)}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Not rated yet
                  </span>
                </>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold">{formatPrice(course?.price)}</span>
              {course?.price !== course?.price && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(course?.price)}
                </span>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="">
          <Button className="w-full" onClick={() => {
            // Redirect to course page
            navigate(`/course/overview/${course?._id}`)
          }} >
            Preview Course
          </Button>
        </CardFooter>
      </Card>

    </>
  )
}

