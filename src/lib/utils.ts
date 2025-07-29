import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const loginZodSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(10, "Password must be at most 10 characters"),
});

//custom function to format date
export function formatDate(inputDate: Date | string): string {
  let date: Date;

  // Convert the input to a Date object if it's a string
  if (typeof inputDate === "string") {
    date = new Date(inputDate);
  } else if (inputDate instanceof Date) {
    date = inputDate;
  } else {
    throw new Error("Invalid input. Please provide a Date or a date string.");
  }

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
  };

  const formattedDate = date.toLocaleString("en-US", options);
  return formattedDate;
}

//custom function to format time 16:00 => 4:00 pm
export function formatTime(stringTime: string): string {
  const [hours, minutes] = stringTime.split(":");
  const time = `${parseInt(hours) % 12}:${minutes} ${
    parseInt(hours) >= 12 ? "pm" : "am"
  }`;
  return time;
}

//custom function to define the default selected country
export const getDefaultSelectedCountry = (
  countries: any[],
  countryId: string | null
) => {
  if (countryId) {
    return countries.filter(
      (country) => country.id.toString() === countryId
    )[0];
  }
  return countries[0];
};

//default selected region
export const getDefaultSelectedRegion = (
  regions: any[],
  regionId: string | null
) => {
  if (regionId) {
    return regions.filter((region) => region.id.toString() === regionId)[0];
  }
  return regions[0];
};

//car slider data
export const carSliderData = [
  {
    id: 1,
    name: "Toyota Yaris",
    system: "Automatic",
    price: 2500000, // 2,500,000 VND
    image: "/images/slider/6.png",
  },
  {
    id: 2,
    name: "Toyota Land Cruiser",
    system: "Automatic",
    price: 3000000, // 3,000,000 VND
    image: "/images/slider/5.png",
  },
  {
    id: 3,
    name: "Toyota Yaris Cross",
    system: "Automatic",
    price: 3750000, // 3,750,000 VND
    image: "/images/slider/4.png",
  },
  {
    id: 4,
    name: "Toyota Corolla",
    system: "Automatic",
    price: 5000000, // 5,000,000 VND
    image: "/images/slider/3.png",
  },
  {
    id: 5,
    name: "Toyota C HR",
    system: "Automatic",
    price: 6250000, // 6,250,000 VND
    image: "/images/slider/2.png",
  },
  {
    id: 6,
    name: "Toyota bZ4X",
    system: "Automatic",
    price: 7500000, // 7,500,000 VND
    image: "/images/slider/1.png",
  },
];

