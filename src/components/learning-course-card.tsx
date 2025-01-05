import { MoreVertical, Play } from 'lucide-react'
import { Course } from "@/types/index"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

interface LearningCourseCardProps {
  course: Course
  progress: number
}

export function LearningCourseCard({ course, progress=0 }: LearningCourseCardProps) {
  const navigate = useNavigate()
  return (
    <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          >
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative aspect-video">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="object-cover w-full h-full"
            />
          <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button variant="secondary" size="sm" className="gap-2">
              <Play className="w-4 h-4" />
              {progress > 0 ? 'Resume' : 'Start'}
            </Button>
          </div>
          <div className="absolute top-2 right-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="bg-black/20 hover:bg-black/40 text-white">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Course Details</DropdownMenuItem>
                <DropdownMenuItem>Add to List</DropdownMenuItem>
                <DropdownMenuItem>Share</DropdownMenuItem>
                <DropdownMenuItem>Archive</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-semibold mb-2 line-clamp-2">{course.title}</h3>
        <p className="text-sm text-muted-foreground mb-2">{course.category}</p>
        <div className="flex items-center gap-2 text-sm">
          <Progress value={progress} className="h-2" />
          <span className="text-muted-foreground whitespace-nowrap">
            {progress}% complete
          </span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" onClick={() => {
          // Redirect to course page
          navigate(`/my-learning/course/${course._id}`)          
        }}>
          {progress === 0 ? 'Start Course' : 'Continue Learning'}
        </Button>
      </CardFooter>
    </Card>
          </motion.div>
  )
}

