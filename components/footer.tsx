import { APP_NAME } from "@/lib/constants";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t" role="contentinfo">
      <div className="wrapper flex flex-col md:flex-row md:justify-between items-center gap-2 p-5 text-sm text-gray-700 text-center md:text-left">
        <div>
          &copy; {currentYear} {APP_NAME}. All rights reserved.
        </div>
        <div className="flex gap-4">
          <Link href="/" className="hover:underline">
            Privacy
          </Link>
          <Link href="/" className="hover:underline">
            Terms
          </Link>
          <Link href="/" className="hover:underline">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
