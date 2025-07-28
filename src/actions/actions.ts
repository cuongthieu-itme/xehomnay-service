"use server";
import { CountryGetAllType, RegionGetAllType } from "../../types";
import prisma from "../prisma";

export async function getAllCountriesAsync(): Promise<CountryGetAllType[]> {
  try {
    const countries = await prisma.country.findMany({
      where: { status: "active" },
    });

    return countries as CountryGetAllType[];
  } catch (error) {
    throw new Error("Error while fetching countries");
  }
}

export async function getAllRegionsAsync(
  countryId?: string
): Promise<RegionGetAllType[]> {
  try {
    const regions = await prisma.region.findMany({
      where: {
        countryId: countryId ? countryId : undefined,
        status: "active",
      },
    });
    // console.log(countryId);
    return regions as RegionGetAllType[];
  } catch (error) {
    throw new Error("Error while fetching regions");
  }
}

// add country provider

export const addCountry = async (name: string) => {
  try {
    if (!name) return { error: "Name is Required" };
    await prisma.country.create({
      data: {
        name: name,
        code: name?.slice(0, 2),
      },
    });
    return { message: "Country Added Success" };
  } catch (error) {
    console.log("country add error", error);
    return { error: "Country added Faield" };
  }
};

// add region provider

export const addRegion = async (region: string, countryId: string) => {
  try {
    if (!region && !countryId) return { error: "all Field is Required" };
    await prisma.region.create({
      data: {
        name: region,
        countryId: countryId,
      },
    });
    return { message: "Region Added Success" };
  } catch (error) {
    console.log("region add error", error);
    return { error: "Region added Faield" };
  }
};
