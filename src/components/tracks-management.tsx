import React, { useState } from 'react'
import { PlusCircle, Pencil, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from 'sonner'
import { Course, Track } from '@/types'

interface CourseTracksManagementProps {
  course: Course
  onUpdateCourse: (updatedCourse: Course) => void
}

export function CourseTracksManagement({ course, onUpdateCourse }: CourseTracksManagementProps) {
  const [tracks, setTracks] = useState<Track[]>(course.tracks)
  const [isAddingTrack, setIsAddingTrack] = useState(false)
  const [editingTrackId, setEditingTrackId] = useState<string | null>(null)
  const [newTrack, setNewTrack] = useState<Omit<Track, '_id' | 'subTracks'>>({
    title: '',
    description: '',
    type: 'video',
    content: '',
    videoUrl: '',
  })
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewTrack(prev => ({ ...prev, [name]: value }))
  }

  const handleTypeChange = (value: 'folder' | 'video' | 'text') => {
    setNewTrack(prev => ({ ...prev, type: value }))
  }

  const handleAddTrack = () => {
    // Validate track data
    if (!newTrack.title.trim()) {
      toast.error('Track title is required');
      return;
    }

    if (!newTrack.description.trim()) {
      toast.error('Track description is required');
      return;
    }

    if (newTrack.type === 'video' && !newTrack.videoUrl.trim()) {
      toast.error('Video URL is required for video tracks');
      return;
    }

    if (newTrack.type === 'text' && !newTrack.content.trim()) {
      toast.error('Content is required for text tracks');
      return;
    }

    const updatedTracks = [
      ...tracks, 
      { ...newTrack, _id: Date.now().toString(), subTracks: [] }
    ];
    setTracks(updatedTracks);
    onUpdateCourse({ ...course, tracks: updatedTracks });
    setNewTrack({ title: '', description: '', type: 'video', content: '', videoUrl: '' });
    setIsAddingTrack(false);
    toast.success('Track added successfully!');
  };

  const handleEditTrack = (track: Track) => {
    setNewTrack(track)
    setEditingTrackId(track._id)
  }

  const handleUpdateTrack = () => {
    const updatedTracks = tracks.map(track => 
      track._id === editingTrackId ? { ...newTrack, _id: track._id } : track
    )
    setTracks(updatedTracks)
    onUpdateCourse({ ...course, tracks: updatedTracks })
    setNewTrack({ title: '', description: '', type: 'video', content: '', videoUrl: '' })
    setEditingTrackId(null)
    toast.success('Track updated successfully!')
  }

  const handleDeleteTrack = (trackId: string) => {
    const updatedTracks = tracks.filter(track => track._id !== trackId)
    setTracks(updatedTracks)
    onUpdateCourse({ ...course, tracks: updatedTracks })
    toast.success('Track deleted successfully!')
  }

  console.log(tracks,'tracks');
  

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Course Tracks</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={() => setIsAddingTrack(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Track
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingTrackId ? 'Edit Track' : 'Add New Track'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                name="title"
                value={newTrack.title}
                onChange={handleInputChange}
                placeholder="Track Title"
                required
              />
              <Textarea
                name="description"
                value={newTrack.description}
                onChange={handleInputChange}
                placeholder="Track Description"
                required
              />
              <Select value={newTrack.type} onValueChange={handleTypeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select track type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="folder">Folder</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="text">Text</SelectItem>
                </SelectContent>
              </Select>
              {newTrack.type === 'video' && (
                <Input
                  name="videoUrl"
                  value={newTrack.videoUrl}
                  onChange={handleInputChange}
                  placeholder="Video URL"
                  required
                />
              )}
              {newTrack.type === 'text' && (
                <Textarea
                  name="content"
                  value={newTrack.content}
                  onChange={handleInputChange}
                  placeholder="Text Content"
                  required
                />
              )}
              <Button onClick={editingTrackId ? handleUpdateTrack : handleAddTrack}>
                {editingTrackId ? 'Update Track' : 'Add Track'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {tracks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center border-2 border-dashed rounded-lg bg-muted/50">
          <div className="rounded-full bg-muted p-3 mb-4">
            <PlusCircle className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No Tracks Available</h3>
          <p className="text-muted-foreground mb-4 max-w-sm">
            Add tracks to your course to organize your content. You can add videos, text content, or create folders to group related materials.
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Your First Track
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Track</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  name="title"
                  value={newTrack.title}
                  onChange={handleInputChange}
                  placeholder="Track Title"
                  required
                />
                <Textarea
                  name="description"
                  value={newTrack.description}
                  onChange={handleInputChange}
                  placeholder="Track Description"
                  required
                />
                <Select value={newTrack.type} onValueChange={handleTypeChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select track type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="folder">Folder</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="text">Text</SelectItem>
                  </SelectContent>
                </Select>
                {newTrack.type === 'video' && (
                  <Input
                    name="videoUrl"
                    value={newTrack.videoUrl}
                    onChange={handleInputChange}
                    placeholder="Video URL"
                    required
                  />
                )}
                {newTrack.type === 'text' && (
                  <Textarea
                    name="content"
                    value={newTrack.content}
                    onChange={handleInputChange}
                    placeholder="Text Content"
                    required
                  />
                )}
                <Button onClick={handleAddTrack}>
                  Add Track
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tracks.map((track) => (
            <Card key={track._id}>
              <CardHeader>
                <CardTitle>{track.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-2">{track.description}</p>
                <p className="text-sm text-gray-500 mb-4">Type: {track.type}</p>
                {track.type === 'video' && <p className="text-sm text-blue-500 mb-4">Video: {track.videoUrl}</p>}
                {track.type === 'text' && <p className="text-sm text-gray-700 mb-4">{track.content}</p>}
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleEditTrack(track)}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteTrack(track._id)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
