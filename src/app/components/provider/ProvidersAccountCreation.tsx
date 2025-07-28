"use client";
import { Flex } from "@mantine/core";
import { useState } from "react";
import { initialCompanyDetails, IReqProviderProps } from "../../../../types";
import CompanyDetails from "./CompanyDetails";
import LoginDetails from "./LoginDetails";

export default function ProvidersAccountCreation() {
  const [page, setPage] = useState<number>(1);
  const [companyDetails, setCompanyDetails] = useState<
    Partial<IReqProviderProps>
  >(initialCompanyDetails);
  return (
    <Flex direction="column" mx="auto" px="xl">
      {page === 1 && (
        <CompanyDetails
          companyDetails={companyDetails}
          setCompanyDetails={setCompanyDetails}
          next={() => setPage(2)}
        />
      )}
      {page === 2 && (
        <div>
          <LoginDetails
            prev={() => setPage(1)}
            companyDetails={companyDetails}
            setCompanyDetails={setCompanyDetails}
          />
        </div>
      )}
    </Flex>
  );
}
