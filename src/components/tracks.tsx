"use client"

import { useState, useEffect, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getVideoUrl, isYoutubeUrl } from "@/utils/videoUtils"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronDown, ChevronUp, Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Maximize, Minimize, Settings } from 'lucide-react'
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
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
    
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    
    titleTimeoutRef.current = setTimeout(() => {
      setShowTitle(false);
    }, 2000);
    
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  const handleMouseLeave = () => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
      setShowTitle(false);
    }, 1000);
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
          className={`relative ${isFullScreen ? 'h-full' : 'aspect-video'} bg-black`}
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
                    <Pause size={48} className="text-white opacity-75" />
                  ) : (
                    <Play size={48} className="text-white opacity-75" />
                  )}
                </div>
              )}
              {showTitle && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black to-transparent p-4 z-20">
                  <h2 className="text-white text-xl font-bold">{selectedVideo.title}</h2>
                </div>
              )}

              {/* New Control Bar based on the screenshot */}
              <div 
                className={`absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
                style={{ height: '56px' }}
              >
                {/* Progress bar positioned at top of control bar */}
                <div className="absolute -top-1 left-0 right-0 px-0">
                  <Slider
                    value={[currentTime]}
                    max={duration}
                    step={1}
                    onValueChange={(value) => handleSeek(value[0])}
                    className="h-1"
                  />
                </div>
                
                {/* Control buttons */}
                <div className="flex items-center justify-between h-full px-4 text-white">
                  <div className="flex items-center space-x-4">
                    {/* Skip back button */}
                    <Button variant="ghost" size="icon" className="hover:bg-transparent p-0" onClick={() => handleSeek(currentTime - 10)}>
                      <div className="rounded-full bg-white bg-opacity-20 p-1">
                        <SkipBack size={18} className="text-white" />
                      </div>
                    </Button>
                    
                    {/* Play/Pause button */}
                    <Button variant="ghost" size="icon" className="hover:bg-transparent p-0" onClick={handlePlayPause}>
                      <div className="rounded-full bg-white bg-opacity-20 p-2">
                        {isPlaying ? 
                          <Pause size={22} className="text-white" /> : 
                          <Play size={22} className="text-white ml-0.5" />
                        }
                      </div>
                    </Button>
                    
                    {/* Skip forward button */}
                    <Button variant="ghost" size="icon" className="hover:bg-transparent p-0" onClick={() => handleSeek(currentTime + 10)}>
                      <div className="rounded-full bg-white bg-opacity-20 p-1">
                        <SkipForward size={18} className="text-white" />
                      </div>
                    </Button>
                    
                    {/* Time display */}
                    <div className="text-sm font-medium">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    {/* Volume control */}
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon" className="hover:bg-transparent p-0" onClick={handleMuteToggle}>
                        {isMuted ? 
                          <VolumeX size={20} className="text-white" /> : 
                          <Volume2 size={20} className="text-white" />
                        }
                      </Button>
                      <Slider
                        value={[volume]}
                        max={1}
                        step={0.1}
                        onValueChange={(value) => handleVolumeChange(value[0])}
                        className="w-16"
                      />
                    </div>
                    
                    {/* Playback speed */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-white h-8 px-2">
                          {playbackSpeed}x
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {[0.5, 1, 1.25, 1.5, 1.75, 2].map((speed) => (
                          <DropdownMenuItem key={speed} onSelect={() => handlePlaybackSpeedChange(speed)}>
                            {speed}x
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    
                    {/* Captions button */}
                    <Button variant="ghost" size="icon" className="hover:bg-transparent p-0">
                      <div className="rounded-sm border border-white border-opacity-50 px-2 py-0.5">
                        <span className="text-xs text-white">CC</span>
                      </div>
                    </Button>
                    
                    {/* Settings button */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="hover:bg-transparent p-0">
                          <Settings size={20} className="text-white" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onSelect={() => handlePictureInPicture()}>
                          Picture in Picture
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Quality: {quality}
                        </DropdownMenuItem>
                        {['1080p', '720p', '480p'].map((q) => (
                          <DropdownMenuItem key={q} onSelect={() => setQuality(q)}>
                            {q}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    
                    {/* Fullscreen button */}
                    <Button variant="ghost" size="icon" className="hover:bg-transparent p-0" onClick={handleFullScreenToggle}>
                      {isFullScreen ? 
                        <Minimize size={20} className="text-white" /> : 
                        <Maximize size={20} className="text-white" />
                      }
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className={`prose max-w-none ${isFullScreen ? 'hidden' : ''}`}>
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