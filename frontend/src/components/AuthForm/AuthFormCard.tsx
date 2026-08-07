import { ReactNode } from "react";

interface AuthFormCardProps {
  title: string;
  subtitle: string;
  info_text? : string;
  children: ReactNode;
}

const AuthFormCard = ({
  title,
  subtitle,
  info_text,
  children,
}: AuthFormCardProps) => {
  return (
    <div className="mx-auto flex w-full max-w-[542px] flex-col items-center rounded-xl border border-gray-300 bg-white px-5 py-5 sm:px-8 sm:py-10">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">
          {title}
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          {subtitle}
        </p>
        <p className="mt-1 text-sm text-gray-500">
          {info_text}
        </p>
      </div>

      {children}
    </div>
  );
};

export default AuthFormCard;