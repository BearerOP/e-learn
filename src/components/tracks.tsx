"use client"

import { useState, useEffect, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getVideoUrl, isYoutubeUrl } from "@/utils/videoUtils"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronDown, ChevronUp, Play, Pause } from 'lucide-react'
import MinimalLoaderComponent from "./ui/minimal-loader"
import { Separator } from "./ui/separator"

interface VideoContent {
  _id: string
  title: string
  type: "video"
  description: string
  videoUrl: string
}

export function CourseContentView() {
  const location = useLocation();
  const navigate = useNavigate();
  const videoContents: VideoContent[] = location.state?.videoContents || [];
  const [selectedVideo, setSelectedVideo] = useState<VideoContent | null>(null);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayPauseIcon, setShowPlayPauseIcon] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoContents.length > 0) {
      setSelectedVideo(videoContents[0]);
    }
  }, [videoContents]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (videoRef.current) {
        if (event.key === 'ArrowLeft') {
          videoRef.current.currentTime -= 10;
        } else if (event.key === 'ArrowRight') {
          videoRef.current.currentTime += 10;
        } else if (event.key === ' ') {
          event.preventDefault();
          handlePlayPause();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
      setShowPlayPauseIcon(true);
      setTimeout(() => setShowPlayPauseIcon(false), 1000);
    }
  };

  if (!selectedVideo) {
    return <p>No video contents available.</p>;
  }

  const videoUrl = getVideoUrl(selectedVideo.videoUrl);
  const isYoutube = isYoutubeUrl(selectedVideo.videoUrl);

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  return (
    <Card className="max-w-full min-h-screen mx-auto relative">
      <CardHeader>
        <Button variant="link" onClick={() => navigate(-1)} className="absolute top-4 right-4">
          <ChevronLeft size={24} />
          <span>Go Back</span>
        </Button>
        <CardTitle>{selectedVideo.title}</CardTitle>
      </CardHeader>
      <CardContent className="max-w-4xl mx-auto space-y-4">
        <div className="aspect-video relative">
          {isYoutube ? (
            <iframe
              src={videoUrl}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
              onLoad={() => setIsLoading(false)}
            />
          ) : (
            <div className="relative">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <MinimalLoaderComponent barColor={'#2dd4bf'} />
                </div>
              )}
              <video
                ref={videoRef}
                src={videoUrl}
                controls
                autoPlay
                className="w-full h-full"
                onClick={handlePlayPause}
                onWaiting={() => setIsLoading(true)}
                onPlaying={() => setIsLoading(false)}
              >
                Your browser does not support the video tag.
              </video>
              {showPlayPauseIcon && (
                <div className="absolute inset-0 flex items-center justify-center">
                  {isPlaying ? (
                    <Pause size={48} fill="#2dd4bf" className="text-[#2dd4bf]" />
                  ) : (
                    <Play size={48} fill="#2dd4bf" className="text-[#2dd4bf]" />
                  )}
                </div>
              )}
            </div>
          )}
        </div>
        <div className={`prose max-w-none 'fixed bottom-0 left-0 right-0 bg-background p-4 shadow-lg'}`}>
            <Separator />
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">Description</h2>
            <Button variant="ghost" size="sm" onClick={toggleDescription}>
              {isDescriptionExpanded ? (
                <>
                  Show less <ChevronUp size={16} />
                </>
              ) : (
                <>
                  Show more <ChevronDown size={16} />
                </>
              )}
            </Button>
          </div>
          <p className={isDescriptionExpanded ? '' : 'line-clamp-2'}>{selectedVideo.description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
