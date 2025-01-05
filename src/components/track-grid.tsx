import { Track } from "@/types/index"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

interface CourseGridProps {
  tracks: Track[]
  loading: boolean
}

export function TrackGrid({ tracks, loading }: CourseGridProps) {

  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-[180px] w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    )
  }

  if (!tracks.length) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold">No tracks found</h3>
        <p className="text-muted-foreground mt-2">
          There are no tracks available for this course.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {tracks.map((track) => (
        <motion.div
          key={track._id}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          >

        <Card key={track._id} className="flex flex-col">
          <CardHeader>
            <CardTitle>{track.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-2">{track.description}</p>
          </CardContent>
          <CardFooter className="mt-auto">
            <Button asChild className="w-full">
              {
                (track.type==="folder")
                ? <Link to={`/my-learning/course/track/${track._id}`}>View Tracks</Link>
                : <Button 
                onClick={() => {
                  navigate(`/course/player`, {
                    state: { 
                      videoContents: [
                        {
                          _id: track._id,
                          title: track.title,
                          type: track.type,
                          description: track.description,
                          videoUrl: track.videoUrl
                        }
                      ] 
                    }
                  })
                }} 
                className="w-full"
              >
                Watch Video
              </Button>

              }
            </Button>
          </CardFooter>
        </Card>
        </motion.div>

      ))}
    </div>
  )
}

