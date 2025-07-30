import { today, tomorrow } from "@/const";
import { useAppContext } from "@/context/AppContext";
import { Box, Flex } from "@mantine/core";
import "dayjs/locale/vi";
import { DateInput, DateValue } from "@mantine/dates";

interface Props {
  placeholder?: string;
  value?: DateValue | Date;
  minDate?: Date;
  onChange?: (value: DateValue) => void;
}

export default function DatePicker() {
  const {
    state: { picupDate, returnDate },
    setPicupDate,
    setReturnDate,
  } = useAppContext();

  return (
    <Flex
      direction={{ base: "column", sm: "row" }}
      justify="center"
      gap={{ base: "sm", sm: "lg" }}
      align={{
        base: "stretch",
        sm: "flex-end",
      }}
      className="custom"
    >
      <Box>
        <PickupDate
          value={picupDate}
          onChange={(date) => setPicupDate(date)}
          placeholder="Thời gian bắt đầu"
          minDate={today}
        />
      </Box>

      <Box>
        <ReturnDate
          value={returnDate}
          onChange={setReturnDate}
          placeholder="Thời gian kết thúc"
          minDate={tomorrow}
        />
      </Box>
    </Flex>
  );
}

function PickupDate({ value, onChange, placeholder, minDate }: Props) {
  return (
    <DateInput
      locale="vi"
      valueFormat="DD/MM/YYYY"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      width="100%"
      minDate={minDate}
    />
  );
}

function ReturnDate({ value, onChange, placeholder, minDate }: Props) {
  return (
    <DateInput
      locale="vi"
      valueFormat="DD/MM/YYYY"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      width="100%"
    />
  );
}
