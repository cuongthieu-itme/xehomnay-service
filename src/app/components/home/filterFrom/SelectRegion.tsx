import { optionsFilter } from "@/functions";
import { useRegions } from "@/hooks/useRegions";
import { Select } from "@mantine/core";
import { RegionGetAllType } from "../../../../../types";
interface Props {
  value?: string;
  countryId?: string;
  onChange?: (value: string) => void;
}

export default function SelectRegion({
  value,
  countryId,
  onChange,
  ...rest
}: Props) {
  const { regions, isLoading } = useRegions(countryId);
  return (
    <Select
      className="custom"
      placeholder="Khu vực"
      {...rest}
      data={
        regions
          ? regions?.map((region: RegionGetAllType) => ({
              value: region?.id as string,
              label: region?.name as string,
            }))
          : []
      }
      searchable
      nothingFoundMessage="No city found"
      value={value}
      onChange={(value) => onChange && onChange(value || "")}
      filter={optionsFilter}
      maxDropdownHeight={280}
      disabled={`${!countryId}` === "true" || isLoading}
    />
  );
}
