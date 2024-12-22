'use client'

import { ChevronRight, Clock, Globe, Play, Star } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { fetchCourse } from '@/lib/api'
import { useEffect, useState } from 'react'
import { Course } from '@/types'

export default function CourseOverview() {
  const { courseId } = useParams<{ courseId: string }>()
  const [loading, setLoading] = useState(true)
  const [course, setCourse] = useState<Course>({
    _id: '',
    title: '',
    description: '',
    price: 0,
    thumbnail: '',
    category: '',
    createdBy: {
      _id: '',
      email: '',
      username: '',
    },
    tracks: [],
    studentsEnrolled: [],
    reviews: [],
    averageRating: 0,
    status: '',
  })

  useEffect(() => {
    const loadCourse = async () => {
      try {
        console.log('Fetching course:', courseId);
        
        const response = await fetchCourse(courseId)
        if (response.data.success) {
          setCourse(response.data.data)
        } else {
          console.error('Failed to fetch courses:', response.data.message)
        }
        console.log('Course:', course);
        
        setLoading(false)
      } catch (error) {
        console.error('Error fetching courses:', error)
        setLoading(false)
      }
    }
    loadCourse()
  }, [courseId])

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link to="/courses" className="hover:text-primary">
            {course.category}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/courses/programming" className="hover:text-primary">
            Programming Languages
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span>SQL</span>
        </nav>

        {/* Course Content */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
              <p className="text-xl text-muted-foreground">{course.description}</p>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="font-medium">{course.averageRating}</span>
                <Link to="#reviews" className="text-muted-foreground hover:text-primary">
                  ({course.reviews.length} ratings)
                </Link>
              </div>
              <div className="text-muted-foreground">
                {course.studentsEnrolled.length} learners
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Last updated 4/2023
              </div>
              <div className="flex items-center gap-1">
                <Globe className="h-4 w-4" />
                English
              </div>
            </div>

            <Card className="aspect-video relative overflow-hidden">
              <div
              className="absolute inset-0 flex items-center justify-center bg-black bg-cover bg-center "
              style={{ backgroundImage: `url(${course.thumbnail})` }}
              >
              <Button size="lg" variant="secondary" className="gap-2">
                <Play className="h-6 w-6" />
                Preview this course
              </Button>
              </div>
            </Card>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">What you'll learn</h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                <li className="flex gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 flex-shrink-0"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Learn the fundamentals of SQL</span>
                </li>
                <li className="flex gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 flex-shrink-0"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Learn how to request data from a server, limit and sort the responses, aggregate data from multiple tables</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Explore related topics</h2>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">SQL</Badge>
                <Badge variant="secondary">Programming Languages</Badge>
                <Badge variant="secondary">Development</Badge>
              </div>
            </div>
          </div>

          <div className="md:col-span-1">
            <Card className="sticky top-6">
              <CardContent className="p-6">
                <Tabs defaultValue="personal" className="w-full">
                  <TabsList className="w-full mb-4">
                    <TabsTrigger value="personal" className="flex-1">
                      Personal
                    </TabsTrigger>
                    <TabsTrigger value="teams" className="flex-1">
                      Teams
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="personal" className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="text-sm">This Premium course is included in plans</div>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold">₹{course.price}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-red-600">
                      <Clock className="h-4 w-4" />
                      <span>3 hours</span>
                      left at this price!
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1">Add to cart</Button>
                      <Button variant="outline" size="icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                        </svg>
                      </Button>
                    </div>
                    <div className="text-center text-sm text-muted-foreground">
                      30-Day Money-Back Guarantee
                    </div>
                    <div className="text-center text-sm text-muted-foreground">
                      Full Lifetime Access
                    </div>
                    <div className="flex justify-between text-sm">
                      <Button variant="link" className="p-0">
                        Share
                      </Button>
                      <Button variant="link" className="p-0">
                        Gift this course
                      </Button>
                      <Button variant="link" className="p-0">
                        Apply Coupon
                      </Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="teams" className="space-y-4">
                    <div className="text-center text-muted-foreground">
                      Contact sales for team pricing
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
