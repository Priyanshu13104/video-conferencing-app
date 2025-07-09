import { useContext } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          VidChat
        </Link>

        <div className="flex items-center gap-4">
          {!user && isLoginPage && (
            <Link
              to="/register"
              className="border border-gray-800 text-gray-800 hover:bg-gray-100 transition px-4 py-2 rounded"
            >
              Register
            </Link>
          )}

          {!user && isRegisterPage && (
            <Link
              to="/login"
              className="border border-gray-800 text-gray-800 hover:bg-gray-100 transition px-4 py-2 rounded"
            >
              Login
            </Link>
          )}

          {user && (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
