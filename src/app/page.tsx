export default function ComingSoon() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100 px-4">
      <h1 className="text-4xl font-bold mb-4">🛍️ MyShop</h1>
      <p className="text-lg text-gray-600 mb-6">
        We’re working hard to launch soon. Stay tuned!
      </p>
      <p className="text-sm text-gray-500">
        © {new Date().getFullYear()} MyShop
      </p>
    </div>
  );
}
