"use client";

import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/auth-context";
import {
  getAuthToken,
  logout as apiLogout,
  getInstructorCourses,
} from "@/lib/api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/layout/Footer";
import { InstructorSidebar } from "./Sidebar";
import { Header } from "./Header";

export function InstructorDashboardLayout() {
  const [courses, setCourses] = useState([]);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const instructorData = {
    username: user.username,
    email: user.email,
    avatar: user.avatar,
    publishedCourses: 5,
    totalStudents: 1234,
    totalEarnings: 9876.54,
  };

  function navigateHome() {
    navigate("/");
  }

  function navigateProfile() {
    navigate("/profile");
  }

  const handleLogout = async () => {
    const authToken = getAuthToken();
    if (!authToken) {
      toast.error("No authentication token found. Please log in again.");
      return;
    }

    toast.promise(
      async () => {
        const response = await apiLogout(authToken);
        logout(); // Clear user session
        return response?.data?.message || "You have successfully logged out.";
      },
      {
        loading: "Logging out...",
        success: "Successfully logged out!",
        error: "Failed to log out. Please try again.",
      }
    );
    navigate("/");
  };

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await getInstructorCourses();

        if (response.status === 200) {
          setCourses(response.data.data);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch courses. Please try again.");
      }
    }
    fetchCourses();
  }, []);

  return (
    <SidebarProvider>
      <InstructorSidebar
        instructorData={instructorData}
        setActiveView={(view: string) => {
          navigate(`/instructor/${view.toLowerCase()}`);
        }}
        navigateProfile={navigateProfile}
        navigateHome={navigateHome}
        handleLogout={handleLogout}
      />
      <SidebarInset>
        <Header activeView="dashboard" />
        <main className="flex-1 overflow-auto p-6 min-h-[88vh]">
          <Outlet context={{ instructorData, courses, setCourses }} />
        </main>
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
}
