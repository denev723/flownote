import React, { forwardRef, useState } from "react";
import clsx from "clsx";
import { FaUpload, FaFile } from "react-icons/fa";

export type InputFileProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
  accept?: string;
  buttonText?: string;
};

const InputFile = forwardRef<HTMLInputElement, InputFileProps>(
  (
    {
      label,
      icon,
      error,
      className,
      accept = "image/*",
      buttonText = "파일 선택",
      onChange,
      ...props
    },
    ref
  ) => {
    const [fileName, setFileName] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setFileName(file.name);
      }
      if (onChange) {
        onChange(e);
      }
    };

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
            {icon || <FaFile />}
            <span>{label}</span>
          </label>
        )}
        <div className="relative">
          <label
            className={clsx(
              "flex items-center justify-center gap-2 w-full h-16 px-5 text-lg bg-white",
              "border border-gray-300 rounded-lg cursor-pointer",
              "hover:bg-gray-50 hover:border-blue-400",
              "focus:outline-none focus:ring-2 focus:ring-blue-400",
              "shadow-sm",
              error && "border-red-500 focus:ring-red-400",
              className
            )}
          >
            <FaUpload className="text-blue-500" />
            <span>{buttonText}</span>
            <input
              ref={ref}
              type="file"
              accept={accept}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleChange}
              {...props}
            />
          </label>
          {fileName && (
            <div className="mt-2 text-sm text-gray-600 bg-gray-100 p-2 rounded-md truncate">
              선택된 파일: {fileName}
            </div>
          )}
        </div>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

InputFile.displayName = "InputFile";

export default InputFile;
