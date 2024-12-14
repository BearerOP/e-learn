import { Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function CourseManagement() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="flex gap-2">
            <div className="relative flex-1 md:w-[300px]">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search your courses" className="pl-8" />
            </div>
            <Select defaultValue="newest">
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
          <Button size="default" variant="default" className="bg-[#8b5cf6] text-white hover:bg-[#7c3aed]">
            New course
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="overflow-hidden">
          <CardHeader className="border-b p-0">
            <div className="relative aspect-video">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-lg font-semibold text-white">Learn NextJs in 1 hour</h3>
                <div className="mt-2 flex items-center gap-2">
                  <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-medium text-white">
                    DRAFT
                  </span>
                  <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-medium text-white">
                    Public
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Finish your course</span>
                <span className="font-medium">25%</span>
              </div>
              <Progress value={25} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Example course cards */}
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="border-b p-0">
              <div className="relative aspect-video">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-lg font-semibold text-white">Course Title {i + 2}</h3>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-medium text-white">
                      {i % 2 === 0 ? 'PUBLISHED' : 'DRAFT'}
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Course progress</span>
                  <span className="font-medium">{(i + 1) * 20}%</span>
                </div>
                <Progress value={(i + 1) * 20} className="h-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-center text-muted-foreground">
        Based on your experience, we think these resources will be helpful.
      </div>
    </div>
  )
}

