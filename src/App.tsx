
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SupabaseProvider } from './context/SupabaseContext';
import { AuthProvider } from './context/AuthContext';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';

// Create a client for React Query
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SupabaseProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </SupabaseProvider>
    </QueryClientProvider>
  );
}

export default App;
