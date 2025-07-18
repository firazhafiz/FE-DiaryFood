import Link from "next/link";
import { terms } from "@/data/terms";

export default function TermsConditions() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar statis */}
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
      <main className="bg-gray-100 flex-1 w-full pt-[115px] pb-16 px-2 mt-6">
        <div className="w-full max-w-4xl mx-auto backdrop-blur-sm rounded-lg">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-[color:var(--custom-orange)]">
            Terms & Conditions
          </h1>
          <p className="text-center text-gray-500 mb-8 text-sm max-w-xl mx-auto">
            The following terms and conditions apply to all services, features,
            and content available on the DiaryFood website.
          </p>
          <div className="space-y-8">
            {terms.map((section, idx) => (
              <section key={idx}>
                <h2 className="font-bold text-lg mb-2 text-gray-900">
                  {section.title}
                </h2>
                <div className="text-gray-700 text-sm leading-relaxed">
                  {section.content}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      {/* Footer statis */}
      <footer className="bg-white text-gray-600 py-6 text-center border-t mt-8">
        &copy; {new Date().getFullYear()} Diary Food. All rights reserved.
      </footer>
    </div>
  );
}
