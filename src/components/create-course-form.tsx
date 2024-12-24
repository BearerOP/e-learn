
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileUpload } from "@/components/ui/file-upload"
import { courseCategories, courseCategoryDisplayName, courseSubCategories, Tags as tags } from "@/types"

export function CreateCourseForm() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [newTag, setNewTag] = useState<string>("");
    const [files, setFiles] = useState<File[]>([]);

    const handleFileUpload = (files: File[]) => {
        setFiles(files);
        console.log(files);
    };

    const handleAddTag = () => {
        if (selectedTags.length < 5 && newTag && !selectedTags.includes(newTag)) {
            setSelectedTags([...selectedTags, newTag]);
            setNewTag("");
        }
    };

    const handleRemoveTag = (tag: string) => {
        setSelectedTags(selectedTags.filter((t) => t !== tag));
    };

    const handleCategoryChange = (value: string) => {
        setSelectedCategory(value);
        setSelectedSubCategory(null);
    };

    const subCategories = selectedCategory ? courseSubCategories[selectedCategory] || [] : [];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create New Course</CardTitle>
                <CardDescription>Fill in the details to create a new course.</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="title">Course Title</Label>
                            <Input id="title" placeholder="Enter course title" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="description">Course Description</Label>
                            <Textarea id="description" placeholder="Enter course description" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="price">Price</Label>
                            <Input id="price" placeholder="Enter course price" type="number" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="category">Category</Label>
                            <Select onValueChange={handleCategoryChange}>
                                <SelectTrigger id="category">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    {courseCategories.map((category) => (
                                        <SelectItem key={category} value={category}>
                                            {courseCategoryDisplayName[category]}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="sub-category">Sub-Category</Label>
                            <Select
                                disabled={!subCategories.length}
                                onValueChange={(value) => setSelectedSubCategory(value)}
                            >
                                <SelectTrigger id="sub-category">
                                    <SelectValue placeholder="Select a sub-category" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    {subCategories.map((subCategory) => (
                                        <SelectItem key={subCategory.key} value={subCategory.key}>
                                            {subCategory.displayName}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="new-tag">
                                Add a Tag
                            </Label>
                            <div className="flex flex-row items-center space-x-2">
                                <Input
                                    type="text"
                                    id="new-tag"
                                    value={newTag}
                                    onChange={(e) => setNewTag(e.target.value)}
                                    placeholder="Enter a tag"
                                />
                                <Button
                                    type="button"
                                    onClick={handleAddTag}
                                    disabled={!newTag || selectedTags.length >= 5 || selectedTags.includes(newTag)}
                                >
                                    Add Tag
                                </Button>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            {selectedTags.map((tag) => (
                                <Badge
                                    key={tag}
                                    className="flex items-center space-x-2 bg-custom-green-bg text-custom-green-text hover:bg-slate-800 outline-lime-50"
                                >
                                    <span>{tag}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveTag(tag)}
                                        className="text-red-500"
                                    >
                                        &times;
                                    </button>
                                </Badge>
                            ))}
                        </div>
                        {newTag && !selectedTags.includes(newTag) && tags.includes(newTag) && (
                            <div className="mt-2 text-gray-500">
                                <p>Suggested tag: {newTag}</p>
                            </div>
                        )}
                        {selectedTags.length === 5 && (
                            <p className="text-red-500 mt-2">You have reached the maximum number of tags (5).</p>
                        )}
                        <div className="flex flex-col space-y-2">
                            <Label htmlFor="thumbnail">Thumbnail</Label>
                            <div className="w-full mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
                                <FileUpload onChange={handleFileUpload} />
                            </div>
                        </div>
                        <Button type="submit">Create Course</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

