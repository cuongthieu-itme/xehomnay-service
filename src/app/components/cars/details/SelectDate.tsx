import { DateInput, DateValue } from "@mantine/dates";
import { ReactNode } from "react";

interface Props {
  label?: ReactNode;
  value?: DateValue | Date;
  minDate?: Date;
  onChange?: (value: DateValue | Date) => void;
}
export function SelectDate({ label, value, onChange, minDate }: Props) {
  return (
    <DateInput
      value={value}
      onChange={onChange}
      label={label}
      placeholder="Select Date"
      width="100%"
      minDate={minDate}
    />
  );
}
