import { getAllRegionsAsync } from "@/actions/actions";
import { useQuery } from "@tanstack/react-query";

export function useRegions(countryId?: string) {
  const {
    data: regions,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["regions", countryId],
    queryFn: () => getAllRegionsAsync(countryId),
  });
  return { regions, isLoading, error };
}
