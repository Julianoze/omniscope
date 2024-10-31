"use client";

import { Heading } from "@/components/catalyst/heading";
import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { Stat } from "@/app/components/analytics/stat";
import { Divider } from "@/components/catalyst/divider";
import { motion, AnimatePresence } from "framer-motion";
import { GET_CASES_AND_TIMESHEET } from "./queries";
import { CaseCard } from "./CaseCard";
import { FilterFieldsSelect } from "@/app/components/FilterFieldsSelect";
import { Option } from "react-tailwindcss-select/dist/components/type";
import { CasesGallery } from "./CasesGallery";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function Cases() {
  const [selectedFilters, setSelectedFilters] = useState<Option[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [formattedSelectedValues, setFormattedSelectedValues] = useState<
    Array<{ field: string; selectedValues: string[] }>
  >([]);

  const { loading, error, data } = useQuery(GET_CASES_AND_TIMESHEET, {
    variables: {
      filters:
        formattedSelectedValues.length > 0 ? formattedSelectedValues : null,
    },
  });
  const [selectedStat, setSelectedStat] = useState<string>("allCases");

  const handleFilterChange = (value: Option | Option[] | null): void => {
    const newSelectedValues = Array.isArray(value)
      ? value
      : value
      ? [value]
      : [];
    setSelectedFilters(newSelectedValues);

    const formattedValues =
      data?.timesheet.filterableFields?.reduce((acc: any[], field: any) => {
        const fieldValues = newSelectedValues
          .filter(
            (v) =>
              typeof v.value === "string" &&
              v.value.startsWith(`${field.field}:`)
          )
          .map((v) => (v.value as string).split(":")[1]);

        if (fieldValues.length > 0) {
          acc.push({
            field: field.field,
            selectedValues: fieldValues,
          });
        }
        return acc;
      }, []) || [];

    setFormattedSelectedValues(formattedValues);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleStatClick = (statName: string) => {
    setSelectedStat(statName);
  };

  const getStatClassName = (statName: string) => {
    return `cursor-pointer transition-all duration-300 ${
      selectedStat === statName
        ? "ring-2 ring-black shadow-lg scale-105"
        : "hover:scale-102"
    }`;
  };

  const filteredCases = data.cases
    .filter((caseItem: any) => 
      caseItem.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((caseItem: any) => {
      const caseData = data.timesheet.byCase.find(
        (c: any) => c.title === caseItem.title
      );
      if (!caseData) return selectedStat === "allCases";
      switch (selectedStat) {
        case "total":
          return caseData.totalHours > 0;
        case "consulting":
          return caseData.totalConsultingHours > 0;
        case "handsOn":
          return caseData.totalHandsOnHours > 0;
        case "squad":
          return caseData.totalSquadHours > 0;
        case "internal":
          return caseData.totalInternalHours > 0;
        default:
          return true;
      }
    });

  return (
    <>
      <div className="grid grid-cols-6 gap-4 mb-4">
        <div className="col-span-1"></div>
        <div className="col-span-5">
          <FilterFieldsSelect
            data={data.timesheet}
            selectedFilters={selectedFilters}
            handleFilterChange={handleFilterChange}
          />
        </div>
      </div>
      <div className="grid grid-cols-6 gap-4 mb-8">
        <div className="col-span-6">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
            <div className="lg:col-span-1">
              <div className="flex items-center mb-3">
                <p className="text-sm font-semibold text-gray-900 uppercase">
                  ALL TIME
                </p>
                <div className="flex-grow h-px bg-gray-200 ml-2"></div>
              </div>
              <div
                className={`${getStatClassName("allCases")} transform`}
                onClick={() => handleStatClick("allCases")}
              >
                <Stat title="All Cases" value={data.cases.length.toString()} />
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="flex items-center mb-3">
                <p className="text-sm font-semibold text-gray-900 uppercase">
                  ACTIVE{" "}
                  <span className="text-xs text-gray-600 uppercase">
                    LAST SIX WEEKS
                  </span>
                </p>
                <div className="flex-grow h-px bg-gray-200 ml-2"></div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                <div
                  className={`${getStatClassName("total")} transform`}
                  onClick={() => handleStatClick("total")}
                >
                  <Stat
                    title="Active Cases"
                    value={data.timesheet.byCase.length.toString()}
                  />
                </div>
                <div
                  className={`${getStatClassName("consulting")} transform`}
                  onClick={() => handleStatClick("consulting")}
                >
                  <Stat
                    title="Consulting"
                    value={data.timesheet.byCase
                      .filter((c: any) => c.totalConsultingHours > 0)
                      .length.toString()}
                    color="#F59E0B"
                    total={data.timesheet.byCase.length}
                  />
                </div>
                <div
                  className={`${getStatClassName("handsOn")} transform`}
                  onClick={() => handleStatClick("handsOn")}
                >
                  <Stat
                    title="Hands-On"
                    value={data.timesheet.byCase
                      .filter((c: any) => c.totalHandsOnHours > 0)
                      .length.toString()}
                    color="#8B5CF6"
                    total={data.timesheet.byCase.length}
                  />
                </div>
                <div
                  className={`${getStatClassName("squad")} transform`}
                  onClick={() => handleStatClick("squad")}
                >
                  <Stat
                    title="Squad"
                    value={data.timesheet.byCase
                      .filter((c: any) => c.totalSquadHours > 0)
                      .length.toString()}
                    color="#3B82F6"
                    total={data.timesheet.byCase.length}
                  />
                </div>
                <div
                  className={`${getStatClassName("internal")} transform`}
                  onClick={() => handleStatClick("internal")}
                >
                  <Stat
                    title="Internal"
                    value={data.timesheet.byCase
                      .filter((c: any) => c.totalInternalHours > 0)
                      .length.toString()}
                    color="#10B981"
                    total={data.timesheet.byCase.length}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Divider className="my-8" />
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search cases..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      <CasesGallery 
        filteredCases={filteredCases} 
        timesheetData={data.timesheet} 
      />
    </>
  );
}
