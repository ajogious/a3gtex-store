"use client";

import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import { useRouter } from "next/navigation";

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="flex flex-col items-center justify-center w-full max-w-sm p-6 rounded-2xl shadow-lg text-center bg-white overflow-auto">
        <Image
          src="/images/logo.svg"
          width={56}
          height={56}
          alt={`${APP_NAME} logo`}
          priority={true}
          className="mb-6"
        />
        <h1 className="text-2xl sm:text-3xl font-bold mb-3">Not Found</h1>
        <p className="text-sm sm:text-base text-destructive mb-6 break-words">
          Could not find the requested page.
        </p>
        <Button
          variant="outline"
          className="w-full sm:w-auto"
          onClick={() => router.push("/")}
        >
          Back To Home
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
