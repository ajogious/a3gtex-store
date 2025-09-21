import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-white to-[#f8f9fa]">
      <div className="max-w-md w-full text-center">
        {/* Brand logo with icon */}
        <div className="flex justify-center mb-2">
          <svg
            className="w-12 h-12"
            style={{ color: "#718f43" }}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>

        {/* Brand name */}
        <h1
          className="text-4xl font-serif font-bold mb-2"
          style={{ color: "#718f43" }}
        >
          Olivine
        </h1>
        <p
          className="text-xs tracking-widest mb-8 uppercase"
          style={{ color: "#9cb17b" }}
        >
          Fashion Boutique
        </p>

        {/* 404 graphic */}
        <div className="relative my-10">
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-40 h-40 opacity-10"
              style={{ color: "#718f43" }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            </svg>
          </div>
          <div className="relative">
            <div
              className="text-9xl font-serif font-bold"
              style={{ color: "#c6d2b4" }}
            >
              404
            </div>
            <div className="text-lg font-light mt-2 text-gray-600">
              Page Not Found
            </div>
          </div>
        </div>

        {/* Message */}
        <p className="text-gray-600 mb-8 leading-relaxed">
          Oops! The page you are looking for seems to have gone on a little
          adventure. Do not worry, our style experts can help you find your way
          back.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <Link
            href="/"
            className="px-5 py-3 rounded-sm text-sm font-medium text-white hover:opacity-90 transition-opacity flex items-center justify-center"
            style={{ backgroundColor: "#718f43" }}
          >
            <svg
              className="w-4 h-4 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Return Home
          </Link>
          <a
            href="/contact"
            className="px-5 py-3 rounded-sm text-sm font-medium border hover:bg-gray-50 transition-colors flex items-center justify-center"
            style={{ borderColor: "#dce3d0", color: "#718f43" }}
          >
            <svg
              className="w-4 h-4 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Contact Us
          </a>
        </div>

        {/* Continue shopping link */}
        <div className="mb-12">
          <a
            href="/collections"
            className="text-sm inline-flex items-center hover:underline"
            style={{ color: "#9cb17b" }}
          >
            <svg
              className="w-4 h-4 mr-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            Continue shopping
          </a>
        </div>

        {/* Social links */}
        <div className="flex justify-center space-x-6 mb-8">
          {[
            {
              name: "Instagram",
              icon: "M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5zm0 18H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3zm-5-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0-4a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm3.5 1h.5",
            },
            {
              name: "Facebook",
              icon: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
            },
            {
              name: "Pinterest",
              icon: "M12 2a10 10 0 0 0-1.5 19.8c-.1-.6-.2-1.6 0-2.4l1.1-4.7s-.3-.6-.3-1.5c0-1.4.8-2.5 1.8-2.5.9 0 1.3.6 1.3 1.4 0 .9-.6 2.3-.9 3.6-.3 1.1.5 2 1.6 2 1.9 0 3.3-2 3.3-5 0-2.6-1.9-4.4-4.6-4.4-3.1 0-4.9 2.3-4.9 4.7 0 .9.3 1.5.8 2 0 .2.1.4.1.5 0 .2-.2.6-.2.7-.1.2-.2.3-.4.2-1.3-.6-2.1-2.5-2.1-4.1 0-3.3 2.4-6.3 6.9-6.3 3.6 0 6.4 2.6 6.4 6.1 0 3.6-2.3 6.5-5.5 6.5-1.1 0-2.1-.6-2.4-1.2l-.7 2.6c-.2.9-.8 2.1-1.2 2.8A10 10 0 1 0 12 2z",
            },
          ].map((platform) => (
            <a
              key={platform.name}
              href="#"
              className="text-gray-500 hover:text-gray-700 transition-colors flex flex-col items-center"
              aria-label={platform.name}
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d={platform.icon} />
              </svg>
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} Olivine Fashion Boutique. All rights
          reserved.
        </p>
      </div>
    </div>
  );
}
