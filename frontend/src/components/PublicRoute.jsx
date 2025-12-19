import { useState, useEffect } from "react";
import api from "../lib/api.js";
import Loading from "./Loading.jsx";
import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    api
      .get("/auth")
      .then(() => {
        if (active) setAuthed(true);
      })
      .catch(() => {
        if (active) setAuthed(false);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  if (loading) return <Loading />;
  if (!loading && authed) return <Navigate to="/protected" />;
  return children;
}
