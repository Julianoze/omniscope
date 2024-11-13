"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@apollo/client";
import { GET_CONSULTANT, Consultant } from "./queries";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import { TimesheetSummary } from "../../account-managers/[slug]/TimesheetSummary";
import { CasesSummary } from "../../account-managers/[slug]/CasesSummary";


export default function ConsultantPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [selectedDataset, setSelectedDataset] = useState("timesheet-last-six-weeks");

  const { data, loading, error } = useQuery<{ consultantOrEngineer: Consultant }>(
    GET_CONSULTANT,
    {
      variables: { 
        slug,
        dataset: selectedDataset.replace('timesheet-', '')
      }
    }
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  if (!data?.consultantOrEngineer) return <div>Consultant not found</div>;

  const { name, position, photoUrl } = data.consultantOrEngineer;

  return (
    <div className="w-full p-2">
      <header className="flex items-center gap-6 mb-8">
        <Avatar className="w-24 h-24">
          <AvatarImage src={photoUrl} alt={name} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold">{name}</h1>
          <p className="text-gray-600">{position}</p>
        </div>
      </header>

      <TimesheetSummary 
        timesheet={data.consultantOrEngineer.timesheet}
        selectedDataset={selectedDataset}
        onDatasetSelect={setSelectedDataset}
        showWorkersInfo={false}
      />
      
      {/* <div className="mb-4">
        <SectionHeader
          title="Performance Analysis"
          subtitle={new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        />
      </div> */}
    </div>
  );
}
