
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SupabaseProvider } from './context/SupabaseContext';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import Router from './routes';

// Create a client for React Query
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SupabaseProvider>
        <AuthProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </AuthProvider>
      </SupabaseProvider>
    </QueryClientProvider>
  );
}

export default App;
