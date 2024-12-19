"use client"

import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CourseGrid } from "@/components/course-grid"
import { UserCourses, CourseCategory } from "@/types/index"
import { fetchMyCourse } from "@/lib/api"

export default function MyLearning() {
  const [userCourses, setUserCourses] = useState<UserCourses | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<CourseCategory>('purchased')

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const response = await fetchMyCourse()
        console.log("My courses:", response);
        
        if (response.data.success) {
          setUserCourses(response.data.data)
        } else {
          console.error("Failed to fetch courses:", response.data.message)
        }
        setLoading(false)
      } catch (error) {
        console.error("Error fetching courses:", error)
        setLoading(false)
      }
    }
    loadCourses()
  }, [])

  const getCourses = () => {
    if (!userCourses) return []
    switch (activeTab) {
      case 'purchased':
        return userCourses.purchasedCourses
      case 'wishlist':
        return userCourses.wishlist
      case 'cart':
        return userCourses.cart
      case 'archived':
        return userCourses.archivedCourses
      default:
        return []
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">My Learning</h1>
      <Tabs defaultValue="purchased" onValueChange={(value) => setActiveTab(value as CourseCategory)}>
        <TabsList className="w-fit justify-start  border-b mb-8">
          <TabsTrigger value="purchased">All Courses</TabsTrigger>
          <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
          <TabsTrigger value="cart">Cart</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
          <TabsTrigger value="tools">Learning Tools</TabsTrigger>
        </TabsList>

        <TabsContent value="purchased">
          <CourseGrid courses={getCourses()} loading={loading} category="purchased" />
        </TabsContent>
        
        <TabsContent value="wishlist">
          <CourseGrid courses={getCourses()} loading={loading} category="wishlist" />
        </TabsContent>

        <TabsContent value="cart">
          <CourseGrid courses={getCourses()} loading={loading} category="cart" />
        </TabsContent>

        <TabsContent value="archived">
          <CourseGrid courses={getCourses()} loading={loading} category="archived" />
        </TabsContent>

        <TabsContent value="tools">
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold">Learning tools coming soon!</h3>
            <p className="text-muted-foreground mt-2">
              We're working on bringing you helpful learning tools and resources.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
