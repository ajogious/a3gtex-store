import { ShoppingCart, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";
import ModeToggle from "./mode-toggle";

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex-between">
        {/* Left: Logo + Name */}
        <div className="flex-start">
          <Link href="/" className="flex-start">
            <Image
              src="/images/logo.svg"
              alt={`${APP_NAME} logo`}
              height={30}
              width={30}
              priority={true}
            />
            {/* Hide brand name on small screens */}
            <span className="hidden md:block font-bold text-xl lg:text-2xl ml-1">
              {APP_NAME}
            </span>
          </Link>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center space-x-2">
          <ModeToggle />

          {/* Cart button: show icon only on mobile */}
          <Button asChild variant="ghost" className="p-2 sm:px-4">
            <Link href="/cart" className="flex items-center gap-1">
              <ShoppingCart className="h-5 w-5" />
              <span className="hidden sm:inline">Cart</span>
            </Link>
          </Button>

          {/* Sign in button: full width text on md+, icon-only on mobile */}
          <Button asChild className="p-2 sm:px-4">
            <Link href="/sign-in" className="flex items-center gap-1">
              <UserIcon className="h-5 w-5" />
              <span className="hidden sm:inline">Sign In</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
