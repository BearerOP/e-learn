"use client"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Track } from "@/types/index"
import { TrackGrid } from "@/components/track-grid"
import { getCourseContent } from "@/lib/api"

export default function CourseContent() {
  const { courseId } = useParams<{ courseId: string }>()
  const [loading, setLoading] = useState(true)
  const [courseContent, setCourseContent] = useState<Track[]>([])
  const [courseTitle, setCourseTitle] = useState<string>("")

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchCourseContent = async () => {
      try {
        const response = await getCourseContent(courseId)
        setCourseContent(response.data.data)
        setCourseTitle(response.data.courseTitle)
        setLoading(false)
      } catch (err) {
        console.error(err)
      }
    }
    fetchCourseContent();
  }, [])

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">{courseTitle}</h1>
          <TrackGrid tracks={courseContent} loading={loading} />
      </div>
    </>
  )
}
