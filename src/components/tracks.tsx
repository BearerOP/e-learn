"use client"

import { useState, useEffect, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getVideoUrl, isYoutubeUrl } from "@/utils/videoUtils"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronDown, ChevronUp, Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Maximize, Minimize, PictureInPicture2 } from 'lucide-react'
import MinimalLoaderComponent from "./ui/minimal-loader"
import { Separator } from "./ui/separator"
import { Slider } from "@/components/ui/slider"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {Skeleton} from "@/components/ui/skeleton"

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
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [quality, setQuality] = useState("1080p");
  const [showControls, setShowControls] = useState(true);
  const [showTitle, setShowTitle] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
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

    const handleFullscreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
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

  const handleVolumeChange = (value: number) => {
    if (videoRef.current) {
      videoRef.current.volume = value;
      setVolume(value);
      setIsMuted(value === 0);
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
      if (videoRef.current.muted) {
        setVolume(0);
      } else {
        setVolume(videoRef.current.volume);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleDurationChange = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (value: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = value;
    }
  };

  const handlePlaybackSpeedChange = (speed: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
      setPlaybackSpeed(speed);
    }
  };

  const handleFullScreenToggle = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const handlePictureInPicture = () => {
    if (videoRef.current) {
      if (document.pictureInPictureElement) {
        document.exitPictureInPicture();
      } else {
        videoRef.current.requestPictureInPicture();
      }
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    setShowTitle(true);
    if (titleTimeoutRef.current) {
      clearTimeout(titleTimeoutRef.current);
    }
    titleTimeoutRef.current = setTimeout(() => {
      setShowTitle(false);
    }, 2000);
  };

  const handleMouseLeave = () => {
    setShowControls(false);
    setShowTitle(false);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
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
    <div className={`max-w-full mx-auto relative ${isFullScreen ? 'h-screen' : 'min-h-screen'}`} ref={containerRef}>
      <CardHeader className={`${isFullScreen ? 'hidden' : ''}`}>
        <Button variant="link" onClick={() => navigate(-1)} className="absolute top-4 right-4">
          <ChevronLeft size={24} />
          <span>Go Back</span>
        </Button>
        <CardTitle>{selectedVideo.title}</CardTitle>
      </CardHeader>
      <CardContent className={`${isFullScreen ? 'p-0 h-full' : 'max-w-4xl mx-auto'} space-y-4`}>
        <div 
          className={`relative ${isFullScreen ? 'h-full' : 'aspect-video'}`}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
              <MinimalLoaderComponent barColor={'#2dd4bf'} />
            </div>
          )}
          {isLoading && (
            <Skeleton className="absolute inset-0 w-full h-full" />
          )}
          {isYoutube ? (
            <iframe
              src={videoUrl}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className={`w-full ${isFullScreen ? 'h-full object-contain' : 'h-full'}`}
              onLoad={() => setIsLoading(false)}
            />
          ) : (
            <div className={`relative ${isFullScreen ? 'h-full' : ''}`}>
              <video
                ref={videoRef}
                src={videoUrl}
                className={`w-full ${isFullScreen ? 'h-full object-contain' : 'h-full'}`}
                onClick={handlePlayPause}
                onWaiting={() => setIsLoading(true)}
                onCanPlay={() => setIsLoading(false)}
                onTimeUpdate={handleTimeUpdate}
                onDurationChange={handleDurationChange}
              >
                Your browser does not support the video tag.
              </video>
              {showPlayPauseIcon && (
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  {isPlaying ? (
                    <Pause size={48} fill={'#2dd4bf'} className="text-[#2dd4bf] opacity-75" />
                  ) : (
                    <Play size={48}  fill={'#2dd4bf'} className="text-[#2dd4bf] opacity-75" />
                  )}
                </div>
              )}
              {showTitle && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black to-transparent p-4 z-20">
                  <h2 className="text-white text-xl font-bold">{selectedVideo.title}</h2>
                </div>
              )}
              <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon" onClick={handlePlayPause}>
                      {isPlaying ? <Pause fill="white" size={24} /> : <Play fill="white" size={24} />}
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleSeek(currentTime - 10)}>
                      <SkipBack fill="white" size={24} />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleSeek(currentTime + 10)}>
                      <SkipForward fill="white" size={24} />
                    </Button>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon" onClick={handleMuteToggle}>
                        {isMuted ? <VolumeX fill="white" size={24} /> : <Volume2 fill="white" size={24} />}
                      </Button>
                      <Slider
                        value={[volume]}
                        max={1}
                        step={0.1}
                        onValueChange={(value) => handleVolumeChange(value[0])}
                        className="w-24 bg-custom-green-bg"
                      />
                    </div>
                    <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">{playbackSpeed}x</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {[0.5, 1, 1.25, 1.5, 1.75, 2].map((speed) => (
                          <DropdownMenuItem key={speed} onSelect={() => handlePlaybackSpeedChange(speed)}>
                            {speed}x
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">{quality}</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {['1080p', '720p', '480p'].map((q) => (
                          <DropdownMenuItem key={q} onSelect={() => setQuality(q)}>
                            {q}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant="ghost" size="icon" onClick={handlePictureInPicture}>
                      <PictureInPicture2 size={24} />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={handleFullScreenToggle}>
                      {isFullScreen ? <Minimize size={24} /> : <Maximize size={24} />}
                    </Button>
                  </div>
                </div>
                <Slider
                  value={[currentTime]}
                  max={duration}
                  step={1}
                  onValueChange={(value) => handleSeek(value[0])}
                  className="mt-2"
                />
              </div>
            </div>
          )}
        </div>
        <div className={`prose max-w-none 'fixed bottom-0 left-0 right-0 bg-background p-4 shadow-lg'}`}>
            <Separator className='my-2' />
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
    </div>
  );
}
