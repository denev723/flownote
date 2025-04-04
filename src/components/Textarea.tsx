import { forwardRef } from "react";
import clsx from "clsx";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: React.ReactNode;
  icon?: React.ReactNode;
  error?: string;
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, icon, error, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={props.id}
            className={clsx(
              "flex items-center gap-2 text-lg font-semibold text-blue-600 mb-2",
              error && "text-red-600"
            )}
          >
            {icon && icon}
            <span>{label}</span>
          </label>
        )}
        <textarea
          ref={ref}
          className={clsx(
            "w-full h-24 text-lg bg-white",
            "p-3 border rounded resize-none",
            "focus:outline-none focus:ring-2 focus:ring-blue-400",
            "shadow-sm px-5 rounded-lg",
            error && "border-red-500 focus:ring-red-400",
            className
          )}
          {...props}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
