import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex flex-col">
      {/* Navbar statis, tanpa logic client-side */}
      <nav className="py-2 px-6 w-full shadow-none fixed top-0 left-0 z-30 bg-white text-gray-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/">
            <h1 className="font-bold text-2xl text-[color:var(--custom-orange)]">
              Diary
              <span className="font-bold text-2xl text-gray-800">Food</span>
            </h1>
          </Link>
        </div>
      </nav>
      {/* Hero/404 content */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-purple-600 mb-8">404</h1>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            The page you&apos;re looking for seems to have vanished into thin
            air. Don&apos;t worry, let&apos;s get you back on track!
          </p>
          <Link
            href="/"
            className="inline-block bg-purple-600 text-white px-8 py-3 rounded-full hover:bg-purple-700 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Back to Home
          </Link>
          <div className="w-24 h-24 mx-auto border-4 border-purple-200 rounded-full animate-spin border-t-purple-600 mt-12"></div>
        </div>
      </div>
    </div>
  );
}
