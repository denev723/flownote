import clsx from "clsx";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export default function PrimaryButton({ children, className = "", ...props }: Props) {
  return (
    <button
      className={clsx(
        "bg-blue-400 text-white font-semibold py-3 px-6 rounded-md",
        "transition-all duration-200 cursor-pointer",
        "hover:bg-blue-500 hover:text-white",
        "active:bg-blue-600",
        "shadow-sm hover:shadow",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
