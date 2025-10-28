import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <Link to="/products" className="font-bold text-blue-600 text-lg">
          E-Commerce (Evaluasi Bulan 3 ygy)
        </Link>

        {isAuthenticated && (
          <Link
            to="/dashboard"
            className="text-gray-700 hover:text-blue-500 transition-colors"
          >
            Dashboard
          </Link>
        )}
      </div>

      <div>
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};
