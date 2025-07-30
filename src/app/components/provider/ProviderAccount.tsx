import { primaryGradient } from "@/const";
import { useCountries } from "@/hooks/useCountries";
import {
  Box,
  Button,
  Divider,
  Flex,
  Group,
  Input,
  Space,
  Text,
  Title,
} from "@mantine/core";
import { ArrowRight } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import {
  CountryGetAllType,
  CurrentMode,
  IReqProviderProps,
} from "../../../../types";
import SelectCountry from "../home/filterFrom/SelectCountry";
import SelectRegion from "../home/filterFrom/SelectRegion";
import ProfilePhoto from "../shared/ProfilePhoto";
interface Props {
  mode?: CurrentMode;
  next?: () => void;
  companyDetails: Partial<IReqProviderProps>;
  setCompanyDetails: Dispatch<SetStateAction<Partial<IReqProviderProps>>>;
}

export default function ProviderCompanyDetails({
  mode,
  companyDetails,
  next,
  setCompanyDetails,
}: Props) {
  const [isNext, setIsNext] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<
    CountryGetAllType | undefined
  >(undefined);
  const { countries } = useCountries();
  const updateDetails = (key: keyof IReqProviderProps, value: string) => {
    setCompanyDetails((prev) => ({ ...prev, [key]: value }));
  };
  const isEditMode = mode != null && mode === "edit";
  const handleNext = () => {
    const {
      companyName,
      businessRegistrationNumber,
      contactName,
      phone,
      country_id,
      region_id,
      city,
    } = companyDetails;

    if (
      companyName?.trim() !== "" &&
      businessRegistrationNumber?.trim() !== "" &&
      contactName?.trim() !== "" &&
      phone?.trim() !== "" &&
      country_id !== -1 &&
      region_id !== -1 &&
      city?.trim() !== ""
    ) {
      next?.();
    } else {
      setIsNext(true);
    }
  };
  const updateAvatar = async (url: string) => {
    updateDetails("avatar", url);
  };
  return (
    <Flex gap="4rem">
      <Box style={{ flexGrow: 1 }}>
        <Title className="text-center">
          {isEditMode && "Edit"} Provider Company Details
        </Title>
        <ProfilePhoto
          profileUrl={companyDetails.avatar || companyDetails.image}
          updateProfile={updateAvatar}
        />
        <Space mt="lg" />
        <Group grow>
          <Box my="sm">
            <Input.Label htmlFor="companyName">
              Company Name
              <span style={{ color: "red" }}>*</span>
            </Input.Label>
            <Input
              type="text"
              id="companyName"
              required
              placeholder="Tên công ty"
              value={companyDetails.companyName}
              onChange={(e) =>
                updateDetails("companyName", e.currentTarget.value)
              }
            />
            {isNext && !companyDetails.companyName && (
              <Input.Error>Company Name is Require</Input.Error>
            )}
          </Box>
          <Box my="sm">
            <Input.Label htmlFor="businessReg">
              Business Registration Number
              <span style={{ color: "red" }}>*</span>
            </Input.Label>
            <Input
              type="text"
              id="businessReg"
              required
              placeholder="Mã số doanh nghiệp"
              value={companyDetails.businessReg}
              onChange={(e) =>
                updateDetails("businessReg", e.currentTarget.value)
              }
            />
            {isNext && !companyDetails.businessReg && (
              <Input.Error>Business Registration Number is Require</Input.Error>
            )}
          </Box>
        </Group>
        <Group grow>
          <Box my="sm">
            <Input.Label htmlFor="contactName">
              Contact Name
              <span style={{ color: "red" }}>*</span>
            </Input.Label>
            <Input
              type="text"
              id="contactName"
              required
              placeholder="Tên người liên hệ"
              value={companyDetails.contactName}
              onChange={(e) =>
                updateDetails("contactName", e.currentTarget.value)
              }
            />
            {isNext && !companyDetails.contactName && (
              <Input.Error>Contact Name is Require</Input.Error>
            )}
          </Box>
          <Box my="sm">
            <Input.Label htmlFor="contactPhone">
              Phone
              <span style={{ color: "red" }}>*</span>
            </Input.Label>
            <Input
              type="text"
              id="contactPhone"
              required
              placeholder="Phone"
              value={companyDetails.contactPhone}
              onChange={(e) =>
                updateDetails("contactPhone", e.currentTarget.value)
              }
            />
            {isNext && !companyDetails.contactPhone && (
              <Input.Error>Phone is Require</Input.Error>
            )}
          </Box>
        </Group>
        <Box my="lg">
          <Divider my="xs" label={<Title order={4}>Company Location</Title>} />
          <Group grow>
            <Box my="sm">
              <Input.Label>
                Country
                <span style={{ color: "red" }}>*</span>
              </Input.Label>
              <SelectCountry
                value={
                  companyDetails.country_id?.toString() ||
                  companyDetails.country?.id?.toString()
                }
                onChange={(value) => {
                  updateDetails("country_id", value);
                  setSelectedCountry(
                    countries?.filter((country) => country.id === value)[0]
                  );
                }}
              />
              {isNext && Number(companyDetails.country_id) === -1 && (
                <Input.Error>Quốc gia</Input.Error>
              )}
            </Box>
            <Box my="sm">
              <Input.Label>
                Region
                <span style={{ color: "red" }}>*</span>
              </Input.Label>
              <SelectRegion
                value={
                  companyDetails.region_id?.toString() ||
                  companyDetails.region?.id?.toString()
                }
                countryId={
                  companyDetails.country_id?.toString() ||
                  selectedCountry?.id?.toString() ||
                  companyDetails.country?.id?.toString()
                }
                onChange={(value) => {
                  updateDetails("region_id", value);
                }}
              />
              {isNext && companyDetails.region_id === -1 && (
                <Input.Error>Khu vực</Input.Error>
              )}
            </Box>
          </Group>

          <Group grow align="flex-start">
            <Box my="sm">
              <Input.Label htmlFor="city">
                City
                <span style={{ color: "red" }}>*</span>
              </Input.Label>
              <Input
                type="text"
                id="city"
                placeholder="Dhaka"
                value={companyDetails.city || companyDetails.cityName}
                onChange={(event) =>
                  updateDetails("city", event.currentTarget.value)
                }
              />
              {isNext && !companyDetails.city && (
                <Input.Error>City is required</Input.Error>
              )}
            </Box>
            <Box my="sm">
              <Input.Label htmlFor="street">Street</Input.Label>
              <Input
                type="text"
                id="street"
                placeholder="Bogura"
                value={companyDetails.street}
                onChange={(event) =>
                  updateDetails("street", event.currentTarget.value)
                }
              />
            </Box>
          </Group>
        </Box>
        {!isEditMode && (
          <Flex justify="flex-end">
            <Button
              variant="subtle"
              gradient={primaryGradient}
              onClick={handleNext}
              radius="xl"
              size="md"
            >
              <Text mr="xs">Next</Text> <ArrowRight size={15} />
            </Button>
          </Flex>
        )}
      </Box>
    </Flex>
  );
}
