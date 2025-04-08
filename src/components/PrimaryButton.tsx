import clsx from "clsx";
import { FaSpinner } from "react-icons/fa";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  isLoading?: boolean;
};

export default function PrimaryButton({ children, className = "", isLoading, ...props }: Props) {
  return (
    <button
      className={clsx(
        "bg-blue-400 text-white font-semibold py-3 px-6 rounded-md",
        "transition-all duration-200",
        isLoading ? "opacity-80 cursor-not-allowed" : "cursor-pointer hover:bg-blue-500",
        "active:bg-blue-600",
        "shadow-sm hover:shadow",
        "flex items-center justify-center",
        className
      )}
      {...props}
    >
      {isLoading && <FaSpinner className="animate-spin mr-2" />}
      {children}
    </button>
  );
}
