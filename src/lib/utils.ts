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

export const carSliderData = [
  {
    id: 1,
    name: "Toyota Yaris",
    system: "Automatic",
    price: 100,
    image: "/images/slider/6.png",
  },
  {
    id: 2,
    name: "Toyota Land Cruiser",
    system: "Automatic",
    price: 120,
    image: "/images/slider/5.png",
  },
  {
    id: 3,
    name: "Toyota Yaris Cross",
    system: "Automatic",
    price: 150,
    image: "/images/slider/4.png",
  },
  {
    id: 4,
    name: "Toyota Corolla",
    system: "Automatic",
    price: 200,
    image: "/images/slider/3.png",
  },
  {
    id: 5,
    name: "Toyota C HR",
    system: "Automatic",
    price: 250,
    image: "/images/slider/2.png",
  },
  {
    id: 6,
    name: "Toyota bZ4X",
    system: "Automatic",
    price: 300,
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
      oneToThreeDays: 75,
      fourToSevenDays: 60,
      eightToFifteenDays: 55,
      fifteenPlusDays: 50,
      basePrice: 50,
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
      oneToThreeDays: 100,
      fourToSevenDays: 80,
      eightToFifteenDays: 75,
      fifteenPlusDays: 70,
      basePrice: 70,
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
      oneToThreeDays: 150,
      fourToSevenDays: 120,
      eightToFifteenDays: 110,
      fifteenPlusDays: 100,
      basePrice: 100,
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
      oneToThreeDays: 200,
      fourToSevenDays: 160,
      eightToFifteenDays: 150,
      fifteenPlusDays: 140,
      basePrice: 140,
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
      oneToThreeDays: 250,
      fourToSevenDays: 200,
      eightToFifteenDays: 185,
      fifteenPlusDays: 170,
      basePrice: 170,
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
      oneToThreeDays: 300,
      fourToSevenDays: 240,
      eightToFifteenDays: 220,
      fifteenPlusDays: 200,
      basePrice: 200,
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
