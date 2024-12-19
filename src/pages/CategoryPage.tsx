import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchCoursesByCategory } from '@/lib/api'
import CategoryCourses from '@/components/category-courses'
import { CategorySkeleton } from '@/components/skeletons'

export default function CategoryPage() {
  const { category } = useParams() // Get category from URL params
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (!category) return // Skip fetching if category is not available yet

    const fetchCourses = async () => {
      try {
        const fetchedCourses = await fetchCoursesByCategory(category)
        if (!fetchedCourses) {
          // navigate('/') // Redirect to 404 if no courses are found
        } else {
          setCourses(fetchedCourses.data.data)
        }
      } catch (error) {
        console.error("Error fetching courses:", error)
        // navigate('/') 
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [category, navigate])

  if (loading) {
    return <CategorySkeleton />
  }

  return (
    <CategoryCourses category={category} initialCourses={courses} course={courses[0]} />
  )
}
