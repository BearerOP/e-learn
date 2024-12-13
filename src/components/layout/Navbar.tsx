import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Book, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth-context';
import { logout as apiLogout, getAuthToken, getMe } from '@/lib/api';
import { toast } from 'sonner';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';

export const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout, login } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const authToken = getAuthToken();
      if (authToken) {
        try {
          setLoading(true);
          const response = await getMe();
          login(response.data); // Update context with fetched user details
        } catch (error) {
          console.error('Error fetching user details:', error);
          toast.error('Unable to fetch user details. Please log in again.');
        } finally {
          setLoading(false);
        }
      }
    };
    // Fetch user details if authenticated
    fetchUserDetails();
  }, []);

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
            {isAuthenticated ? (
              <div className="flex items-center text-sm space-x-4">
                <Link to="/" className="text-foreground/80 hover:text-foreground">
                  Dashboard
                </Link>
                <Link to="/instructor/courses" className="text-foreground/80 hover:text-foreground">
                  Instructor
                </Link>
                <DropdownMenu >
                  <DropdownMenuTrigger>
                    <Button variant="outline" size="sm">
                      <div className="flex items-center space-x-2">
                        <User className="w-5 h-5" />
                        <span>{loading ? 'Loading...' : user?.username || 'User'}</span>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Link to="/profile">
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <Link to="/settings">
                      <DropdownMenuItem>
                        Settings
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <div className="flex items-center space-x-2"  >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                      </div>
                    </DropdownMenuItem>

                  </DropdownMenuContent>
                </DropdownMenu>
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
