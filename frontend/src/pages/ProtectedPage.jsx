export default function ProtectedPage() {
  return (
    <main className="min-h-screen bg-gray-900">
      <div className="flex items-center justify-center min-h-[60vh] bg-gray-900 text-white p-6">
        <div className="sm:max-w-[70%] text-center">
          <h1 className="text-3xl sm:text-[40px] lg:text-[60px] font-bold mb-4">
            This is a protected page!
          </h1>
          <br />
          <p className="mb-4 text-gray-300 text-[20px] lg:text-2xl">
            You have successfully accessed a protected route. Only authenticated
            users can see this content. Congratulations on logging in!
          </p>
        </div>
      </div>
    </main>
  );
}
