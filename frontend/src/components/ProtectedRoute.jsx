import { useState, useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import api from "../lib/api.js";
//import LoadingSpinner from "./LoadingSpinner.jsx";

export default function ProtectedRoute({ children }) {
  const hasAlerted = useRef(false);
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    api
      .get("/auth")
      .then(() => {
        if (mounted) setAuthed(true);
      })
      .catch(() => {
        if (mounted) setAuthed(false);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    if (!authed && !hasAlerted.current) {
      hasAlerted.current = true;
      alert("You must be logged in to access this page.");
    }
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <div className="p-4 text-center">Loading...</div>; // loading spinner can be used here
  return authed ? children : <Navigate to="/login" />;
}
