import { format } from "date-fns";
import { ChevronDown, ChevronRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SectionHeader from "@/components/SectionHeader";
import React from "react";

interface RegularCasesByClientTableProps {
  data: any;
  expandedClients: Set<string>;
  expandedSponsors: Set<string>;
  selectedWeekIndex: number;
  toggleClient: (clientKey: string) => void;
  toggleSponsor: (sponsorKey: string) => void;
  formatHours: (hours: number) => string;
}

export function RegularCasesByClientTable({
  data,
  expandedClients,
  expandedSponsors,
  selectedWeekIndex,
  toggleClient,
  toggleSponsor,
  formatHours,
}: RegularCasesByClientTableProps) {
  return (
    <div>
      <SectionHeader title="Regular Cases by Client" subtitle="" />
      <Table className="ml-2 mr-2">
        <TableHeader>
          <TableRow>
            <TableHead>Client</TableHead>
            {data.performanceAnalysis.weeks.map((week: any, weekIndex: number) => (
              <TableHead 
                key={week.start} 
                className={`w-[150px] ${weekIndex === selectedWeekIndex ? 'bg-blue-100' : ''} ${weekIndex > selectedWeekIndex ? 'opacity-50' : ''}`}
              >
                {format(new Date(week.start), "MMM d")} - {format(new Date(week.end), "d")}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.performanceAnalysis.weeks[selectedWeekIndex].clients.map((client: any) => (
            <React.Fragment key={client.name}>
              <TableRow className="cursor-pointer hover:bg-gray-50" onClick={() => toggleClient(client.name)}>
                <TableCell className="font-medium flex items-center gap-2">
                  {expandedClients.has(client.name) ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  {client.name}
                </TableCell>
                {data.performanceAnalysis.weeks.map((week: any, weekIndex: number) => {
                  const weekClient = week.clients.find((c: any) => c.name === client.name);
                  const totals = weekClient?.totals?.regular || {};
                  
                  return (
                    <TableCell key={week.start} className={`w-[150px] ${weekIndex === selectedWeekIndex ? 'bg-blue-100' : ''} ${weekIndex > selectedWeekIndex ? 'opacity-50' : ''}`}>
                      {weekClient ? (
                        <div>
                          <div>{formatHours(totals.actualWorkHours || 0)} / {formatHours(totals.approvedWorkHours || 0)}</div>
                          {totals.wastedHours > 0 && (
                            <div className="text-red-500 text-sm">
                              {formatHours(totals.wastedHours)} wasted
                            </div>
                          )}
                          {totals.overApprovedHours > 0 && (
                            <div className="text-orange-500 text-sm">
                              {formatHours(totals.overApprovedHours)} over
                            </div>
                          )}
                          {totals.inContextActualWorkHours !== totals.actualWorkHours && totals.inContextActualWorkHours > 0 && (
                            <div className="text-blue-500 text-sm">
                              {formatHours(totals.inContextActualWorkHours)} this month
                            </div>
                          )}
                        </div>
                      ) : "-"}
                    </TableCell>
                  );
                })}
              </TableRow>
              {expandedClients.has(client.name) && client.sponsors.map((sponsor: any) => (
                <React.Fragment key={`${client.name}-${sponsor.name}`}>
                  <TableRow 
                    className="bg-gray-100 cursor-pointer hover:bg-gray-200"
                    onClick={() => toggleSponsor(`${client.name}-${sponsor.name}`)}
                  >
                    <TableCell className="pl-8 text-sm text-gray-500 flex items-center gap-2">
                      {expandedSponsors.has(`${client.name}-${sponsor.name}`) ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                      {sponsor.name}
                    </TableCell>
                    {data.performanceAnalysis.weeks.map((week: any, weekIndex: number) => {
                      const weekClient = week.clients.find((c: any) => c.name === client.name);
                      const weekSponsor = weekClient?.sponsors.find((s: any) => s.name === sponsor.name);
                      const totals = weekSponsor?.totals?.regular || {};

                      return (
                        <TableCell key={week.start} className={`w-[150px] ${weekIndex === selectedWeekIndex ? 'bg-blue-100' : ''} ${weekIndex > selectedWeekIndex ? 'opacity-50' : ''}`}>
                          {weekSponsor ? (
                            <div>
                              <div>{formatHours(totals.actualWorkHours || 0)} / {formatHours(totals.approvedWorkHours || 0)}</div>
                              {totals.wastedHours > 0 && (
                                <div className="text-red-500 text-sm">
                                  {formatHours(totals.wastedHours)} wasted
                                </div>
                              )}
                              {totals.overApprovedHours > 0 && (
                                <div className="text-orange-500 text-sm">
                                  {formatHours(totals.overApprovedHours)} over
                                </div>
                              )}
                              {totals.inContextActualWorkHours !== totals.actualWorkHours && totals.inContextActualWorkHours > 0 && (
                                <div className="text-blue-500 text-sm">
                                  {formatHours(totals.inContextActualWorkHours)} this month
                                </div>
                              )}
                            </div>
                          ) : "-"}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                  {expandedSponsors.has(`${client.name}-${sponsor.name}`) && (
                    <TableRow key={`${client.name}-${sponsor.name}-cases`}>
                      <TableCell className="pl-12 text-sm text-gray-500">
                        {sponsor.regularCases.map((c: any) => (
                          <div key={c.title}>{c.title}</div>
                        ))}
                      </TableCell>
                      {data.performanceAnalysis.weeks.map((week: any, weekIndex: number) => {
                        const weekClient = week.clients.find((c: any) => c.name === client.name);
                        const weekSponsor = weekClient?.sponsors.find((s: any) => s.name === sponsor.name);
                        const cases = weekSponsor?.regularCases || [];

                        return (
                          <TableCell key={week.start} className={`bg-gray-200 w-[150px] ${weekIndex === selectedWeekIndex ? 'bg-blue-100' : ''} ${weekIndex > selectedWeekIndex ? 'opacity-50' : ''}`}>
                            {cases.map((c: any) => (
                              <div key={c.title}>
                                <div>{formatHours(c.actualWorkHours)} / {formatHours(c.approvedWorkHours)}</div>
                                {c.wastedHours > 0 && (
                                  <div className="text-red-500 text-sm">
                                    {formatHours(c.wastedHours)} wasted
                                  </div>
                                )}
                                {c.overApprovedHours > 0 && (
                                  <div className="text-orange-500 text-sm">
                                    {formatHours(c.overApprovedHours)} over
                                  </div>
                                )}
                                {c.inContextActualWorkHours !== c.actualWorkHours && c.inContextActualWorkHours > 0 && (
                                  <div className="text-blue-500 text-sm">
                                    {formatHours(c.inContextActualWorkHours)} this month
                                  </div>
                                )}
                              </div>
                            ))}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
