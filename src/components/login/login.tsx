import { useState } from 'react';
import { useLoginMutation } from '../../services/auth/authSlice';
import { Alert, AlertDescription } from '@/components/ui/alert';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Get the login mutation hook
  const [login, { isLoading, isError, error }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login({ email, password }).unwrap();
      // On successful login, you'll automatically get the token in your state
      console.log('Login successful:', result);
    } catch (err) {
      console.error('Failed to login:', err);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full p-2 rounded-md text-white
            ${isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}
          `}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>

        {isError && (
          <Alert variant="destructive">
            <AlertDescription>
              {error?.data?.message || 'Failed to login. Please try again.'}
            </AlertDescription>
          </Alert>
        )}
      </form>

      {/* State change demonstration */}
      <div className="mt-4 p-4 bg-gray-100 rounded-md">
        <h3 className="font-medium">Current State:</h3>
        <pre className="mt-2 text-sm">
          {JSON.stringify({
            isLoading,
            isError,
            hasCredentials: Boolean(email && password)
          }, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default LoginForm;