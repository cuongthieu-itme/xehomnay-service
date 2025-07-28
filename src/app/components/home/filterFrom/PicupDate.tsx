import { DateInput, DateValue } from "@mantine/dates";
import dayjs from "dayjs";
interface props {
  palceholder?: string;
  value?: DateValue | Date;
  onChange?: (value: DateValue) => void;
  minDate?: Date;
  maxDate?: Date;
}
export default function PicupDate({
  value,
  onChange,
  palceholder,
  minDate,
}: props) {
  return (
    <div>
      <DateInput
        value={value}
        onChange={onChange}
        placeholder={palceholder}
        minDate={new Date() || minDate}
        maxDate={dayjs(new Date()).add(1, "month").toDate()}
        width="100%"
      />
    </div>
  );
}
