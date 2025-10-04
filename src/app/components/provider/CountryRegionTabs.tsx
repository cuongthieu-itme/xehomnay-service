"use client";

import AddCountry from "@/app/components/provider/AddCountry";
import AddRegion from "@/app/components/provider/AddRegion";
import CountryTableList from "@/app/components/provider/CountryTableList";
import RegionTableList from "@/app/components/provider/RegionTableList";
import { Tabs } from "@mantine/core";
import { CountryGetAllType, RegionGetAllType } from "../../../../types";

interface CountryRegionTabsProps {
  countries: CountryGetAllType[];
  regions: RegionGetAllType[];
}

export default function CountryRegionTabs({
  countries,
  regions,
}: CountryRegionTabsProps) {
  return (
    <Tabs defaultValue="country" className="w-full">
      <Tabs.List>
        <Tabs.Tab value="country">Quản lý Quốc gia</Tabs.Tab>
        <Tabs.Tab value="region">Quản lý Khu vực</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="country" pt="md">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Thêm Quốc gia mới</h2>
            <AddCountry />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Danh sách Quốc gia</h2>
            <CountryTableList countries={countries} />
          </div>
        </div>
      </Tabs.Panel>

      <Tabs.Panel value="region" pt="md">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Thêm Khu vực mới</h2>
            <AddRegion countries={countries} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Danh sách Khu vực</h2>
            <RegionTableList regions={regions} />
          </div>
        </div>
      </Tabs.Panel>
    </Tabs>
  );
}

