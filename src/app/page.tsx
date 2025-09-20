export default function ComingSoon() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-white to-[#f8f9f6]">
      <div className="max-w-md w-full text-center">
        {/* Brand name with elegant styling */}
        <h1
          className="text-5xl font-serif font-bold mb-2"
          style={{ color: "#718f43" }}
        >
          Olivine
        </h1>
        <p
          className="text-sm tracking-widest mb-10 uppercase"
          style={{ color: "#9cb17b" }}
        >
          Fashion Boutique
        </p>

        {/* Decorative divider */}
        <div
          className="w-16 h-0.5 mx-auto mb-8"
          style={{ backgroundColor: "#c6d2b4" }}
        ></div>

        {/* Main message */}
        <h2 className="text-2xl font-light mb-6 text-gray-700">
          Our New Collection is Arriving Soon
        </h2>
        <p className="text-gray-600 mb-10 leading-relaxed">
          We're putting the finishing touches on our exclusive new collection.
          Sign up below to be the first to know when we launch.
        </p>

        {/* Email signup form */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row gap-3 max-w-xs mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-sm border focus:outline-none focus:ring-1 text-sm"
              style={{ borderColor: "#dce3d0", focusRingColor: "#9cb17b" }}
            />
            <button
              className="px-5 py-3 rounded-sm text-sm font-medium text-white hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#718f43" }}
            >
              Notify Me
            </button>
          </div>
        </div>

        {/* Social links */}
        <div className="flex justify-center space-x-6 mb-12">
          {["Instagram", "Facebook", "Pinterest"].map((platform) => (
            <a
              key={platform}
              href="#"
              className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
            >
              {platform}
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
