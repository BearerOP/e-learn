"use client"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Track } from "@/types/index"
import { TrackGrid } from "@/components/track-grid"
import { getTrackContent } from "@/lib/api"

export default function TrackContent() {
  const { trackId } = useParams<{ trackId: string }>()
  const [loading, setLoading] = useState(true)
  const [trackContent, setTrackContent] = useState<Track[]>([])
  const [trackTitle, setTrackTitle] = useState<string>("")

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    
    const fetchTrackContent = async () => {
      try {
        const response = await getTrackContent(trackId)
        setTrackContent(response.data.data)
        setTrackTitle(response.data.trackTitle)
        setLoading(false)
      } catch (err) {
        console.error(err)
      }
    }
    
    fetchTrackContent();
    return () => clearTimeout(timer)
  }, [trackId])

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">{trackTitle}</h1>
          <TrackGrid tracks={trackContent} loading={loading} />
      </div>
    </>
  )
}
