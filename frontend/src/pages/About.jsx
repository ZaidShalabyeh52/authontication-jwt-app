export default function About() {
  return (
    <main className="min-h-screen bg-gray-900">
      <div className="flex items-center justify-center min-h-[60vh] bg-gray-900 text-white p-6">
        <div className="sm:max-w-[70%] text-center">
          <h1 className="text-3xl sm:text-[40px] lg:text-[60px] font-bold mb-4">
            About this Authentication Practice App
          </h1>
          <br />
          <p className="mb-4 text-gray-300 text-[20px] lg:text-2xl">
            This is a small practice app that demonstrates JWT authentication
            with Passport on the backend and a minimal React + Tailwind
            frontend. It covers login with a local strategy, short-lived access
            tokens, refresh tokens persisted via Prisma, token rotation and
            revocation.
          </p>
          <br />
          <ul className="list-disc list-inside text-left text-gray-300 text-[20px] lg:text-2xl">
            <li>Local strategy for credential verification</li>
            <li>JWT access tokens (short-lived)</li>
            <li>
              Refresh tokens persisted in the database (rotatable & revocable)
            </li>
            <li>Prisma client used for DB access</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
