import { useState, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Link } from "react-router-dom"
import { motion } from 'framer-motion'
import { Grid2X2, List } from "lucide-react"
import { toast } from "sonner"
import { Separator } from "../components/ui/separator"
import { fetchAllCourse } from "../lib/api"
import { CarouselItem, Course } from "../types"
import { CourseCarousel } from "@/components/course-carousel"


const courseItems: CarouselItem[] = [
  {
    id: '1',
    title: 'Introduction to React',
    imageUrl: 'https://www.bearerop.tech/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Ftheslugproject.appspot.com%2Fo%2Fportfolio%252Fstartup-template.jpg%3Falt%3Dmedia%26token%3De20f0c2d-71d7-4736-8369-220d1b3c149d&w=1600&q=75',
  },
  {
    id: '2',
    title: 'Advanced JavaScript Techniques',
    imageUrl: 'https://www.bearerop.tech/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Ftheslugproject.appspot.com%2Fo%2Fportfolio%252Fgyansagar.jpg%3Falt%3Dmedia%26token%3Dd939d4e6-76eb-413e-828a-e3d789172c24&w=1600&q=75',
  },
  {
    id: '3',
    title: 'Building RESTful APIs',
    imageUrl: 'https://www.bearerop.tech/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Ftheslugproject.appspot.com%2Fo%2Fportfolio%252Favadhi.jpg%3Falt%3Dmedia%26token%3D27115960-b6fa-41d4-af7d-c54f693c767a&w=1600&q=75',
  },
  {
    id: '4',
    title: 'Machine Learning Fundamentals',
    imageUrl: 'https://www.bearerop.tech/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Ftheslugproject.appspot.com%2Fo%2Fportfolio%252FScreenshot%25202024-08-29%2520at%252009.10.23.png%3Falt%3Dmedia%26token%3D7b55cdc6-9df5-482f-9a2c-92da4949ae69&w=1600&q=75',
  },
]


export default function Dashboard() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [gridView, setGridView] = useState(true)

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await fetchAllCourse()
        console.log(data);

        setCourses(data?.data?.data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching courses:", error)
        setLoading(false)
        toast.error("Failed to fetch courses. Please try again.")
      }
    }
    loadCourses()
  }, [])

  return (
    <div className="space-y-6">
      <main className="flex min-h-screen flex-col items-center justify-top">
      <CourseCarousel items={courseItems} />
    </main>
      <div className="flex justify-between items-center">

        <h2 className="text-3xl font-bold">All Courses</h2>
        <Button
          onClick={() => setGridView(!gridView)}
          variant="ghost"
          className="text-gray-600 dark:text-gray-100"
        >
          {gridView ? <List className="h-4 w-4" /> : <Grid2X2 className="h-4 w-4" />}
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <span className="text-lg text-gray-800 dark:text-gray-100">Loading courses...</span>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className={`grid gap-6 min-h-[400px] ${gridView ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-2"}`}
        >
          {courses.map((course: Course) => (
            <motion.div
              key={course._id}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col rounded-2xl border border-primary/30 dark:border-primary/30 bg-primary/10 dark:bg-primary/10"
            >

              <div className="flex flex-col justify-between px-6 py-4">
                {
                  course.thumbnail ? (
                    <img
                      src={course.thumbnail}
                      alt={course.name}
                      className="w-full h-48 object-cover rounded-xl"
                    />
                  ) : (
                    <div className="w-full
                    h-48
                    bg-primary/20
                    dark:bg-primary/20
                    rounded-xl
                    flex
                    items-center
                    justify-center
                    text-primary
                    dark:text-primary
                    text-2xl
                    font-bold"
                    >

                      {course.thumbnail ? (
                        <img src={course.thumbnail} alt={course.name} className="w-full h-48 object-cover rounded-xl" />
                      ) : (
                        <div className="w-full h-48 bg-primary/20 dark:bg-primary/20 rounded-xl flex items-center justify-center text-primary dark:text-primary text-4xl font-bold">
                          {course.name[0]}
                        </div>
                      )
                      }
                    </div>
                  )
                }
                <div className="flex justify-between px-6 py-4">
                  <h3 className="font-bold text-xl md:text-2xl tracking-tighter text-gray-800 dark:text-gray-100">
                    {course.name}
                  </h3>
                  <span className="font-semibold text-primary dark:text-gray/75 hover:dark:text-primary hover:text-primary transition-all duration-300">
                    {course.price} USD
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-4 px-6 py-4 rounded-2xl bg-primary/15 dark:bg-primary/10">
                <div className="flex flex-col w-full">
                  <span className="font-bold text-lg  tracking-tighter text-gray-800 dark:text-gray-100">
                    Description
                  </span>
                  <p className="break-all text-sm text-gray-600 dark:text-gray-400 font-light hover:text-gray-800 dark:hover:text-gray-200 transition-all duration-300">
                    {gridView ? course.description.substring(0, 60) + "..." : course.description}
                  </p>
                  <Separator className='my-2 bg-primary/50' />
                  <span className="text-primary/80 text-sm">
                    <span className="text-gray-500 text-sm">Author: </span>
                    {course.author.username}
                  </span>
                  <Separator className='my-2 bg-primary/50' />
                  <div className="flex justify-between items-center">
                    <span className="text-primary/80 text-sm">
                      <span className="text-gray-500 text-sm">Duration: </span>
                      {course.duration}
                    </span>
                    <span className="text-primary/80 text-sm">
                      <span className="text-gray-500 text-sm">Category: </span>
                      {course.category}
                    </span>
                  </div>
                </div>
                <Link to={`/courses/${course._id}`}>
                  <Button className="w-full bg-primary text-white hover:bg-primary-dark dark:bg-primary/90 dark:hover:bg-primary/80">
                    View Course
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}