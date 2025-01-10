"use client";

import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Star,
  StarHalf,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCarousel } from "../hooks/useCarousel";
import { Course } from "../types/index";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "./ui/skeleton";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface CourseCarouselProps {
  loading: boolean;
  items: Course[];
}

export function HeroCarousel({ loading, items }: CourseCarouselProps) {
  const navigate = useNavigate();
  const { currentIndex, next, prev, goTo, isAutoScrolling, toggleAutoScroll } =
    useCarousel(items.length);
  const renderRatingStars = (rating: number) => {
    const stars = [];
    const totalStars = 5;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < totalStars; i++) {
      if (i < fullStars) {
        stars.push(
          <Star
            key={`star-${i}`}
            className="h-4 w-4 fill-yellow-400 text-yellow-400"
          />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <StarHalf
            key="half-star"
            className="h-4 w-4 fill-yellow-400 text-yellow-400"
          />
        );
      } else {
        stars.push(
          <Star key={`star-${i}`} className="h-4 w-4 text-gray-300" />
        );
      }
    }

    return stars;
  };
  return (
    <div className="relative w-full max-w-5xl mx-auto">
      {loading ? (
        <div className=" aspect-video space-y-4">
          <Skeleton className="flex flex-col h-3/4 w-full space-y-4 rounded-2xl" />
          <Skeleton className="h-12 w-3/4 rounded-2xl" />
          <Skeleton className="h-12 w-1/4 rounded-2xl" />
        </div>
      ) : (
        <Card
          onClick={() => {
            navigate("/course/overview/" + items[currentIndex]?._id);
          }}
          className="overflow-hidden cursor-pointer"
        >
          <CardContent className="p-0">
            <div className="relative aspect-video">
              <LazyLoadImage
                src={items[currentIndex]?.thumbnail}
                alt={items[currentIndex]?.title}
                width="100%"
                height="100%"
                effect="blur"
                className="h-full w-full object-cover  transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end justify-bottom p-4 pb-6">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <div className="w-full md:w-3/4 lg:w-1/2 relative">
                  <div className="relative z-10 p-4">
                    <h3 className="text-white text-xl md:text-2xl lg:text-3xl font-bold">
                      {items[currentIndex]?.title}
                    </h3>
                    <h2 className="text-white/90 text-sm md:text-md lg:text-md">
                      {items[currentIndex]?.description}
                    </h2>
                    <span className="">
                      Created by: {items[currentIndex]?.createdBy.username}
                    </span>
                    <span className="font-bold"></span>
                    <div className="flex items-center">
                      {renderRatingStars(items[currentIndex]?.averageRating)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="absolute top-1/2 left-4 xl:-left-16 transform -translate-y-1/2">
        <Button
          variant="outline"
          size="icon"
          onClick={prev}
          className="rounded-full"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous course</span>
        </Button>
      </div>

      <div className="absolute top-1/2 right-4 xl:-right-16 transform -translate-y-1/2">
        <Button
          variant="outline"
          size="icon"
          onClick={next}
          className="rounded-full"
        >
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
              index === currentIndex ? "bg-primary" : "bg-secondary"
            }`}
            onClick={() => goTo(index)}
          >
            <span className="sr-only">Go to slide {index + 1}</span>
          </Button>
        ))}
      </div>

      <div className="absolute top-4 right-4">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleAutoScroll}
          className="rounded-full"
        >
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
  );
}
