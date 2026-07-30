import Image from "next/image";
import Logo from "../../public/loading.png";

const LoadingSplash = () => {
  return (
    <div
      className="flex min-h-screen w-full items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <div className="animate-pulse">
        <Image src={Logo} alt="OpportunityHub NG" priority className="h-auto w-[220px]" />
      </div>
    </div>
  );
};

export default LoadingSplash;