type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export default function PrimaryButton({ children, className = "", ...props }: Props) {
  return (
    <button className={`bg-blue-400 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200 cursor-pointer ${className}`} {...props}>
      {children}
    </button>
  );
}
