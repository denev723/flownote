import React, { forwardRef } from "react";
import clsx from "clsx";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, icon, error, className, ...props }, ref) => {
    return (
      <div>
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
        <input
          ref={ref}
          className={clsx(
            "input input-bordered w-full h-16 text-lg bg-white",
            "focus:outline-none focus:ring-2 focus:ring-blue-400",
            "shadow-sm px-5 rounded-lg",
            error && "border-red-500 focus:ring-red-400",
            className
          )}
          {...props}
        />
        {error && <p>{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
