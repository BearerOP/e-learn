"use client"

import { useEffect, useState } from "react"
import { CourseGrid } from "@/components/course-grid"
import Navbar from "@/components/layout/Navbar"
import { CourseContentView } from "@/components/tracks"
import { Track } from "@/types/index"
import { TrackGrid } from "@/components/track-grid"

const sampleCourseContent: Track[] = [
  {
    _id: "1",
    title: "Introduction to Web Development",
    description: "Get started with web development",
    type: "folder",
    subTracks: [
      { 
        _id: "1.1", 
        title: "Welcome to the Course", 
        description: "An introduction to the course",
        type: "video",
        videoUrl: "https://firebasestorage.googleapis.com/v0/b/theslugproject.appspot.com/o/gyansagar-courses%2Fweek1%2FJs-Basics.mov?alt=media&token=8814c902-161b-4397-9c17-b3361aeebd19"
      },
      { 
        _id: "1.2", 
        title: "Setting Up Your Development Environment", 
        description: "Learn how to set up your development environment",
        type: "text",
        content: "<h1>Setting Up Your Development Environment</h1><p>In this section, we'll cover the essential tools you need to start web development...</p>"
      },
    ],
  },
  {
    _id: "2",
    title: "HTML Fundamentals",
    description: "Learn the basics of HTML",
    type: "folder",
    subTracks: [
      { 
        _id: "2.1", 
        title: "HTML Basics", 
        description: "Introduction to HTML tags and structure",
        type: "video",
        videoUrl: "https://firebasestorage.googleapis.com/v0/b/theslugproject.appspot.com/o/gyansagar-courses%2Fweek1%2FJs-Basics.mov?alt=media&token=8814c902-161b-4397-9c17-b3361aeebd19"
      },
      { 
        _id: "2.2", 
        title: "HTML Forms", 
        description: "Learn how to create HTML forms",
        type: "video",
        videoUrl: "https://example.com/html-forms.mp4"
      },
      {
        _id: "2.3",
        title: "Advanced HTML Topics",
        description: "Explore advanced HTML concepts",
        type: "folder",
        subTracks: [
          { 
            _id: "2.3.1", 
            title: "Semantic HTML", 
            description: "Understanding semantic HTML elements",
            type: "video",
            videoUrl: "https://example.com/semantic-html.mp4"
          },
          { 
            _id: "2.3.2", 
            title: "HTML5 APIs", 
            description: "Introduction to HTML5 APIs",
            type: "text",
            content: "<h1>HTML5 APIs</h1><p>HTML5 introduced several powerful APIs that allow for more interactive and dynamic web applications...</p>"
          },
        ],
      },
    ],
  },
  {
    _id: "3",
    title: "CSS Styling",
    description: "Master CSS for beautiful web designs",
    type: "folder",
    subTracks: [
      { 
        _id: "3.1", 
        title: "CSS Basics", 
        description: "Introduction to CSS selectors and properties",
        type: "video",
        videoUrl: "https://example.com/css-basics.mp4"
      },
      { 
        _id: "3.2", 
        title: "CSS Layout", 
        description: "Learn about CSS layout techniques",
        type: "video",
        videoUrl: "https://example.com/css-layout.mp4"
      },
      { 
        _id: "3.3", 
        title: "Responsive Design", 
        description: "Create responsive layouts with CSS",
        type: "text",
        content: "<h1>Responsive Design</h1><p>Responsive design is an approach to web design that makes web pages render well on a variety of devices and window or screen sizes...</p>"
      },
    ],
  },
  {
    _id: "4",
    title: "JavaScript Essentials",
    description: "Learn the fundamentals of JavaScript programming",
    type: "folder",
    subTracks: [
      { 
        _id: "4.1", 
        title: "JavaScript Fundamentals", 
        description: "Core concepts of JavaScript",
        type: "video",
        videoUrl: "https://example.com/js-fundamentals.mp4"
      },
      { 
        _id: "4.2", 
        title: "DOM Manipulation", 
        description: "Learn how to interact with the DOM using JavaScript",
        type: "video",
        videoUrl: "https://example.com/dom-manipulation.mp4"
      },
      {
        _id: "4.3",
        title: "Advanced JavaScript",
        description: "Explore advanced JavaScript topics",
        type: "folder",
        subTracks: [
          { 
            _id: "4.3.1", 
            title: "Closures and Scope", 
            description: "Understanding closures and scope in JavaScript",
            type: "video",
            videoUrl: "https://example.com/closures-scope.mp4"
          },
          { 
            _id: "4.3.2", 
            title: "Asynchronous JavaScript", 
            description: "Learn about asynchronous programming in JavaScript",
            type: "video",
            videoUrl: "https://example.com/async-js.mp4"
          },
        ],
      },
    ],
  },
  { 
    _id: "5", 
    title: "Final Project", 
    description: "Apply your skills in a comprehensive web development project",
    type: "video",
    videoUrl: "https://example.com/final-project.mp4"
  },
]

export default function CourseContent() {
  const [loading, setLoading] = useState(true)
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null)
  const courseName = "Web Development Fundamentals"

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleTrackSelect = (track: Track) => {
    setSelectedTrack(track) 
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">{courseName}</h1>
        {selectedTrack ? (
          <CourseContentView 
            tracks={selectedTrack.type === "folder" ? selectedTrack.subTracks || [] : [selectedTrack]} 
            courseName={selectedTrack.title} 
          />
        ) : (
          <TrackGrid tracks={sampleCourseContent} loading={loading} />
        )}
      </div>
    </>
  )
}



{/* <CourseContentView tracks={sampleCourseContent} courseName="Web Development Fundamentals" /> */}