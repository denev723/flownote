import { forwardRef } from "react";
import clsx from "clsx";

type Option = {
  label: string;
  value: string;
};

export type CheckboxGroupProps = Omit<
  React.FieldsetHTMLAttributes<HTMLFieldSetElement>,
  "onChange"
> & {
  label?: React.ReactNode;
  icon?: React.ReactNode;
  options: Option[];
  name: string;
  values?: string[];
  onChange?: (values: string[]) => void;
  error?: string;
  columns?: 1 | 2 | 3 | 4;
  defaultValues?: string[];
};

const CheckboxGroup = forwardRef<HTMLFieldSetElement, CheckboxGroupProps>(
  (
    {
      label,
      icon,
      options,
      name,
      values = [],
      onChange,
      error,
      columns = 4,
      className,
      defaultValues = [],
      ...props
    },
    ref
  ) => {
    const handleChange = (value: string, checked: boolean) => {
      if (!onChange) return;

      if (checked) {
        onChange([...values, value]);
      } else {
        onChange(values.filter((v) => v !== value));
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
          {options.map((option, idx) => {
            const id = `${name}-${idx + 1}`;
            const isChecked = values.includes(option.value);
            const isDefaultChecked = defaultValues.includes(option.value);

            return (
              <label
                key={idx}
                htmlFor={id}
                className={clsx(
                  "flex items-center justify-center h-16 px-4 rounded-lg border-2 border-blue-200",
                  "cursor-pointer transition-all duration-200",
                  "hover:bg-blue-100 hover:border-blue-300",
                  "has-[:checked]:bg-blue-400 has-[:checked]:text-white has-[:checked]:border-blue-400"
                )}
              >
                <input
                  type="checkbox"
                  name={name}
                  id={id}
                  value={option.value}
                  checked={isChecked}
                  defaultChecked={isDefaultChecked}
                  onChange={(e) => handleChange(option.value, e.target.checked)}
                  className="sr-only"
                />
                <span className="text-lg font-medium">{option.label}</span>
              </label>
            );
          })}
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </fieldset>
    );
  }
);

CheckboxGroup.displayName = "CheckboxGroup";
export default CheckboxGroup;
