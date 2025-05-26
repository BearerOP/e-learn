"use client";

import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/auth-context";
import {
  getAuthToken,
  logout as apiLogout,
  getInstructorCourses,
  getInstructorDashboardData,
} from "@/lib/api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/layout/Footer";
import { InstructorSidebar } from "./Sidebar";
import { Header } from "./Header";
import { InstructorData } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

export function InstructorDashboardLayout() {
  const [courses, setCourses] = useState([]);
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [instructorData, setInstructorData] = useState<InstructorData>({
    username: user.username,
    email: user.email,
    avatar: user.avatar,
    publishedCourses: 0,
    totalStudents: 0,
    totalEarnings: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInstructorData = async () => {
      try {
        setLoading(true);
        const instructorData = await getInstructorDashboardData();
        console.log(instructorData.data, "instructorData");
        setInstructorData({
          username: user.username,
          email: user.email,
          avatar: user.avatar,
          publishedCourses: instructorData.data.publishedCourses,
          totalStudents: instructorData.data.totalStudents,
          totalEarnings: instructorData.data.totalEarnings,
        });
      } catch (error) {
        console.error("Failed to fetch instructor data:", error);
        toast.error("Failed to fetch instructor data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchInstructorData();
  }, [user.username, user.email, user.avatar]);

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
          {loading ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="h-[120px] w-full rounded-lg" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="h-[180px] w-full rounded-lg" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <Outlet context={{ instructorData, courses, setCourses }} />
          )}
        </main>
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
}
