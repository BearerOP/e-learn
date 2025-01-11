"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, LogOut } from "lucide-react";
import Loader from "@/components/ui/loader";
import { useAuth } from "@/contexts/auth-context";
import { useState } from "react";
import { toast } from "sonner";
import { getAuthToken, logout as apiLogout } from "@/lib/api";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  window.scrollTo(0, 0);
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [logoutLoading] = useState(false);

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

  const provider = "exampleProvider"; // Replace with actual provider
  const providerId = "exampleProviderId"; // Replace with actual provider ID
  const myCourses = []; // Replace with actual myCourses data
  const purchasedCourses = []; // Replace with actual purchasedCourses data
  return (
    <div className="h-full w-full flex items-center justify-center bg-background relative overflow-hidden p-8 z-0">

      <Card className="w-full max-w-4xl bg-background/80 dark:bg-background/30 backdrop-blur-sm shadow-xl border border-border relative z-10">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold text-foreground">Profile</CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" size="icon" className="bg-transparent border-border text-foreground hover:bg-accent hover:text-accent-foreground">
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="destructive" size="icon" onClick={handleLogout} className="bg-destructive hover:bg-destructive/90">
              {logoutLoading ? <Loader barColor={'#fff'} /> : <LogOut className="h-4 w-4" />}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user?.avatar} alt={user?.username} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {user?.username ? user?.username.charAt(0).toUpperCase() : "?"}
              </AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold text-foreground">{user?.username}</h2>
              <p className="text-muted-foreground">{user?.email}</p>
              {
                user?.role == 'both' ? (
                  <div ><Badge variant="destructive" className="mt-2 mr-2">Instructor</Badge>
                    <Badge variant="secondary" className="mt-2">Student</Badge>
                  </div>
                ) : (
                  <Badge variant="secondary" className="mt-2">Student</Badge>
                )
              }
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 text-primary">Account Details</h3>
              <p><span className="text-muted-foreground">Provider:</span> <span className="text-foreground">{provider}</span></p>
              <p><span className="text-muted-foreground">Provider ID:</span> <span className="text-foreground">{providerId}</span></p>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 text-primary">Course Information</h3>
              <p><span className="text-muted-foreground">My Courses:</span> <span className="text-foreground">{myCourses.length}</span></p>
              <p><span className="text-muted-foreground">Purchased Courses:</span> <span className="text-foreground">{purchasedCourses.length}</span></p>
            </div>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-primary">My Courses</h3>
            {myCourses.length > 0 ? (
              <ul className="space-y-2">
                {myCourses.map((course) => (
                  <li key={course._id} className="bg-background/50 p-3 rounded-md">
                    <h4 className="font-semibold text-foreground">{course.name}</h4>
                    <p className="text-sm text-muted-foreground">Category: {course.category}</p>
                    <p className="text-sm text-muted-foreground">Price: ${course.price.toFixed(2)}</p>
                    {course.status && (
                      <p className="text-sm text-muted-foreground">Status: {course.status}</p>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">No courses created yet.</p>
            )}
          </div>

          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-primary">Purchased Courses</h3>
            {purchasedCourses.length > 0 ? (
              <ul className="space-y-2">
                {purchasedCourses.map((course) => (
                  <li key={course._id} className="bg-background/50 p-3 rounded-md">
                    <h4 className="font-semibold text-foreground">{course.name}</h4>
                    <p className="text-sm text-muted-foreground">Category: {course.category}</p>
                    <p className="text-sm text-muted-foreground">Price: ${course.price.toFixed(2)}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">No courses purchased yet.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}