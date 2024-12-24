import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { LoginForm } from '@/components/auth/LoginForm';
import Dashboard from '@/pages/Dashboard';
import Profile from '@/pages/Profile';
import InstructorDashboard from './pages/InstructorDashboard';
import RootLayout from './components/layout/RootLayout';
import MyLearning from './pages/MyLearning';
import CourseOverview from './components/course-overview';
import CartContents from './pages/Cart';
import CategoryPage from './pages/CategoryPage';

type Theme = "light" | "dark";
function App() {
  const theme: Theme = localStorage.getItem("theme") as Theme;
  
  return (
      <Router>
        <Routes>
          <Route path="/instructor/courses" element={<InstructorDashboard />} />
          <Route path="/" element={<RootLayout />} >
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/my-learning" element={<MyLearning />} />
            <Route path="/my-learning/:category" element={<MyLearning />} />
            <Route path="/course/:courseId" element={<CourseOverview />} />
            <Route path="/courses/:category" element={<CategoryPage />} />
            <Route path="/cart" element={<CartContents />} />
            <Route path="/course/player" element={<>
            
            <video poster="https://i.ytimg.com/vi/gBMQisvWCLY/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDeUNbsXn8E_g0fhwTr2HLZD_Vn2Q" controls autoPlay src="
            https://firebasestorage.googleapis.com/v0/b/theslugproject.appspot.com/o/gyansagar-courses%2Fweek1%2FJs-Basics.mov?alt=media&token=8814c902-161b-4397-9c17-b3361aeebd19"></video>
            </>} />

          </Route>
        </Routes>
        <Toaster duration={5000} position="bottom-right" expand={true} richColors theme={theme} />
      </Router>
  );
}

export default App;