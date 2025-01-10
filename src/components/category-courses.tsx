"use client";

import { useEffect, useState } from "react";
import { Course } from "@/types/index";
import { CourseCard } from "@/components/course-card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { CategorySkeleton } from "./skeletons";

interface CategoryCoursesProps {
  category: string;
  initialCourses: Course[];
  course: Course;
  loading: boolean;
}

export default function CategoryCourses({
  category,
  initialCourses,
  loading,
}: CategoryCoursesProps) {
  const [courses, setCourses] = useState(initialCourses);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("popularity");

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.createdBy.username
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === "price-low-to-high") return a.price - b.price;
    if (sortBy === "price-high-to-low") return b.price - a.price;
    if (sortBy === "rating") return b.averageRating - a.averageRating;
    if (sortBy === "a-z") return a.title.localeCompare(b.title);
    // Default to sort by popularity
    // return b.totalLearners - a.totalLearners
  });

  useEffect(() => {
    setCourses(initialCourses);
  }, [initialCourses]);
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold mb-6 capitalize">Courses Dashboard</h1>

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
            <SelectItem value="a-z">
              Alphabetical (a-z) <span>&#9650;</span>
            </SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="price-low-to-high">
              Price: Low to High
            </SelectItem>
            <SelectItem value="price-high-to-low">
              Price: High to Low
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <CategorySkeleton />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {sortedCourses.map((course) => (
            <>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
              >
                <CourseCard key={course._id} course={course} />
              </motion.div>
            </>
          ))}
        </motion.div>
      )}
      {sortedCourses.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className="text-center py-12"
        >
          <h2 className="text-2xl font-semibold mb-2">
            No courses found for '
            <span className="font-light text-custom-green-text">
              {category}
            </span>
            '
          </h2>
          <p className="text-muted-foreground">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
