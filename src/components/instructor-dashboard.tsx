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
import { useNavigate } from "react-router-dom"

const instructorData = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/avatars/instructor.jpg",
    publishedCourses: 5,
    totalStudents: 1234,
    totalEarnings: 9876.54,
}

const categories = [
    "Web Development",
    "Mobile Development",
    "Data Science",
    "Machine Learning",
    "Design",
    "Business",
]

export default function InstructorDashboard() {
    const [activeView, setActiveView] = useState("dashboard")

    const navigate = useNavigate();
    function navigateHome() {
        navigate("/");
    }

    function navigateProfile() {
        navigate("/profile");
    }

    return (
        <>

            <SidebarProvider>
                <Sidebar variant="inset">
                    <SidebarHeader>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton size="lg" asChild>
                                    <a href="#">
                                        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                            <Command className="size-4" />
                                        </div>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-semibold">Instructor Dashboard</span>
                                            <span className="truncate text-xs">Course Management</span>
                                        </div>
                                    </a>
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
                                                    alt={instructorData.name}
                                                />
                                                <AvatarFallback className="rounded-lg">JD</AvatarFallback>
                                            </Avatar>
                                            <div className="grid flex-1 text-left text-sm leading-tight">
                                                <span className="truncate font-semibold">
                                                    {instructorData.name}
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
                                                        alt={instructorData.name}
                                                    />
                                                    <AvatarFallback className="rounded-lg">
                                                        JD
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="grid flex-1 text-left text-sm leading-tight">
                                                    <span className="truncate font-semibold">
                                                        {instructorData.name}
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
                                            <DropdownMenuItem>
                                                <GraduationCap className="mr-2 h-4 w-4" />
                                                <span onClick={navigateHome}>Switch to Student</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
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
                    <main className="flex-1 overflow-auto p-6">
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
                                            <div className="flex flex-col space-y-1.5">
                                                <Label htmlFor="category">Category</Label>
                                                <Select>
                                                    <SelectTrigger id="category">
                                                        <SelectValue placeholder="Select a category" />
                                                    </SelectTrigger>
                                                    <SelectContent position="popper">
                                                        {categories.map((category) => (
                                                            <SelectItem key={category} value={category.toLowerCase()}>
                                                                {category}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="flex flex-col space-y-1.5">
                                                <Label htmlFor="thumbnail">Thumbnail</Label>
                                                <Input id="thumbnail" type="file" />
                                            </div>
                                            <Button type="submit">Create Course</Button>
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>
                        )}
                        {activeView === "myCourses" && (
                            <CourseManagement />
                        )}
                    </main>
                    <Footer />
                </SidebarInset>
            </SidebarProvider>
        </>
    )
}

