import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#f0ebe8] border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center mb-4 sm:mb-0 space-x-3">
            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">GPA</span>
            </div>
            <span className="text-xl font-semibold text-primary">
              GPA Calculator
            </span>
          </div>

          {/* Navigation Links */}
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0">
            <li>
              <Link
                href="/about"
                className="hover:underline hover:text-blue-600 me-4 md:me-6 transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="hover:underline hover:text-blue-600 me-4 md:me-6 transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/help"
                className="hover:underline hover:text-blue-600 me-4 md:me-6 transition-colors"
              >
                Help
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:underline hover:text-blue-600 transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />

        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center">
            © {currentYear} GPA Calculator. All Rights Reserved.
          </span>
          <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
            <p className="text-sm text-gray-500">
              Built with Next.js & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
