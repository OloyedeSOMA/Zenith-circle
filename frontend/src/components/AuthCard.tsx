import Image from "next/image";
import { ReactNode } from "react";

import AuthImage from "../../public/auth-image.png";

interface AuthCardProps {
  children: ReactNode;
}

const AuthCard = ({ children }: AuthCardProps) => {
  return (
    <div className="mx-auto w-full min-h-screen flex flex-wrap justify-between">
      
      <div className="relative hidden overflow-hidden lg:block md:w-[45%] max-w-[696px]">
        <Image
          src={AuthImage}
          alt="Authentication Illustration"
          fill
          sizes="(min-width: 768px) 542px, 0px"
          className="object-cover"
          priority
        />
      </div>

      <div className="flex w-full items-center justify-center px-4 py-8 sm:px-6 lg:w-[45%] lg:px-10">
        {children}
      </div>
    </div>
  );
};

export default AuthCard;