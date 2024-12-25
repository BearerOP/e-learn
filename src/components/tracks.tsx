"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, Folder, Video } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Track {
  id: string
  title: string
  type: "folder" | "video"
  content?: string
  subTracks?: Track[]
}

interface CourseContentViewProps {
  tracks: Track[]
}

const TrackItem = ({ track, level = 0, onSelect }: { track: Track; level?: number; onSelect: (track: Track) => void }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => {
    if (track.type === "folder") {
      setIsOpen(!isOpen)
    } else {
      onSelect(track)
    }
  }

  return (
    <div>
      <Button
        variant="ghost"
        className="w-full justify-start text-left"
        onClick={toggleOpen}
      >
        <div className="flex items-center" style={{ paddingLeft: `${level * 16}px` }}>
          {track.type === "folder" ? (
            isOpen ? <ChevronDown className="mr-2 h-4 w-4" /> : <ChevronRight className="mr-2 h-4 w-4" />
          ) : (
            <Video className="mr-2 h-4 w-4" />
          )}
          {track.type === "folder" && <Folder className="mr-2 h-4 w-4" />}
          <span className="truncate">{track.title}</span>
        </div>
      </Button>
      {isOpen && track.subTracks && (
        <div>
          {track.subTracks.map((subTrack) => (
            <TrackItem key={subTrack.id} track={subTrack} level={level + 1} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  )
}

export function CourseContentView({ tracks }: CourseContentViewProps) {
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null)

  const handleTrackSelect = (track: Track) => {
    if (track.type === "video") {
      setSelectedTrack(track)
    }
  }

  return (
    <Card className="h-[calc(100vh-8rem)]">
      <CardHeader>
        <CardTitle>Course Content</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex h-full flex-col md:flex-row">
          <div className="w-full md:w-1/3 border-r">
            <ScrollArea className="h-[calc(100vh-12rem)]">
              {tracks.map((track) => (
                <TrackItem key={track.id} track={track} onSelect={handleTrackSelect} />
              ))}
            </ScrollArea>
          </div>
          <div className="w-full md:w-2/3 p-4">
            {selectedTrack ? (
              <div>
                <h2 className="text-2xl font-bold mb-4">{selectedTrack.title}</h2>
                {selectedTrack.type === "video" && selectedTrack.content && (
                  <video
                    src={selectedTrack.content}
                    controls
                    className="w-full max-h-[60vh] bg-black"
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-lg text-gray-500">Select a video to start watching</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

