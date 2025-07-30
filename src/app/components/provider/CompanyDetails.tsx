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

export default function CompanyDetails({
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
    console.log(value);
    setCompanyDetails((prev) => ({ ...prev, [key]: value }));
  };
  // window.scrollTo({ top: 0, behavior: "smooth" });
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
    window.scrollTo({ top: 0, behavior: "smooth" });
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
        <Title className="text-center">Tạo tài khoản nhà cung cấp mới</Title>
        <ProfilePhoto
          profileUrl={companyDetails.avatar || companyDetails.image}
          updateProfile={updateAvatar}
        />
        <Space mt="lg" />
        <Group grow>
          <Box my="sm">
            <Input.Label htmlFor="companyName">
              Tên công ty
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
              <Input.Error>Tên công ty là bắt buộc</Input.Error>
            )}
          </Box>
          <Box my="sm">
            <Input.Label htmlFor="businessRegistrationNumber">
              Số đăng ký kinh doanh
              <span style={{ color: "red" }}>*</span>
            </Input.Label>
            <Input
              type="text"
              id="businessRegistrationNumber"
              required
              placeholder="Số đăng ký kinh doanh"
              value={
                companyDetails.businessRegistrationNumber
                  ? companyDetails.businessRegistrationNumber
                  : companyDetails.businessReg
              }
              onChange={(e) =>
                updateDetails(
                  "businessRegistrationNumber",
                  e.currentTarget.value
                )
              }
            />
            {isNext && !companyDetails.businessRegistrationNumber && (
              <Input.Error>Số đăng ký kinh doanh là bắt buộc</Input.Error>
            )}
          </Box>
        </Group>
        <Group grow>
          <Box my="sm">
            <Input.Label htmlFor="contactName">
              Tên liên hệ
              <span style={{ color: "red" }}>*</span>
            </Input.Label>
            <Input
              type="text"
              id="contactName"
              required
              placeholder="Tên liên hệ"
              value={companyDetails.contactName}
              onChange={(e) =>
                updateDetails("contactName", e.currentTarget.value)
              }
            />
            {isNext && !companyDetails.contactName && (
              <Input.Error>Tên liên hệ là bắt buộc</Input.Error>
            )}
          </Box>
          <Box my="sm">
            <Input.Label htmlFor="phone">
              Số điện thoại
              <span style={{ color: "red" }}>*</span>
            </Input.Label>
            <Input
              type="text"
              id="phone"
              required
              placeholder="Số điện thoại"
              value={companyDetails.phone || companyDetails.contactPhone}
              onChange={(e) => updateDetails("phone", e.currentTarget.value)}
            />
            {isNext && !companyDetails.phone && (
              <Input.Error>Số điện thoại là bắt buộc</Input.Error>
            )}
          </Box>
        </Group>
        <Box my="lg">
          <Divider my="xs" label={<Title order={4}>Địa chỉ</Title>} />
          <Group grow>
            <Box my="sm">
              <Input.Label>
                Quốc gia
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
                Khu vực
                <span style={{ color: "red" }}>*</span>
              </Input.Label>
              <SelectRegion
                countryId={
                  selectedCountry?.id ||
                  countries?.filter(
                    (country) =>
                      country.id === companyDetails.country_id?.toString() ||
                      companyDetails.country?.id?.toString()
                  )[0]?.id
                }
                value={
                  companyDetails.region_id?.toString() ||
                  companyDetails.region?.id?.toString()
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
                Thành phố
                <span style={{ color: "red" }}>*</span>
              </Input.Label>
              <Input
                type="text"
                id="city"
                placeholder="Thành phố"
                value={companyDetails.city || companyDetails.cityName}
                onChange={(event) =>
                  updateDetails("city", event.currentTarget.value)
                }
              />
              {isNext && !companyDetails.city && (
                <Input.Error>Thành phố là bắt buộc</Input.Error>
              )}
            </Box>
            <Box my="sm">
              <Input.Label htmlFor="street">Địa chỉ</Input.Label>
              <Input
                type="text"
                id="street"
                placeholder="Địa chỉ"
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
              <Text mr="xs">Tiếp tục</Text> <ArrowRight size={15} />
            </Button>
          </Flex>
        )}
      </Box>
    </Flex>
  );
}
