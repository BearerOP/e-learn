import { useState } from 'react'
import { Search, PlusCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CourseTracksManagement } from '@/components/tracks-management'
import { Course } from '@/types'

interface CourseManagementProps {
  setActiveView: (view: string) => void;
  courses: Course[]
  onUpdateCourse: (updatedCourse: Course) => void
}

export function CourseManagement({ courses, onUpdateCourse,setActiveView }: CourseManagementProps) {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const handleNewCourse = () => {
    setActiveView("createCourse");
  };

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="flex gap-2">
            <div className="relative flex-1 md:w-[300px]">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search your courses" className="pl-8" />
            </div>
            <Select defaultValue="newest">
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="popular">Popular</SelectItem>
                <SelectItem value="title">Title</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleNewCourse}>
            <PlusCircle className="mr-2 h-4 w-4" />
            New course
          </Button>
        </div>
      </div>

      {selectedCourse ? (
        <CourseTracksManagement 
          course={selectedCourse} 
          onUpdateCourse={(updatedCourse) => {
            onUpdateCourse(updatedCourse)
            setSelectedCourse(updatedCourse)
          }}
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Card 
              key={course._id} 
              className="overflow-hidden cursor-pointer" 
              onClick={() => handleCourseClick(course)}
            >
              <CardHeader className="border-b p-0">
                <div className="relative aspect-video">
                  <img src={course.thumbnail} alt={course.title} className="object-cover w-full h-full" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-lg font-semibold text-white">{course.title}</h3>
                    <div className="mt-2 flex items-center gap-2">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        course.status === "published"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        {course.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Enrolled Students</span>
                    <span className="font-medium">{course.studentsEnrolled.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

