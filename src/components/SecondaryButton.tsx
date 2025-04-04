import clsx from "clsx";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export default function SecondaryButton({ children, className = "", ...props }: Props) {
  return (
    <button
      className={clsx(
        "border-2 border-gray-300 text-gray-500 font-semibold py-3 px-6 rounded-md",
        "transition-all duration-200 cursor-pointer",
        "hover:bg-gray-100 hover:border-gray-400 hover:text-gray-700",
        "active:bg-gray-200",
        "shadow-sm hover:shadow",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
