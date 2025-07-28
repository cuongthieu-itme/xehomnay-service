import { getAllCountriesAsync } from "@/actions/actions";
import { useQuery } from "@tanstack/react-query";

export function useCountries() {
  const {
    data: countries,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["countries"],
    queryFn: () => getAllCountriesAsync(),
  });
  return { countries, isLoading, error };
}
