import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#f0ebe8] border-t border-none mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center mb-4 sm:mb-0 space-x-3">
            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">GPA</span>
            </div>
            <span className="text-xl font-semibold text-primary">GPAstic</span>
          </div>

          {/* Navigation Links */}
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium  text-muted-foreground sm:mb-0">
            <li>
              <Link
                href="/guide"
                className="hover:underline hover:text-primary me-4 md:me-6 transition-colors"
              >
                Guide
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:underline hover:text-primary me-4 md:me-6 transition-colors"
              >
                About
              </Link>
            </li>
          </ul>
        </div>

        <hr className="my-6 border sm:mx-auto lg:my-8" />

        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-muted-foreground sm:text-center">
            © {currentYear} GPAstic. All Rights Reserved.
          </span>
          <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
            <p className="text-sm  text-muted-foreground">
              Built by{" "}
              <a
                href="https://github.com/kkathriarachchie"
                className="hover:underline"
              >
                Kavishka Kathriarachchie
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
