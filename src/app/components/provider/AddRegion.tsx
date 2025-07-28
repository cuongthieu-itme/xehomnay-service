"use client";

import { addRegion } from "@/actions/actions";
import Toast from "@/lib/Toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Loader from "../shared/Loader";

export default function AddRegion({ countries }: any) {
  const { refresh } = useRouter();
  const [region, setRegion] = useState<string>("");
  const [countryId, setCountryId] = useState<string>("");
  const [loader, setLoader] = useState(false);

  const handleAddRegion = async (e: any) => {
    e.preventDefault();
    setLoader(true);
    const res = await addRegion(region, countryId);
    if (res?.message) {
      toast.success(res?.message);
      setLoader(false);
      refresh();
    } else {
      toast.error(res?.error || "Something went wrong");
      setLoader(false);
    }
  };
  return (
    <div className="w-full max-w-xs">
      <Toast />
      <form
        onSubmit={handleAddRegion}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="countryId"
          >
            Select Country
          </label>

          <select
            name="countryId"
            id="countryId"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setCountryId(e.target.value)}
          >
            <option value={""} disabled selected>
              Select Country
            </option>
            {countries?.map((country: any, i: number) => {
              return (
                <>
                  <option key={i} value={country?.id}>
                    {country?.name}
                  </option>
                  ;
                </>
              );
            })}
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="region"
          >
            Region Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="region"
            name="region"
            type="text"
            placeholder="Region Name"
            onChange={(e) => setRegion(e.target.value)}
          />
        </div>
        <div className="flex w-full items-center justify-between">
          <button
            className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={loader}
          >
            {loader ? <Loader /> : "Add Region"}
          </button>
        </div>
      </form>
    </div>
  );
}