//rental car data
export const rentalCarData = [
  {
    id: 1,
    name: "Toyota Yaris",
    slug: "toyota-yaris",
    transmission: "Automatic",
    fuelType: "Petrol",
    seats: 5,
    doors: 5,
    image: "/images/slider/6.png",
    gallery_images: [
      "/images/slider/6.png",
      "/images/slider/5.png",
      "/images/slider/4.png",
      "/images/slider/3.png",
      "/images/slider/2.png",
      "/images/slider/1.png",
    ],
    price: {
      oneToThreeDays: 1875000, // 1,875,000 VND
      fourToSevenDays: 1500000, // 1,500,000 VND
      eightToFifteenDays: 1375000, // 1,375,000 VND
      fifteenPlusDays: 1250000, // 1,250,000 VND
      basePrice: 1250000, // 1,250,000 VND
    },
    availableOnRequest: ["Navigation", "Wi-Fi", "Child seat"],
    amenities: {
      abs: true,
      remoteLock: true,
      airConditioner: true,
      electricWindows: true,
      cdPlayer: true,
    },
  },
  {
    id: 2,
    name: "Toyota Land Cruiser",
    slug: "toyota-land-cruiser",
    transmission: "Automatic",
    fuelType: "Petrol",
    seats: 5,
    doors: 5,
    image: "/images/slider/5.png",
    gallery_images: [
      "/images/slider/6.png",
      "/images/slider/5.png",
      "/images/slider/4.png",
      "/images/slider/3.png",
      "/images/slider/2.png",
      "/images/slider/1.png",
    ],
    price: {
      oneToThreeDays: 2500000, // 2,500,000 VND
      fourToSevenDays: 2000000, // 2,000,000 VND
      eightToFifteenDays: 1875000, // 1,875,000 VND
      fifteenPlusDays: 1750000, // 1,750,000 VND
      basePrice: 1750000, // 1,750,000 VND
    },
    availableOnRequest: ["Navigation", "Wi-Fi", "Child seat"],
    amenities: {
      abs: true,
      remoteLock: true,
      airConditioner: true,
      electricWindows: true,
      cdPlayer: true,
    },
  },
  {
    id: 3,
    name: "Toyota Yaris Cross",
    slug: "toyota-yaris-cross",
    transmission: "Automatic",
    fuelType: "Petrol",
    seats: 5,
    doors: 5,
    image: "/images/slider/4.png",
    gallery_images: [
      "/images/slider/6.png",
      "/images/slider/5.png",
      "/images/slider/4.png",
      "/images/slider/3.png",
      "/images/slider/2.png",
      "/images/slider/1.png",
    ],
    price: {
      oneToThreeDays: 3750000, // 3,750,000 VND
      fourToSevenDays: 3000000, // 3,000,000 VND
      eightToFifteenDays: 2750000, // 2,750,000 VND
      fifteenPlusDays: 2500000, // 2,500,000 VND
      basePrice: 2500000, // 2,500,000 VND
    },
    availableOnRequest: ["Navigation", "Wi-Fi", "Child seat"],
    amenities: {
      abs: true,
      remoteLock: true,
      airConditioner: true,
      electricWindows: true,
      cdPlayer: true,
    },
  },
  {
    id: 4,
    name: "Toyota Corolla",
    slug: "toyota-corolla",
    transmission: "Automatic",
    fuelType: "Petrol",
    seats: 5,
    doors: 5,
    image: "/images/slider/3.png",
    gallery_images: [
      "/images/slider/6.png",
      "/images/slider/5.png",
      "/images/slider/4.png",
      "/images/slider/3.png",
      "/images/slider/2.png",
      "/images/slider/1.png",
    ],
    price: {
      oneToThreeDays: 5000000, // 5,000,000 VND
      fourToSevenDays: 4000000, // 4,000,000 VND
      eightToFifteenDays: 3750000, // 3,750,000 VND
      fifteenPlusDays: 3500000, // 3,500,000 VND
      basePrice: 3500000, // 3,500,000 VND
    },
    availableOnRequest: ["Navigation", "Wi-Fi", "Child seat"],
    amenities: {
      abs: true,
      remoteLock: true,
      airConditioner: true,
      electricWindows: true,
      cdPlayer: true,
    },
  },
  {
    id: 5,
    name: "Toyota C HR",
    slug: "toyota-c-hr",
    transmission: "Automatic",
    fuelType: "Petrol",
    seats: 5,
    doors: 5,
    image: "/images/slider/2.png",
    gallery_images: [
      "/images/slider/6.png",
      "/images/slider/5.png",
      "/images/slider/4.png",
      "/images/slider/3.png",
      "/images/slider/2.png",
      "/images/slider/1.png",
    ],
    price: {
      oneToThreeDays: 6250000, // 6,250,000 VND
      fourToSevenDays: 5000000, // 5,000,000 VND
      eightToFifteenDays: 4625000, // 4,625,000 VND
      fifteenPlusDays: 4250000, // 4,250,000 VND
      basePrice: 4250000, // 4,250,000 VND
    },
    availableOnRequest: ["Navigation", "Wi-Fi", "Child seat"],
    amenities: {
      abs: true,
      remoteLock: true,
      airConditioner: true,
      electricWindows: true,
      cdPlayer: true,
    },
  },
  {
    id: 6,
    name: "Toyota bZ4X",
    slug: "toyota-bz4x",
    transmission: "Automatic",
    fuelType: "Electric",
    seats: 5,
    doors: 5,
    image: "/images/slider/1.png",
    gallery_images: [
      "/images/slider/6.png",
      "/images/slider/5.png",
      "/images/slider/4.png",
      "/images/slider/3.png",
      "/images/slider/2.png",
      "/images/slider/1.png",
    ],
    price: {
      oneToThreeDays: 7500000, // 7,500,000 VND
      fourToSevenDays: 6000000, // 6,000,000 VND
      eightToFifteenDays: 5500000, // 5,500,000 VND
      fifteenPlusDays: 5000000, // 5,000,000 VND
      basePrice: 5000000, // 5,000,000 VND
    },
    availableOnRequest: ["Navigation", "Wi-Fi", "Child seat"],
    amenities: {
      abs: true,
      remoteLock: true,
      airConditioner: true,
      electricWindows: true,
      cdPlayer: true,
    },
  },
];
