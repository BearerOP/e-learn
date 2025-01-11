import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { LoginForm } from '@/components/auth/LoginForm';
import Dashboard from '@/pages/Dashboard';
import Profile from '@/pages/Profile';
import { InstructorDashboardLayout } from './components/layout/InstructorDashboardLayout';
import InstructorDashboard from './pages/InstructorDashboard';
import RootLayout from './components/layout/RootLayout';
import MyLearning from './pages/MyLearning';
import CourseOverview from './components/course-overview';
import CartContents from './pages/Cart';
import CategoryPage from './pages/CategoryPage';
import CourseContent from './pages/CourseContent';
import CourseManagement from './pages/CourseManagement';
import CreateCourse from './pages/CreateCourse';
import { CourseContentView } from './components/tracks';
import TrackContent from './pages/TrackContent';
import { SignupForm } from './components/auth/SignupForm';
import { NotFound } from './pages/NotFound';
import { useTheme } from 'next-themes';

function App() {

  const { theme } = useTheme();

  return (
    <Router>
      <Routes>
        <Route path="/instructor" element={<InstructorDashboardLayout />}>
          <Route index element={<InstructorDashboard />} />
          <Route path="courses" element={<CourseManagement />} />
          <Route path="course/:courseId" element={<CourseManagement />} />
          <Route path="create-course" element={<CreateCourse />} />
        </Route>

        <Route path="/" element={<RootLayout />} >
        <Route path="/course/player" element={<CourseContentView />}/>
          <Route index element={<Dashboard />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="register" element={<SignupForm />} />
          <Route path="profile" element={<Profile />} />
          <Route path="my-learning" element={<MyLearning />} />
          <Route path="my-learning/:category" element={<MyLearning />} />
          <Route path="course/overview/:courseId" element={<CourseOverview />} />
          <Route path="courses/:category" element={<CategoryPage />} />
          <Route path="cart" element={<CartContents />} />
          <Route path="my-learning/course/:courseId" element={<CourseContent/>} />
          <Route path="my-learning/course/track/:trackId" element={<TrackContent/>} />
          <Route path="*" element={<NotFound/>} />
        </Route>
      </Routes>
      <Toaster closeButton position="bottom-right" richColors theme={theme as "light" | "dark"} />
    </Router>
  );
}

export default App;


{/* <Route path="/course/player" element={<>

<video poster="https://i.ytimg.com/vi/gBMQisvWCLY/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDeUNbsXn8E_g0fhwTr2HLZD_Vn2Q" controls autoPlay src="
https://firebasestorage.googleapis.com/v0/b/theslugproject.appspot.com/o/gyansagar-courses%2Fweek1%2FJs-Basics.mov?alt=media&token=8814c902-161b-4397-9c17-b3361aeebd19"></video>
</>} /> */}