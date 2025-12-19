import { act, useEffect, useState } from "react";
import api from "../lib/api.js";
import Loading from "../components/Loading.jsx";

export default function ProtectedPage() {
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await api.get("/auth");
        if (!active) return;
        setUsername(res.data?.username || "");
      } catch (err) {
        if (!active) return;
        setError(err?.response?.data?.error || "Failed to load user");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-gray-900">
      <div className="flex items-center justify-center min-h-[60vh] bg-gray-900 text-white p-6">
        <div className="sm:max-w-[70%] text-center">
          <h1 className="text-3xl sm:text-[40px] lg:text-[60px] font-bold mb-4">
            {loading ? (
              <Loading />
            ) : username ? (
              <>
                Welcome,{" "}
                <span className="bg-clip-text text-transparent bg-linear-to-r from-[#0080ff] to-[#00ffb3]">
                  {username}
                </span>
                !
              </>
            ) : (
              "This is a protected page!"
            )}
          </h1>
          <br />
          <p className="mb-4 text-gray-300 text-[20px] lg:text-3xl">
            {error
              ? error
              : "You have successfully accessed a protected route. Only authenticated users can see this content. Congratulations on logging in!"}{" "}
          </p>
        </div>
      </div>
    </main>
  );
}
