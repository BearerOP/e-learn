import { Track } from "@/types/index"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"


interface CourseGridProps {
  tracks: Track[]
  loading: boolean
}

export function TrackGrid({ tracks, loading }: CourseGridProps) {
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
        <Card key={track._id} className="flex flex-col">
          <CardHeader>
            <CardTitle>{track.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{track.description}</p>
          </CardContent>
          <CardFooter className="mt-auto">
            <Button asChild className="w-full">
              <Link to={`/my-learning/course/${track._id}`}>
                Start Learning
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

