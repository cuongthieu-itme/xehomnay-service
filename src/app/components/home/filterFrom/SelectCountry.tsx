import { optionsFilter } from "@/functions";
import { useCountries } from "@/hooks/useCountries";
import { Select } from "@mantine/core";
import { CountryGetAllType } from "../../../../../types";

interface Props {
  value?: string;
  onChange?: (value: string) => void;
}

export default function SelectCountry({ value, onChange }: Props) {
  const { countries, isLoading } = useCountries();

  return (
    <Select
      className="custom"
      placeholder="Quốc gia"
      searchable
      nothingFoundMessage="Không tìm thấy quốc gia"
      data={
        countries
          ? countries?.map((country: CountryGetAllType) => ({
              value: country.id as string,
              label: country.name as string,
            }))
          : []
      }
      value={value}
      onChange={(value) => onChange && onChange(value || "")}
      disabled={countries?.length === 0 || isLoading}
      filter={optionsFilter}
    />
  );
}
