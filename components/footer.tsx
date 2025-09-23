import { APP_NAME } from "@/lib/constants";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t" role="contentinfo">
      <div className="p-5 flex flex-col items-center gap-2 text-sm text-gray-700">
        <div>
          &copy; {currentYear} {APP_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
