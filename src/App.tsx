import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { LoginForm } from '@/components/auth/LoginForm';
import Dashboard from '@/pages/Dashboard';
import Profile from '@/pages/Profile';
import InstructorDashboard from './components/instructor-dashboard';
import RootLayout from './components/layout/RootLayout';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/instructor/courses" element={<InstructorDashboard />} />
          <Route path="/" element={<RootLayout />} >
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
        <Toaster duration={5000} position="bottom-right" expand={true} richColors />
      </Router>
  );
}

export default App;