import clsx from "clsx";
import { forwardRef } from "react";

type Option = {
  label: string;
  value: string;
};

export type RadioGroupProps = Omit<
  React.FieldsetHTMLAttributes<HTMLFieldSetElement>,
  "onChange"
> & {
  label?: React.ReactNode;
  icon?: React.ReactNode;
  options: Option[];
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  columns?: 1 | 2 | 3 | 4;
  defaultValue?: string;
};

const RadioGroup = forwardRef<HTMLFieldSetElement, RadioGroupProps>(
  (
    { label, icon, options, name, value, onChange, error, columns = 4, className, ...props },
    ref
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e.target.value);
      }
    };

    return (
      <fieldset ref={ref} className={clsx("space-y-3", className)} {...props}>
        {label && (
          <legend
            className={clsx(
              "flex items-center gap-2 text-lg font-semibold text-blue-600 mb-3",
              error && "text-red-600"
            )}
          >
            {icon && icon}
            <span>{label}</span>
          </legend>
        )}
        <div
          className={clsx("grid gap-6", {
            "grid-cols-1": columns === 1,
            "grid-cols-2": columns === 2,
            "grid-cols-3": columns === 3,
            "grid-cols-2 md:grid-cols-4": columns === 4,
          })}
        >
          {options.map((option, idx) => (
            <label
              key={idx}
              htmlFor={`${name}-${idx + 1}`}
              className={clsx(
                "flex items-center justify-center h-16 px-4 rounded-lg border-2 border-blue-200",
                "cursor-pointer transition-all duration-200",
                "hover:bg-blue-100 hover:border-blue-300",
                "has-[:checked]:bg-blue-400 has-[:checked]:text-white has-[:checked]:border-blue-400"
              )}
            >
              <input
                type="radio"
                name={name}
                id={`${name}-${idx + 1}`}
                value={option.value}
                {...(value !== undefined
                  ? { checked: value === option.value }
                  : { defaultChecked: option.value === props.defaultValue })}
                onChange={handleChange}
                className="sr-only"
              />
              <span className="text-lg font-medium">{option.label}</span>
            </label>
          ))}
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </fieldset>
    );
  }
);

RadioGroup.displayName = "RadioGroup";

export default RadioGroup;
