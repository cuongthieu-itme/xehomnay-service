import { ReactNode } from "react";
import { IconType } from "react-icons/lib";

export type CarStatus = "available" | "pending" | "booked" | "not available";
export type BookingStatus = "pending" | "rejected" | "approved";
export interface Props {
  children: React.ReactNode;
}

export interface IsSignupFromType {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IsLoginFormType {
  email: string;
  password: string;
}

export interface CountryGetAllType {
  id?: string;
  name?: string;
  code?: string;
  longitude?: number;
  latitude?: number;
  createdAt: string;
  updatedAt: string;
}

export interface RegionGetAllType extends CountryGetAllType {}

export interface IBaseProviderProps {
  id: string;
  businessRegistrationNumber: string;

  city: string;
  cityName: string;
  companyName: string;
  contactName: string;
  email: string;
  latitude: number;
  longitude: number;
  phone: string;
  contactPhone: string;
  avatar: string;
  image: string;
  profileUrl?: string;
  street: string;
}

export interface IReqProviderProps extends IBaseProviderProps {
  country_id: any;
  region_id: any;
  country: any;
  region: any;
  businessReg: string;
}

export const initialCompanyDetails: Partial<IReqProviderProps> = {
  profileUrl: "",
  companyName: "",
  businessRegistrationNumber: "",
  contactName: "",
  phone: "",
  email: "",
  country_id: -1,
  region_id: -1,
  city: "",
  street: "",
  latitude: -1,
  longitude: -1,
};

export type CurrentMode = "new" | "edit";

export interface IBaseLocationProps {
  name: string;
  latitude?: number;
  longitude?: number;
}

export interface IResCountryProps extends IBaseLocationProps {
  id: number;
  created_at: string;
}

export interface IProfileDetails {
  firstName: string;
  lastName: string;
  countryId: string;
  regionId: string;
  phone: string;
  city: string;
  state: string;
  dob: string;
  gender: string;
  avatar: string;
}
export interface IBaseUserProps {
  id: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  gender?: string;
  avatar?: string;
  phone?: string;
  email?: string;
  // address
  city?: string;
  state?: string;
  latitude?: number;
  longitude?: number;
}
export interface IResUserProps extends IBaseUserProps {
  created_at: string;
  countries: IResCountryProps;
  regions: RegionGetAllType;
  userProfile: IProfileDetails;
  user: IBaseUserProps;
  image: string;
}

export interface IReqUserProps extends IBaseUserProps {
  country_id?: string;
  region_id?: string;
}

// cars types
export interface IBaseCarProps {
  make: string;
  model: string;
  year: number;
  bodyType: string;
  transmission: string;
  engineCapaciy: string;
  fuelType: string;
  description: string;
  seatsCapacity: number;
  bagsCapacity: number;
  doorsCapacity: number;
  acAvailable: boolean;
  acWorking: boolean;
  images: string[];
  otherFeatures: string[];
  color: string;
  status: string;
  provider_id: string | undefined;
  country_id: number | undefined;
  region_id: number | undefined;
  pricePerHour: number;
  pricePerDay: number;
  minimumRent: number | "";
  maximumRent: number | "";
}

export interface IResCarProps extends IBaseCarProps {
  id: number;
  created_at: string;
  type: string;
  slug: string;
}

export interface IReqCarProps extends IBaseCarProps {
  bodyType: string;
  id: number;
}

export type ICarState = IReqCarProps | IResCarProps;

export interface ICarContext {
  state: ICarState;
  updateProperty: (key: keyof IReqCarProps, value: any) => void;
  addInitialState: (state: ICarState) => void;
  addCarImage: (url: string) => void;
  removeImage: (url: string) => void;
  resetState: () => void;
}

export type SelectItem = {
  label: string;
  value: string;
  icon?: ReactNode | IconType;
};

//booking types
export interface IBaseBookingProps {
  pickupDate: string;
  provider_id: string;
  car_id: string;
  returnDate: string;
  totalPrice: number;
  status: string;
  user_id: string;
  users: { firstName: string; lastName: string; avatar: string };
}
export interface IResBookingProps extends IBaseBookingProps {
  id: string;
  created_at: string;
  cars?: IResCarProps;
}

//provider reviews
export interface IResProviderProps extends IBaseProviderProps {
  created_at: string;
  country_id: number;
  region_id: number;
  country?: IResCountryProps;
  region?: RegionGetAllType;
}
export interface IResReviewProps {
  id: string;
  created_at: string;
  rate: number;
  comment: string;
  likes: number;
  dislikes: number;
  car_id: string;
  providers: IResProviderProps;
  user: any;
}

//filter types
export interface IFiltersState {
  type: string;
  minPrice: number;
  maxPrice: number;
  minYear: number;
  maxYear: number;
  transmission: string;
  fuelType: string;
}
export interface IFiltersContext {
  state: IFiltersState;
  updateFilterProperty: (
    key: keyof IFiltersState,
    value: IFiltersState[keyof IFiltersState]
  ) => void;
  resetFilters: () => void;
}
