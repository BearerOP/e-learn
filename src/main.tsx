import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthProvider } from '@/contexts/auth-context';
import { ThemeProvider } from 'next-themes';
import { TabProvider } from './contexts/tab-context';
createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <AuthProvider>
      <TabProvider>
      <App />
      </TabProvider>
    </AuthProvider>
  </ThemeProvider>
);
