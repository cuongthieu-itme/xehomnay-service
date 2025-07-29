import { optionsFilter } from "@/functions";
import { carMakes } from "@/lib/data";
import { Select } from "@mantine/core";
import { ReactNode, useEffect } from "react";

interface Props {
  label?: ReactNode;
  value?: string;
  onChange?: (value: string) => void;
  addAll?: boolean;
  required?: boolean;
}

export function SelectCarMake({
  label,
  value,
  onChange,
  addAll,
  required,
}: Props) {
  useEffect(() => {
    if (addAll && !carMakes.some((make) => make.value === "all")) {
      carMakes.unshift({ label: "All", value: "all" });
    }
  }, [addAll]);

  return (
    <Select
      width="100%"
      className="custom"
      label={label || ""}
      placeholder="Hãng xe"
      data={carMakes.map((make) => ({ label: make.label, value: make.value }))}
      value={value}
      onChange={
        onChange ? (value) => value !== null && onChange(value) : undefined
      }
      searchable
      maxDropdownHeight={280}
      nothingFoundMessage="Không tìm thấy"
      filter={optionsFilter}
      required={required}
    />
  );
}
