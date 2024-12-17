import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Book, GraduationCap, LogOut, Settings, User, 
  ShoppingCart, Heart, BookOpen, Search 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { useAuth } from '@/contexts/auth-context';
import { logout as apiLogout, getAuthToken, getMe } from '@/lib/api';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { ModeToggleDropdown } from '../mode-toggle-dropdown';

// Reusable component for navigation menu items with links
const ListItem = ({ title, href, children }) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={href}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        >
          <div className="text-sm font-medium leading-5">{title}</div>
          {children && <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>}
        </Link>
      </NavigationMenuLink>
    </li>
  );
};

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout, login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      const authToken = getAuthToken();
      if (authToken) {
        try {
          setLoading(true);
          const response = await getMe();
          login(response.data);
        } catch (error) {
          console.error('Error fetching user details:', error);
          toast.error('Unable to fetch user details. Please log in again.');
        } finally {
          setLoading(false);
        }
      }
    };
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
        logout();
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

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="border-b bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Book className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold">GyanSagar</span>
            </Link>

            <NavigationMenu className="hidden md:block ml-6">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Courses</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[600px] gap-3 p-4 md:grid-cols-2">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            to="/courses"
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          >
                            <Book className="h-6 w-6" />
                            <div className="mt-4 mb-2 text-lg font-medium">
                              All Courses
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Explore our comprehensive learning paths
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <ListItem href="/courses/web-development" title="Web Development">
                        HTML, CSS, JavaScript, React, Node.js
                      </ListItem>
                      <ListItem href="/courses/data-science" title="Data Science">
                        Python, Machine Learning, Data Analysis
                      </ListItem>
                      <ListItem href="/courses/ai" title="Artificial Intelligence">
                        Machine Learning, Deep Learning, Neural Networks
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Popular Topics</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 grid-cols-2">
                      <ListItem  href="/topics/ai" title="Artificial Intelligence" >
                        Machine Learning, Deep Learning
                      </ListItem>
                      <ListItem href="/topics/blockchain" title="Blockchain" >
                        Cryptocurrency, Smart Contracts, Bitcoin
                      </ListItem>
                      <ListItem href="/topics/cybersecurity" title="Cybersecurity" >
                        Ethical Hacking, Penetration Testing
                      </ListItem>
                      <ListItem href="/topics/cloud-computing" title="Cloud Computing" >
                        AWS, Azure, Google Cloud
                      </ListItem>
                      <ListItem href="/topics/data-engineering" title="Data Engineering" >
                        Data Warehousing, ETL, Big Data
                      </ListItem>
                      <ListItem href="/topics/mobile-dev" title="Mobile Development" >
                        Android, iOS, Flutter, React Native
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="hidden md:flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-[200px] pl-8 pr-3 py-2"
                />
              </div>
            </form>

            <div className="hidden md:flex items-center space-x">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/my-learning">
                  My Learning
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/wishlist">
                  <Heart className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/cart">
                  <ShoppingCart className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <ModeToggleDropdown />

            {isAuthenticated ? (
              <div className="flex items-center text-sm space-x-4">
                <AvatarDropdown user={user} onLogout={handleLogout}/>
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

const AvatarDropdown = ({ user, onLogout }) => {
  return (
    <DropdownMenu>
    <DropdownMenuTrigger>
        <Avatar className="h-10 w-10 rounded-2xl border-1">
            <AvatarImage
              src={user?.avatar}
              alt={user?.username}
            />
            <AvatarFallback className="rounded-lg">
              {user?.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent className='min-w-56'>
      <DropdownMenuLabel className="p-0 font-normal">
        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage
              src={user?.avatar}
              alt={user?.username}
            />
            <AvatarFallback className="rounded-lg">
              {user?.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">
              {user?.username}
            </span>
            <span className="truncate text-xs">
              {user?.email}
            </span>
          </div>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <Link to="/my-learning">
          <BookOpen className="mr-2 h-4 w-4" />
          <span>My Learning</span>
        </Link>
        
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link to="/wishlist">
          <Heart className="mr-2 h-4 w-4" />
          <span>Wishlist</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link to="/cart">
          <ShoppingCart className="mr-2 h-4 w-4" />
          <span>My Cart</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <Link to="/profile">
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link to='/settings'>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <Link to='/instructor/courses'>
          <GraduationCap className="mr-2 h-4 w-4" />
          <span>Switch to Instructor</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={onLogout}>
        <div className="flex items-center space-x-2">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </div>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  )
}

export default Navbar;