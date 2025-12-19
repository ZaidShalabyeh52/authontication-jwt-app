import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import ResponsiveAppBar from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import LogIn from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ProtectedPage from "./pages/ProtectedPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import PublicRoute from "./components/PublicRoute.jsx";
import ErrorPage from "./pages/Error.jsx";
import { ErrorBoundary } from "react-error-boundary";
import Loading from "./components/Loading.jsx";
import PublicRoute from "./components/PublicRoute.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <ResponsiveAppBar />

      <ErrorBoundary
        fallbackRender={({ error, resetErrorBoundary }) => (
          <ErrorPage message={String(error?.message ?? "Unknown error")} />
        )}
      >
        <Routes>
          <Route path="/loading" element={<Loading />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LogIn />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                {" "}
                <ProtectedPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </ErrorBoundary>
      <Footer />
    </Router>
  </StrictMode>
);
