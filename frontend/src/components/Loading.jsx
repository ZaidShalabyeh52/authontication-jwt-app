import CircularProgress from "@mui/material/CircularProgress";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div>
        <CircularProgress />
      </div>
    </div>
  );
}
