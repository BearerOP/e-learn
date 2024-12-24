"use client"

import { useState } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { useAuth } from "@/contexts/auth-context"
import { getAuthToken, logout as apiLogout } from "@/lib/api"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { InstructorSidebar } from "@/components/sidebar-dashboard"
import { Header } from "@/components/header-dashboard"
import { DashboardCards } from "@/components/dashboard-cards"
import { CreateCourseForm } from "@/components/create-course-form"
import { CourseManagement } from "@/components/course-management"
import Footer from "@/components/layout/Footer"

export default function InstructorDashboard() {
    const [activeView, setActiveView] = useState("dashboard")
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const instructorData = {
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        publishedCourses: 5,
        totalStudents: 1234,
        totalEarnings: 9876.54,
    }

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
        <SidebarProvider>
            <InstructorSidebar
                instructorData={instructorData}
                setActiveView={setActiveView}
                navigateProfile={navigateProfile}
                navigateHome={navigateHome}
                handleLogout={handleLogout}
            />
            <SidebarInset>
                <Header activeView={activeView} />
                <main className="flex-1 overflow-auto p-6 min-h-[88vh]">
                    {activeView === "dashboard" && (
                        <DashboardCards instructorData={instructorData} />
                    )}
                    {activeView === "createCourse" && (
                        <CreateCourseForm />
                    )}
                    {activeView === "myCourses" && (
                        <CourseManagement setActiveView={setActiveView} />
                    )}
                </main>
                <Footer />
            </SidebarInset>
        </SidebarProvider>
    )
}

