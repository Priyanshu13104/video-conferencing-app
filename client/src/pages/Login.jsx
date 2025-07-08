import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DotGrid from '../BackgroundAnimations/DotGrid.jsx';

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        return setError(data.message || 'Login failed');
      }

      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (err) {
      setError('Something went wrong');
    }
  };

  return (  
    <div className="w-screen h-screen bg-gray-100 relative overflow-hidden flex items-center justify-center">
      {/* Fullscreen animated background */}
      <div className="absolute inset-0 z-0">
        <DotGrid
          dotSize={5}
          gap={15}
          baseColor="#f3f4f6"
          activeColor="#155dfc"
          proximity={90}
          shockRadius={350}
          shockStrength={6}
          resistance={750}
          returnDuration={1.5}
        />
      </div>

      {/* Centered Foreground Login Form */}
      <div className="relative inset-0 z-10 flex items-center justify-center">
        <div className="bg-white p-8 items-center justify-center rounded-2xl shadow-xl w-auto max-w-md flex flex-col">
          {/* <!-- Welcome Message --> */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back! 👋</h2>
            <p className="text-gray-600">Login to your account to explore more</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col space-y-6 w-full">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                onChange={handleChange}
                className="w-80 px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-200"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                required
                onChange={handleChange}
                className="w-80 px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-200"
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor="remember" className="text-sm text-gray-600">Remember me</label>
              </div>
              <button type="button" className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
                Forgot Password?
              </button>
            </div>

            {/* <!-- Login Button --> */}
            <button
              type="submit"
              className="w-full px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Login
            </button>

            
          </form>

          {/* <!-- Create Account Link --> */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?
              <button className="text-blue-600 hover:text-blue-800 font-semibold ml-1 transition-colors">Create Account</button>
            </p>
          </div>

          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default Login;
