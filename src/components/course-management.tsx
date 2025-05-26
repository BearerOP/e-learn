import { useState, useEffect } from 'react'
import { Search, PlusCircle, ArrowLeft, Eye, EyeOff, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CourseTracksManagement } from '@/components/tracks-management'
import { Course } from '@/types'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getInstructorCourses, updateCourseStatus } from '@/lib/api'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface CourseManagementProps {
  setActiveView: (view: string) => void;
  courses: Course[]
  onUpdateCourse: (updatedCourse: Course) => void
}

export function CourseManagement({ courses: initialCourses, onUpdateCourse }: CourseManagementProps) {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [courses, setCourses] = useState<Course[]>(initialCourses)
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [showStatusDialog, setShowStatusDialog] = useState(false)
  const [pendingStatusChange, setPendingStatusChange] = useState<{ course: Course; newStatus: 'published' | 'draft' } | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        console.log("Starting to fetch courses...");
        
        const response = await getInstructorCourses();
        console.log("Courses response:", response);
        
        if (response?.data?.data) {
          console.log("Setting courses:", response.data.data);
          setCourses(response.data.data);
          // Update parent component with the fetched courses
          response.data.data.forEach(course => {
            onUpdateCourse(course);
          });
        } else {
          console.warn("No courses data in response:", response);
          toast.error('No courses data received from the server');
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
        if (error instanceof Error) {
          toast.error(`Failed to fetch courses: ${error.message}`);
        } else {
          toast.error('Failed to fetch courses. Please try again.');
        }
        setCourses([]); // Reset courses on error
      } finally {
        setIsLoading(false);
      }
    };

    // Only fetch if we don't have initial courses
    if (!initialCourses.length) {
      console.log("No initial courses, fetching from API...");
      fetchCourses();
    } else {
      console.log("Using initial courses:", initialCourses);
      setCourses(initialCourses);
      setIsLoading(false);
    }
  }, [initialCourses, onUpdateCourse]);

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course)
  }

  const handleStatusToggle = async (course: Course) => {
    const newStatus = course.status === 'published' ? 'draft' : 'published';
    setPendingStatusChange({ course, newStatus });
    setShowStatusDialog(true);
  };

  const confirmStatusChange = async () => {
    if (!pendingStatusChange) return;

    const { course, newStatus } = pendingStatusChange;
    
    // Update UI state immediately
    const updatedCourse = { ...course, status: newStatus };
    const updatedCourses = courses.map(c => 
      c._id === course._id ? updatedCourse : c
    );
    setCourses(updatedCourses);
    onUpdateCourse(updatedCourse);
    setShowStatusDialog(false);
    setPendingStatusChange(null);

    // Make API call in the background
    try {
      setIsUpdatingStatus(true);
      const response = await updateCourseStatus(course._id, newStatus);
      
      if (!response?.data?.data) {
        // If API call fails, revert the UI state
        const revertedCourse = { ...course, status: course.status };
        const revertedCourses = courses.map(c => 
          c._id === course._id ? revertedCourse : c
        );
        setCourses(revertedCourses);
        onUpdateCourse(revertedCourse);
        throw new Error('Failed to update course status');
      }
      
      toast.success(`Course ${newStatus === 'published' ? 'published' : 'moved to draft'} successfully!`);
    } catch (error) {
      console.error('Error updating course status:', error);
      toast.error('Failed to update course status. Please try again.');
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const filteredAndSortedCourses = courses
    .filter(course => 
      course.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return b._id.localeCompare(a._id);
        case 'oldest':
          return a._id.localeCompare(b._id);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'popular':
          return b.studentsEnrolled.length - a.studentsEnrolled.length;
        default:
          return 0;
      }
    });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-3xl font-bold tracking-tight">My Courses</h1>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="border-b p-0">
                <div className="relative aspect-video">
                  <div className="absolute inset-0 bg-muted animate-pulse" />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded animate-pulse" />
                  <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }} className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          {selectedCourse && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedCourse(null)}
              className="h-8 w-8"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <h1 className="text-3xl font-bold tracking-tight">
            {selectedCourse ? selectedCourse.title : 'My Courses'}
          </h1>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          {!selectedCourse && (
            <>
              <div className="flex gap-2">
                <div className="relative flex-1 md:w-[300px]">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search your courses" 
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                    <SelectItem value="popular">Popular</SelectItem>
                    <SelectItem value="title">Title</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={() => navigate("/instructor/create-course")}>
                <PlusCircle className="mr-2 h-4 w-4" />
                New course
              </Button>
            </>
          )}
        </div>
      </div>

      {selectedCourse ? (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Button
                variant={selectedCourse.status === 'published' ? 'default' : 'secondary'}
                onClick={() => handleStatusToggle(selectedCourse)}
                disabled={isUpdatingStatus}
                className="min-w-[140px]"
              >
                {isUpdatingStatus ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : selectedCourse.status === 'published' ? (
                  <>
                    <EyeOff className="mr-2 h-4 w-4" />
                    Move to Draft
                  </>
                ) : (
                  <>
                    <Eye className="mr-2 h-4 w-4" />
                    Publish Course
                  </>
                )}
              </Button>
              <span className={`text-sm font-medium ${
                selectedCourse.status === 'published'
                  ? 'text-green-600'
                  : 'text-gray-600'
              }`}>
                {selectedCourse.status === 'published' ? 'Published' : 'Draft'}
              </span>
            </div>
          </div>
          <CourseTracksManagement 
            course={selectedCourse} 
            onUpdateCourse={(updatedCourse) => {
              onUpdateCourse(updatedCourse)
              setSelectedCourse(updatedCourse)
            }}
          />
        </div>
      ) : filteredAndSortedCourses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center border-2 border-dashed rounded-lg bg-muted/50">
          <div className="rounded-full bg-muted p-4 mb-4">
            <PlusCircle className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No Courses Available</h3>
          <p className="text-muted-foreground mb-6 max-w-sm">
            {searchQuery ? 'No courses match your search criteria.' : 'Create your first course to start teaching. Add your expertise and share your knowledge with students.'}
          </p>
          <Button onClick={() => navigate("/instructor/create-course")} size="lg">
            <PlusCircle className="mr-2 h-5 w-5" />
            Create Your First Course
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredAndSortedCourses.map((course) => (
            <Card 
              key={course._id} 
              className="overflow-hidden cursor-pointer transition-all hover:shadow-lg" 
              onClick={() => handleCourseClick(course)}
            >
              <CardHeader className="border-b p-0">
                <div className="relative aspect-video">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title} 
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      e.currentTarget.src = 'https://placehold.co/600x400?text=No+Image';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-lg font-semibold text-white line-clamp-2">{course.title}</h3>
                    <div className="mt-2 flex items-center gap-2">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        course.status === "published"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        {course.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Enrolled Students</span>
                    <span className="font-medium">{course.studentsEnrolled.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Tracks</span>
                    <span className="font-medium">{course.tracks.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={showStatusDialog} onOpenChange={setShowStatusDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Status Change</DialogTitle>
            <DialogDescription>
              Are you sure you want to {pendingStatusChange?.newStatus === 'published' ? 'publish' : 'move to draft'} the course "{pendingStatusChange?.course.title}"?
              {pendingStatusChange?.newStatus === 'published' ? 
                ' This will make the course visible to all students.' : 
                ' This will hide the course from students.'}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowStatusDialog(false);
                setPendingStatusChange(null);
              }}
              disabled={isUpdatingStatus}
            >
              Cancel
            </Button>
            <Button
              variant={pendingStatusChange?.newStatus === 'published' ? 'default' : 'secondary'}
              onClick={confirmStatusChange}
              disabled={isUpdatingStatus}
            >
              {isUpdatingStatus ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  {pendingStatusChange?.newStatus === 'published' ? (
                    <>
                      <Eye className="mr-2 h-4 w-4" />
                      Publish Course
                    </>
                  ) : (
                    <>
                      <EyeOff className="mr-2 h-4 w-4" />
                      Move to Draft
                    </>
                  )}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}

