"use client"

import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CourseGrid } from "@/components/course-grid"
import { UserCourses, CourseCategory } from "@/types/index"
import { fetchMyCourse } from "@/lib/api"
import { useTabContext } from '@/contexts/tab-context'
import { motion } from 'framer-motion'


export default function MyLearning() {
  window.scrollTo(0, 0);
  const { activeTab, setActiveTab } = useTabContext() // Access context
  const [userCourses, setUserCourses] = useState<UserCourses | null>(null)
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()
  const { category } = useParams()

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const response = await fetchMyCourse()
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

  useEffect(() => {
    if (category && category !== activeTab) {
      navigate(`/my-learning/${activeTab}`)
    }
  }, [activeTab, category])

  const getCourses = () => {
    if (!userCourses) return []
    switch (activeTab) {
      case 'purchased':
        return userCourses.purchasedCourses
      case 'wishlist':
        return userCourses.wishlist
      case 'archived':
        return userCourses.archivedCourses
      default:
        return []
    }
  }

  return (
    <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
        duration: 0.3,
        ease: "easeInOut",
    }} className="container min-h-[85vh] mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">My Learning</h1>
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as CourseCategory)}>
        <TabsList className="w-fit justify-start  border-b mb-8">
          <TabsTrigger value="purchased">Purchased Courses</TabsTrigger>
          <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
          <TabsTrigger value="learning-tools">Learning Tools</TabsTrigger>
        </TabsList>

        <TabsContent value="purchased">
          <CourseGrid courses={getCourses()} loading={loading} category="purchased" />
        </TabsContent>

        <TabsContent value="wishlist">
          <CourseGrid courses={getCourses()} loading={loading} category="wishlist" />
        </TabsContent>
        <TabsContent value="archived">
          <CourseGrid courses={getCourses()} loading={loading} category="archived" />
        </TabsContent>

        <TabsContent value="learning-tools">
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold">Learning tools coming soon!</h3>
            <p className="text-muted-foreground mt-2">
              We're working on bringing you helpful learning tools and resources.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
