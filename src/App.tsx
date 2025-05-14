
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SupabaseProvider } from './context/SupabaseContext';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import Router from './routes';
import { useEffect } from 'react';
import { applyPlatformAdjustments } from './lib/platform';
import { Toaster } from '@/components/ui/toaster';

// Create a client for React Query
const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    // Apply platform-specific adjustments when app loads
    applyPlatformAdjustments();
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <SupabaseProvider>
        <AuthProvider>
          <BrowserRouter>
            <Router />
            <Toaster />
          </BrowserRouter>
        </AuthProvider>
      </SupabaseProvider>
    </QueryClientProvider>
  );
}

export default App;
