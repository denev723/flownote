import { forwardRef } from "react";
import clsx from "clsx";

export type CheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: React.ReactNode;
  error?: string;
};

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="flex items-center">
        <div className="relative flex items-center">
          <input
            type="checkbox"
            ref={ref}
            className={clsx(
              "w-5 h-5 rounded border-2 border-blue-400 text-blue-500",
              "focus:ring-2 focus:ring-blue-400 focus:ring-offset-2",
              error && "border-red-500",
              className
            )}
            {...props}
          />
          <label
            htmlFor={props.id}
            className={clsx("ml-3 text-lg cursor-pointer", error && "text-red-600")}
          >
            {label}
          </label>
        </div>
        {error && <p className="text-red-500 text-sm ml-2">{error}</p>}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
