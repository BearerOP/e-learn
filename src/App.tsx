import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Navbar } from './components/layout/Navbar';
import { AuthProvider } from './contexts/auth-context';
import { LoginForm } from './components/auth/LoginForm';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <Navbar />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<div>Welcome to GyanSagar</div>} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>
          <Toaster duration={5000} position="bottom-right" expand={true} richColors theme='dark' />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;