import { MoreVertical, Play, ShoppingCart } from 'lucide-react'
import { Course } from "@/types/index"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCart } from '@/contexts/cart-context'

interface WishlistCourseCardProps {
  course: Course
}

export function WishlistCourseCard({ course }: WishlistCourseCardProps) {
  const { handleAddToCart } = useCart()
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative aspect-video">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button variant="secondary" size="sm" className="gap-2">
              <Play className="w-4 h-4" />
              Preview
            </Button>
          </div>
          <div className="absolute top-2 right-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="bg-black/20 hover:bg-black/40 text-white">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleAddToCart(course._id)}>
                  Move to cart
                </DropdownMenuItem>
                <DropdownMenuItem>Remove from wishlist</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-semibold mb-2 line-clamp-2">{course.title}</h3>
        <p className="text-sm text-muted-foreground mb-2">{course.category}</p>
        <p className="font-bold">${course.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" onClick={() => handleAddToCart(course._id)}>
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
