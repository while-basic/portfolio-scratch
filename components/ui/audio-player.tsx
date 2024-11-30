"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import { Card } from "@/components/ui/card"

interface AudioPlayerProps {
  src: string
  title: string
}

export function AudioPlayer({ src, title }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current?.duration || 0)
      })
    }
  }, [])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleTimeUpdate = () => {
    if (audioRef.current && !isDragging) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const calculateTime = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressBarRef.current) {
      const progressBar = progressBarRef.current
      const rect = progressBar.getBoundingClientRect()
      const x = e.clientX - rect.left
      const width = rect.width
      const percentage = x / width
      return percentage * duration
    }
    return 0
  }

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const newTime = calculateTime(e)
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const handleProgressBarMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true)
    handleProgressBarClick(e)

    const handleMouseMove = (e: MouseEvent) => {
      if (audioRef.current && progressBarRef.current) {
        const newTime = calculateTime(e as unknown as React.MouseEvent<HTMLDivElement>)
        setCurrentTime(newTime)
      }
    }

    const handleMouseUp = (e: MouseEvent) => {
      setIsDragging(false)
      if (audioRef.current) {
        const newTime = calculateTime(e as unknown as React.MouseEvent<HTMLDivElement>)
        audioRef.current.currentTime = newTime
      }
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  return (
    <Card className="p-4 bg-black/5 dark:bg-white/5 backdrop-blur-lg border-0 shadow-lg">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-lg">{title}</h3>
          <div className="text-sm text-muted-foreground">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>
        
        <div 
          ref={progressBarRef}
          className="relative w-full h-1.5 bg-secondary/50 rounded-full overflow-hidden cursor-pointer group"
          onClick={handleProgressBarClick}
          onMouseDown={handleProgressBarMouseDown}
        >
          <div 
            className="absolute h-full bg-primary transition-all duration-100 group-hover:bg-primary/80"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
          <div 
            className="absolute h-3 w-3 bg-primary rounded-full -top-[3px] transition-all duration-100 opacity-0 group-hover:opacity-100"
            style={{ left: `calc(${(currentTime / duration) * 100}% - 6px)` }}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePlay}
              className="h-10 w-10 rounded-full hover:scale-105 transition-transform"
            >
              {isPlaying ? 
                <Pause className="h-5 w-5" /> : 
                <Play className="h-5 w-5 ml-1" />
              }
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMute}
              className="h-8 w-8 rounded-full"
            >
              {isMuted ? 
                <VolumeX className="h-4 w-4" /> : 
                <Volume2 className="h-4 w-4" />
              }
            </Button>
          </div>
        </div>
      </div>
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        className="hidden"
      />
    </Card>
  )
}
