"use client";
import { optionsFilter } from "@/functions";
import { Select } from "@mantine/core";
import { ReactNode, useEffect } from "react";

const carTypes = [
  { label: "Any", value: "Any" },
  { label: "Sedan", value: "Sedan" },
  { label: "Sedan sang trọng", value: "Luxury Sedan" },
  { label: "Sedan điện", value: "Electric Sedan" },
  { label: "SUV", value: "SUV" },
  { label: "Off-Road SUV", value: "Off-Road SUV" },
  { label: "Convertible", value: "Convertible" },
  { label: "Hatchback", value: "Hatchback" },
  { label: "Xe thể thao", value: "Sports Car" },
  { label: "Van", value: "Van" },
  { label: "Bus", value: "Bus" },
  { label: "Truck", value: "Truck" },
  { label: "Xe nhỏ gọn", value: "Compact" },
  { label: "Coupe", value: "Coupe" },
  { label: "Wagon", value: "Wagon" },
  { label: "Pick-Up", value: "Pick-Up" },
];

interface Props {
  label?: ReactNode;
  value?: string;
  onChange?: (value: string | null) => void;
  addAny?: boolean;
  required?: boolean;
}

export const SelectCarType = ({
  label,
  value,
  onChange,
  addAny,
  required = false,
}: Props) => {
  useEffect(() => {
    if (!addAny) {
      carTypes.filter((item) => item.value.toLowerCase() !== "any");
    }
  }, [addAny]);
  return (
    <Select
      width="100%"
      label={label || "Loại xe"}
      placeholder="Loại xe"
      data={carTypes}
      value={value}
      defaultValue={"Any"}
      onChange={onChange}
      maxDropdownHeight={280}
      required={required}
      nothingFoundMessage="Không tìm thấy"
      filter={optionsFilter}
    />
  );
};
