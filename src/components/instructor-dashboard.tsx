"use client"

import { useState } from "react"
import { BadgeCheck, Bell, BookOpen, ChevronsUpDown, Command, CreditCard, GraduationCap, LayoutDashboard, LogOut, PlusCircle, Settings, User } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Textarea } from "@/components/ui/textarea"
import { CourseManagement } from "@/components/course-management"
import Footer from "./layout/Footer"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/auth-context"
import { getAuthToken, logout as apiLogout } from "@/lib/api"
import { toast } from "sonner"
import { ModeToggle } from "./mode-toggle"
import { courseCategories, courseCategoryDisplayName, courseSubCategories, Tags as tags } from "@/types"
import { Badge } from "./ui/badge"
import { FileUpload } from "./ui/file-upload"

let instructorData = {
    username: "John Doe",
    email: "john@example.com",
    avatar: "/avatars/instructor.jpg",
    publishedCourses: 5,
    totalStudents: 1234,
    totalEarnings: 9876.54,
}
export default function InstructorDashboard() {
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

    const { user, logout } = useAuth();

    instructorData = {
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        publishedCourses: 5,
        totalStudents: 1234,
        totalEarnings: 9876.54,
    }
    const [activeView, setActiveView] = useState("dashboard")

    const navigate = useNavigate();
    function navigateHome() {
        navigate("/");
    }

    function navigateProfile() {
        navigate("/profile");
    }
    const handleLogout = async () => {
        const authToken = getAuthToken();
        if (!authToken) {
            toast.error('No authentication token found. Please log in again.');
            return;
        }

        toast.promise(
            async () => {
                const response = await apiLogout(authToken);
                logout(); // Clear user session
                return response?.data?.message || 'You have successfully logged out.';
            },
            {
                loading: 'Logging out...',
                success: 'Successfully logged out!',
                error: 'Failed to log out. Please try again.',
            }
        );
        navigate('/');
    };

    return (
        <>
            <SidebarProvider>
                <Sidebar variant="inset">
                    <SidebarHeader>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton size="lg" asChild>
                                    <Link to="#">
                                        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                            <Command className="size-4" />
                                        </div>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-semibold">Instructor Dashboard</span>
                                            <span className="truncate text-xs">Course Management</span>
                                        </div>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarHeader>
                    <SidebarContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton onClick={() => setActiveView("dashboard")}>
                                    <LayoutDashboard />
                                    <span>Dashboard</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton onClick={() => setActiveView("createCourse")}>
                                    <PlusCircle />
                                    <span>Create Course</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton onClick={() => setActiveView("myCourses")}>
                                    <BookOpen />
                                    <span>My Courses</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    <CreditCard />
                                    <span>Earnings</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    <Bell />
                                    <span>Notifications</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    <Settings />
                                    <span>Settings</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarContent>
                    <SidebarFooter>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <SidebarMenuButton
                                            size="lg"
                                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                        >
                                            <Avatar className="h-8 w-8 rounded-lg">
                                                <AvatarImage
                                                    src={instructorData.avatar}
                                                    alt={instructorData.username}
                                                />
                                                <AvatarFallback className="rounded-lg">
                                                    {instructorData.username.charAt(0).toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="grid flex-1 text-left text-sm leading-tight">
                                                <span className="truncate font-semibold">
                                                    {instructorData.username}
                                                </span>
                                                <span className="truncate text-xs">
                                                    {instructorData.email}
                                                </span>
                                            </div>
                                            <ChevronsUpDown className="ml-auto size-4" />
                                        </SidebarMenuButton>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                                        side="bottom"
                                        align="end"
                                        sideOffset={4}
                                    >
                                        <DropdownMenuLabel className="p-0 font-normal">
                                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                                <Avatar className="h-8 w-8 rounded-lg">
                                                    <AvatarImage
                                                        src={instructorData.avatar}
                                                        alt={instructorData.username}
                                                    />
                                                    <AvatarFallback className="rounded-lg">
                                                        {instructorData.username.charAt(0).toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="grid flex-1 text-left text-sm leading-tight">
                                                    <span className="truncate font-semibold">
                                                        {instructorData.username}
                                                    </span>
                                                    <span className="truncate text-xs">
                                                        {instructorData.email}
                                                    </span>
                                                </div>
                                            </div>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem>
                                                <User className="mr-2 h-4 w-4" />
                                                <span onClick={navigateProfile}>Profile</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Settings className="mr-2 h-4 w-4" />
                                                <span>Settings</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                <ModeToggle />
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                <GraduationCap className="mr-2 h-4 w-4" />
                                                <span onClick={navigateHome}>Switch to Student</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={handleLogout}>
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <span>Log out</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarFooter>
                </Sidebar>
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-6">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mx-2 h-6" />
                        <h1 className="text-lg font-semibold">
                            {activeView === "dashboard" && "Instructor Dashboard"}
                            {activeView === "createCourse" && "Create New Course"}
                            {activeView === "myCourses" && "My Courses"}
                        </h1>
                    </header>
                    <main className="flex-1 overflow-auto p-6 min-h-[88vh]">
                        {activeView === "dashboard" && (
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Total Courses
                                        </CardTitle>
                                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{instructorData.publishedCourses}</div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Total Students
                                        </CardTitle>
                                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{instructorData.totalStudents}</div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Total Earnings
                                        </CardTitle>
                                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">${instructorData.totalEarnings.toFixed(2)}</div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Instructor Rating
                                        </CardTitle>
                                        <BadgeCheck className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">4.8</div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}
                        {activeView === "createCourse" && (
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
                                            {/* Category Dropdown */}
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

                                            {/* Sub-Category Dropdown */}
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

                                            {/* Display Added Tags */}
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

                                            {/* Suggest tags if input matches existing ones */}
                                            {newTag && !selectedTags.includes(newTag) && tags.includes(newTag) && (
                                                <div className="mt-2 text-gray-500">
                                                    <p>Suggested tag: {newTag}</p>
                                                </div>
                                            )}

                                            {/* Display Max Tags Reached Warning */}
                                            {selectedTags.length === 5 && (
                                                <p className="text-red-500 mt-2">You have reached the maximum number of tags (5).</p>
                                            )}
                                            <div className="flex flex-col space-y-2">
                                                <Label htmlFor="thumbnail">Thumbnail</Label>

                                                <div className="w-full  mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
                                                    <FileUpload onChange={handleFileUpload} />
                                                </div>
                                            </div>
                                            <Button type="submit">Create Course</Button>
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>
                        )}
                        {activeView === "myCourses" && (
                            <CourseManagement setActiveView={setActiveView} />
                        )}
                    </main>
                    <Footer />
                </SidebarInset>
            </SidebarProvider>
        </>
    )
}

