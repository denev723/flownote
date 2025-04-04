import { forwardRef } from "react";
import Input, { InputProps } from "./Input";

export type DateTimeInputProps = Omit<InputProps, "type"> & {
  defaultNow?: boolean;
};

const DateTimeInput = forwardRef<HTMLInputElement, DateTimeInputProps>(
  ({ defaultNow = false, ...props }, ref) => {
    const getNowDateTimeString = () => {
      const now = new Date();
      now.setMinutes(now.getMinutes() - now.getTimezoneOffset()); // 시간 보정
      return now.toISOString().slice(0, 16); // YYYY-MM-DDTHH:mm 형식
    };

    return (
      <Input
        ref={ref}
        type="datetime-local"
        defaultValue={defaultNow ? getNowDateTimeString() : props.defaultValue}
        {...props}
      />
    );
  }
);

DateTimeInput.displayName = "DateTimeInput";

export default DateTimeInput;
