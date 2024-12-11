import React from 'react';
import { Link } from 'react-router-dom';
import { Book, User } from 'lucide-react';
import { Button } from '../ui/button';
import { useAuth } from '../../contexts/auth-context';
import { logout as apiLogout } from '../../lib/api';
import { toast } from 'sonner';

export const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = async () => {
    const authToken = user?.token as string;
  
    if (!authToken && !isAuthenticated) {
      toast.error('No authentication token found. Please log in again.');
      return;
    }
  
    toast.promise(
      async () => {
        const response = await apiLogout(authToken);
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Adding delay of 1.5 seconds
        return response; // Ensure API response is returned
      },
      {
        loading: 'Logging out...',
        success: (response) => {
          logout(); // Clear user session
          return response?.data?.message || 'You have successfully logged out.';
        },
        error: (error) => `Failed to logout: ${error?.message || 'Please try again.'}`,
      }
    );
  };
  

  return (
    <nav className="border-b bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Book className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold">GyanSagar</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/courses" className="text-foreground/80 hover:text-foreground">
              Courses
            </Link>
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard" className="text-foreground/80 hover:text-foreground">
                  Dashboard
                </Link>
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>{user?.username}</span>
                </div>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};