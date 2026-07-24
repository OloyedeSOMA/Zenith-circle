import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?:
    | "primary"
    | "secondary"
    | "accent"
    | "success"
    | "error"
    | "muted"
    | "danger"
    | "disabled";
  className?: string;
}

const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) => {
  const variants = {
    primary:
      "bg-primary text-white hover:opacity-90 disabled:bg-disabled disabled:text-gray-500 disabled:opacity-100 disabled:cursor-not-allowed disabled:hover:opacity-100",
    
      secondary:
      "bg-secondary text-white hover:opacity-90 disabled:bg-disabled disabled:text-gray-500 disabled:opacity-100 disabled:cursor-not-allowed disabled:hover:opacity-100",
    accent:
      "bg-accent text-white hover:opacity-90 disabled:bg-disabled disabled:text-gray-500 disabled:opacity-100 disabled:cursor-not-allowed disabled:hover:opacity-100",
    success:
      "bg-success text-white hover:opacity-90 disabled:bg-disabled disabled:text-gray-500 disabled:opacity-100 disabled:cursor-not-allowed disabled:hover:opacity-100",
    error: "bg-error text-white hover:opacity-90",
    danger:"bg-error text-white hover:opacity-90 disabled:bg-disabled disabled:opacity-100 disabled:cursor-not-allowed disabled:hover:opacity-100",
    muted: "bg-disabled text-gray-700 hover:opacity-90",
    disabled: "bg-disabled text-gray-500 cursor-not-allowed",
  };

  return (
    <button
      className={`${variants[variant]} rounded-lg transition-all duration-200 cursor-pointer ${className}`}
      disabled={variant === "disabled" || props.disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;