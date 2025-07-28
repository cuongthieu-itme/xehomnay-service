"use client";
import { addCountry } from "@/actions/actions";
import Toast from "@/lib/Toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Loader from "../shared/Loader";

export default function AddCountry({ user, providerDetails }: any) {
  const { refresh } = useRouter();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdd = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const res = await addCountry(name);
    if (res?.message) {
      toast.success(res?.message);
      setLoading(false);
      refresh();
    } else {
      toast.error(res?.error || "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xs">
      <Toast />
      <form
        onSubmit={handleAdd}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="country_name"
          >
            Country Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="country_name"
            name="country_name"
            type="text"
            placeholder="Country Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex w-full items-center justify-between">
          <button
            className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={loading}
          >
            {loading ? <Loader /> : "Add Country"}
          </button>
        </div>
      </form>
    </div>
  );
}
