import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProductProvider } from "./contexts/ProductContext";
import { Products } from "./pages/Products";
import { ProductDetail } from "./pages/ProductDetail";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { PrivateRoute } from "./routes/PrivateRoute";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProductProvider>
          <ErrorBoundary>
            <Navbar />
            <Routes>
              <Route path="/" element={<Navigate to="/products" />} />

              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/login" element={<Login />} />

              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
            </Routes>
          </ErrorBoundary>
        </ProductProvider>
      </AuthProvider>

    </Router>
  );
}

export default App;
