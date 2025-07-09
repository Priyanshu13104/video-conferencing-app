import Navbar from '../components/Navbar.jsx';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import DotGrid from '../BackgroundAnimations/DotGrid.jsx';

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
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
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        return setError(data.message || 'Registration failed');
      }

      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (err) {
      setError('Something went wrong');
    }
  };

  return (
    <>
    <Navbar />
    <div className='w-screen h-screen bg-gray-100 relative overflow-hidden flex items-center justify-center'>
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
      <div className="relative inset-0 z-10 flex items-center justify-center">
        <div className="bg-white p-8 items-center justify-center rounded-2xl shadow-xl w-auto max-w-md flex flex-col">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Hello!👋</h2>
            <p className="text-gray-600">Sign up to get started.</p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-6 w-full">

            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" name="name" placeholder="Name" required onChange={handleChange} className='w-80 px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-200' />

            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" name="email" placeholder="Email" required onChange={handleChange} className='w-80 px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-200' />

            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" name="password" placeholder="Password" required onChange={handleChange} className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-200' />


            <button type="submit" className='w-80 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>Sign Up</button>


            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?
                <Link
                to="/login" 
                className="text-blue-600 hover:text-blue-800 font-semibold ml-1 transition-colors">
                  Login
                </Link>
              </p>
            </div>
          </form>
          {error && <p style={{ color: 'red' }}>{error}</p>}

        </div>
      </div>
    </div>
    </>
  );
}


export default Register;
