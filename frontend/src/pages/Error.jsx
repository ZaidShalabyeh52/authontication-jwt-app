import { useNavigate, useLocation } from "react-router-dom";

export default function ErrorPage({ message }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6 pb-[15%]">
      <div className="max-w-xl w-full bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 flex items-center justify-center">
          Something went wrong
        </h1>
        <p className="text-sm text-gray-300 mb-6">
          {message ?? `We couldn't load ${location.pathname}.`}
        </p>

        <div className="flex gap-3 justify-center sm:flex-row flex-col">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600"
          >
            Go back
          </button>

          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 rounded bg-[#1566b7] hover:bg-[#0f4f94]"
          >
            Home
          </button>

          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded bg-green-600 hover:bg-green-700"
          >
            Reload
          </button>
        </div>

        {message ? null : (
          <p className="mt-6 text-xs text-gray-500">
            If the problem persists, check the console or contact support.
          </p>
        )}
      </div>
    </main>
  );
}
