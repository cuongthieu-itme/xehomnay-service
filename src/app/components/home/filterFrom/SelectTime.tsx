import { ActionIcon, rem } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { IconClock } from "@tabler/icons-react";
import React, { ReactNode, useRef, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  label?: ReactNode;
  value?: string;
  onChange?: (value: string) => void;
}

export default function SelectTime({ value, onChange, label }: Props) {
  const [localValue, setLocalValue] = useState(value || ""); // Local state for the value
  const ref = useRef<HTMLInputElement>(null);

  const isFutureTime = (time: string) => {
    // Convert the selected time (HH:mm) to a Date object
    const [hours, minutes] = time.split(":").map(Number);
    const selectedTime = new Date();
    selectedTime.setHours(hours, minutes, 0, 0);

    // Get the current time
    const currentTime = new Date();
    currentTime.setSeconds(0, 0); // Remove seconds and milliseconds

    // Compare the two times
    return selectedTime >= currentTime;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    if (isFutureTime(newValue)) {
      setLocalValue(newValue); // Update the local state
      onChange?.(newValue); // Trigger the parent's onChange handler
    } else {
      toast.error("Vui lòng chọn thời gian hiện tại hoặc thời gian trong tương lai.");
      setLocalValue(""); // Reset the local state to clear the input
    }
  };

  const pickerControl = (
    <ActionIcon
      variant="subtle"
      color="gray"
      onClick={() => ref.current?.showPicker()}
    >
      <IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
    </ActionIcon>
  );

  return (
    <TimeInput
      width="100%"
      className="custom"
      label={label || ""}
      ref={ref}
      rightSection={pickerControl}
      value={localValue}
      onChange={handleChange}
    />
  );
}
