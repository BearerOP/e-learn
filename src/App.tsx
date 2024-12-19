import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { LoginForm } from '@/components/auth/LoginForm';
import Dashboard from '@/pages/Dashboard';
import Profile from '@/pages/Profile';
import InstructorDashboard from './components/instructor-dashboard';
import RootLayout from './components/layout/RootLayout';
import MyLearning from './pages/MyLearning';
import CourseOverview from './components/course-overview';
import Courses from './pages/CategoryPage';

function App() {
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
            <Route path="/courses/:category" element={<Courses />} />

          </Route>
        </Routes>
        <Toaster duration={5000} position="bottom-right" expand={true} richColors />
      </Router>
  );
}

export default App;