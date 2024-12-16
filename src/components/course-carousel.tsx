'use client'

import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useCarousel } from '../hooks/useCarousel'
import { CarouselItem } from '../types/index'

interface CourseCarouselProps {
  items: CarouselItem[]
}

export function CourseCarousel({ items }: CourseCarouselProps) {
  const { currentIndex, next, prev, goTo, isAutoScrolling, toggleAutoScroll } = useCarousel(items.length)

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative aspect-video">
            <img
              src={items[currentIndex].imageUrl}
              alt={items[currentIndex].title}
              className="object-cover h-full w-full"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
              <h3 className="text-white text-2xl font-bold p-4">
                {items[currentIndex].title}
              </h3>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
        <Button variant="outline" size="icon" onClick={prev} className="rounded-full">
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous course</span>
        </Button>
      </div>

      <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
        <Button variant="outline" size="icon" onClick={next} className="rounded-full">
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next course</span>
        </Button>
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {items.map((_, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className={`w-2 h-2 rounded-full p-0 ${
              index === currentIndex ? 'bg-primary' : 'bg-secondary'
            }`}
            onClick={() => goTo(index)}
          >
            <span className="sr-only">Go to slide {index + 1}</span>
          </Button>
        ))}
      </div>

      <div className="absolute top-4 right-4">
        <Button variant="outline" size="icon" onClick={toggleAutoScroll} className="rounded-full">
          {isAutoScrolling ? (
            <>
              <Pause className="h-4 w-4" />
              <span className="sr-only">Pause auto-scroll</span>
            </>
          ) : (
            <>
              <Play className="h-4 w-4" />
              <span className="sr-only">Start auto-scroll</span>
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

