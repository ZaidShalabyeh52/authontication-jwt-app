import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../lib/api.js";
import Loading from "./Loading.jsx";

// Public-only guard: if already authenticated, redirect away (e.g., to /protected)
export default function PublicRoute({ children, redirectTo = "/protected" }) {
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
	if (authed) return <Navigate to={redirectTo} replace />;
	return children;
}
