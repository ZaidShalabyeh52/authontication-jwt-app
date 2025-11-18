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
import ErrorPage from "./pages/Error.jsx";
import { ErrorBoundary } from "react-error-boundary";

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
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </ErrorBoundary>
      <Footer />
    </Router>
  </StrictMode>
);
