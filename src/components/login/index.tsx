import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from '../../services/auth/authSlice'; // Adjust the import path for your store

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // For now, let's log the email and password
    console.log('Email:', email);
    console.log('Password:', password);

    // Here you can add logic for authentication (API call, etc.)

    // Simulating successful login and setting "Ro" as user
    dispatch(setCredentials({ token: 'fakeToken' })); // You can replace 'fakeToken' with a real token if needed

    // After login, redirect to the dashboard or homepage
    navigate('/dashboard'); // Adjust the path based on where you want to navigate after login
  };






  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="w-full max-w-sm p-8 bg-[#edf5ff] shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-left mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="email"
              id="email"
              name="email"
              className="bg-transparent border-none border-b border-[#003171] text-base leading-6 mb-5 outline-none w-full"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full mt-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
