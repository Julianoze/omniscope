import { gql } from "@apollo/client";

export const PERFORMANCE_ANALYSIS_QUERY = gql`
  fragment TotalsFragment on Totals {
    preContracted {
      approvedWorkHours
      actualWorkHours
      inContextActualWorkHours
      possibleUnpaidHours
      possibleIdleHours
    }
    regular {
      approvedWorkHours
      actualWorkHours
      inContextActualWorkHours
      wastedHours
      overApprovedHours
    }
  }

  fragment RegularCaseFragment on RegularCasePerformanceSummary {
    title
    actualWorkHours
    approvedWorkHours
    inContextActualWorkHours
    overApprovedHours
    wastedHours
  }

  fragment PreContractedCaseFragment on PreContractedCasePerformanceSummary {
    title
    actualWorkHours
    approvedWorkHours
    inContextActualWorkHours
    possibleIdleHours
    possibleUnpaidHours
  }

  query PerformanceAnalysis($date: Date!) {
    performanceAnalysis(dateOfInterest: $date) {
      dateOfInterest
      start
      end
      weeks {
        start
        end
        periodType
        accountManagers {
          name
          totals {
            ...TotalsFragment
          }
          clients {
            name
            totals {
              ...TotalsFragment
            }
            sponsors {
              name
              totals {
                ...TotalsFragment
              }
              regularCases {
                ...RegularCaseFragment
              }
              preContractedCases {
                ...PreContractedCaseFragment
              }
            }
          }
        }
        clients {
          name
          totals {
            ...TotalsFragment
          }
          sponsors {
            name
            totals {
              ...TotalsFragment
            }
            regularCases {
              ...RegularCaseFragment
            }
            preContractedCases {
              ...PreContractedCaseFragment
            }
          }
        }
      }

      past {
        accountManagers {
          name
          totals {
            ...TotalsFragment
          }
          clients {
            name
            totals {
              ...TotalsFragment
            }
            sponsors {
              name
              totals {
                ...TotalsFragment
              }
              regularCases {
                ...RegularCaseFragment
              }
              preContractedCases {
                ...PreContractedCaseFragment
              }
            }
          }
        }
        clients {
          name
          totals {
            ...TotalsFragment
          }
          sponsors {
            name
            totals {
              ...TotalsFragment
            }
            regularCases {
              ...RegularCaseFragment
            }
            preContractedCases {
              ...PreContractedCaseFragment
            }
          }
        }
      }
    }
  }
`;
