export default function ComingSoon() {
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

        {/* Brand name with elegant styling */}
        <h1
          className="text-5xl font-serif font-bold mb-2"
          style={{ color: "#718f43" }}
        >
          Olivine
        </h1>
        <p
          className="text-sm tracking-widest mb-10 uppercase flex items-center justify-center"
          style={{ color: "#9cb17b" }}
        >
          <svg
            className="w-4 h-4 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
          </svg>
          Fashion Boutique
        </p>

        {/* Decorative divider with icon */}
        <div className="flex items-center justify-center mb-8">
          <div
            className="w-10 h-px"
            style={{ backgroundColor: "#c6d2b4" }}
          ></div>
          <svg
            className="w-5 h-5 mx-2"
            style={{ color: "#c6d2b4" }}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <circle cx="12" cy="12" r="10" />
          </svg>
          <div
            className="w-10 h-px"
            style={{ backgroundColor: "#c6d2b4" }}
          ></div>
        </div>

        {/* Main message */}
        <h2 className="text-2xl font-light mb-6 text-gray-700 flex items-center justify-center">
          <svg
            className="w-6 h-6 mr-2"
            style={{ color: "#9cb17b" }}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
          Our New Collection is Arriving Soon
        </h2>
        <p className="text-gray-600 mb-10 leading-relaxed">
          {
            "We're putting the finishing touches on our exclusive new collection. Sign up below to be the first to know when we launch."
          }
        </p>

        {/* Email signup form */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row gap-3 max-w-xs mx-auto">
            <div className="relative flex-grow">
              <svg
                className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <input
                type="email"
                placeholder="Your email address"
                className="w-full pl-10 pr-4 py-3 rounded-sm border border-[#dce3d0] focus:outline-none focus:ring-1 focus:ring-[#9cb17b] text-sm"
              />
            </div>
            <button
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
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22,2 15,22 11,13 2,9" />
              </svg>
              Notify Me
            </button>
          </div>
        </div>

        {/* Social links with icons */}
        <div className="flex justify-center space-x-6 mb-12">
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
                className="w-5 h-5 mb-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d={platform.icon} />
              </svg>
              <span className="text-xs">{platform.name}</span>
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-500 flex items-center justify-center">
          <svg
            className="w-3 h-3 mr-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M14.8 16.7c-.5.5-1.2.8-2 .8-1.3 0-2.3-1-2.3-2.3s1-2.3 2.3-2.3c.8 0 1.5.3 2 .8M14 12h-4" />
          </svg>
          © {new Date().getFullYear()} Olivine Fashion Boutique. All rights
          reserved.
        </p>
      </div>
    </div>
  );
}
