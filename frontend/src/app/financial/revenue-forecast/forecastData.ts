interface ForecastItem {
  name?: string;
  title?: string;
  slug: string;
  clientSlug?: string;
  sponsorSlug?: string;
  caseSlug?: string;
  sameDayThreeMonthsAgo: number;
  normalizedSameDayThreeMonthsAgo: number;
  threeMonthsAgo: number;
  normalizedThreeMonthsAgo: number;
  sameDayTwoMonthsAgo: number;
  normalizedSameDayTwoMonthsAgo: number;
  twoMonthsAgo: number;
  normalizedTwoMonthsAgo: number;
  sameDayOneMonthAgo: number;
  normalizedSameDayOneMonthAgo: number;
  oneMonthAgo: number;
  normalizedOneMonthAgo: number;
  realized: number;
  normalizedRealized: number;
  projected: number;
  normalizedProjected: number;
  expected: number;
  normalizedExpected: number;
  expectedHistorical: number;
  normalizedExpectedHistorical: number;
}

interface ForecastTotals {
  sameDayThreeMonthsAgo: number;
  normalizedSameDayThreeMonthsAgo: number;
  threeMonthsAgo: number;
  normalizedThreeMonthsAgo: number;
  sameDayTwoMonthsAgo: number;
  normalizedSameDayTwoMonthsAgo: number;
  twoMonthsAgo: number;
  normalizedTwoMonthsAgo: number;
  sameDayOneMonthAgo: number;
  normalizedSameDayOneMonthAgo: number;
  oneMonthAgo: number;
  normalizedOneMonthAgo: number;
  realized: number;
  normalizedRealized: number;
  projected: number;
  normalizedProjected: number;
  expected: number;
  normalizedExpected: number;
  expectedHistorical: number;
  normalizedExpectedHistorical: number;
}

interface ForecastSection {
  clients: ForecastItem[];
  sponsors: ForecastItem[];
  cases: ForecastItem[];
  projects: ForecastItem[];
  totals: ForecastTotals;
}

interface ForecastData {
  consulting: ForecastSection;
  consultingPre: {
    clients: Array<{
      name: string;
      slug: string;
      threeMonthsAgo: number;
      twoMonthsAgo: number;
      oneMonthAgo: number;
      current: number;
    }>;
    sponsors: Array<{
      name: string;
      slug: string;
      clientSlug: string;
      threeMonthsAgo: number;
      twoMonthsAgo: number;
      oneMonthAgo: number;
      current: number;
    }>;
    cases: Array<{
      title: string;
      slug: string;
      sponsorSlug: string;
      clientSlug: string;
      threeMonthsAgo: number;
      twoMonthsAgo: number;
      oneMonthAgo: number;
      current: number;
    }>;
    projects: Array<{
      name: string;
      slug: string;
      caseSlug: string;
      threeMonthsAgo: number;
      twoMonthsAgo: number;
      oneMonthAgo: number;
      current: number;
    }>;
    totals: {
      threeMonthsAgo: number;
      twoMonthsAgo: number;
      oneMonthAgo: number;
      current: number;
    };
  };
  handsOn: {
    clients: Array<{
      name: string;
      slug: string;
      threeMonthsAgo: number;
      twoMonthsAgo: number;
      oneMonthAgo: number;
      current: number;
    }>;
    sponsors: Array<{
      name: string;
      slug: string;
      clientSlug: string;
      threeMonthsAgo: number;
      twoMonthsAgo: number;
      oneMonthAgo: number;
      current: number;
    }>;
    cases: Array<{
      title: string;
      slug: string;
      sponsorSlug: string;
      clientSlug: string;
      threeMonthsAgo: number;
      twoMonthsAgo: number;
      oneMonthAgo: number;
      current: number;
    }>;
    projects: Array<{
      name: string;
      slug: string;
      caseSlug: string;
      threeMonthsAgo: number;
      twoMonthsAgo: number;
      oneMonthAgo: number;
      current: number;
    }>;
    totals: {
      threeMonthsAgo: number;
      twoMonthsAgo: number;
      oneMonthAgo: number;
      current: number;
    };
  };
  squad: {
    clients: Array<{
      name: string;
      slug: string;
      threeMonthsAgo: number;
      twoMonthsAgo: number;
      oneMonthAgo: number;
      current: number;
    }>;
    sponsors: Array<{
      name: string;
      slug: string;
      clientSlug: string;
      threeMonthsAgo: number;
      twoMonthsAgo: number;
      oneMonthAgo: number;
      current: number;
    }>;
    cases: Array<{
      title: string;
      slug: string;
      sponsorSlug: string;
      clientSlug: string;
      threeMonthsAgo: number;
      twoMonthsAgo: number;
      oneMonthAgo: number;
      current: number;
    }>;
    projects: Array<{
      name: string;
      slug: string;
      caseSlug: string;
      threeMonthsAgo: number;
      twoMonthsAgo: number;
      oneMonthAgo: number;
      current: number;
    }>;
    totals: {
      threeMonthsAgo: number;
      twoMonthsAgo: number;
      oneMonthAgo: number;
      current: number;
    };
  };
}

export function getForecastData(data: any): ForecastData {
  const mapConsultingItem = (item: any) => ({
    name: item.name,
    title: item.title,
    slug: item.slug,
    clientSlug: item.clientSlug,
    sponsorSlug: item.sponsorSlug,
    caseSlug: item.caseSlug,
    sameDayThreeMonthsAgo: item.sameDayThreeMonthsAgo,
    normalizedSameDayThreeMonthsAgo: item.sameDayThreeMonthsAgo / data.forecast.workingDays.sameDayThreeMonthsAgo,
    threeMonthsAgo: item.threeMonthsAgo,
    normalizedThreeMonthsAgo: item.threeMonthsAgo / data.forecast.workingDays.threeMonthsAgo,
    sameDayTwoMonthsAgo: item.sameDayTwoMonthsAgo,
    normalizedSameDayTwoMonthsAgo: item.sameDayTwoMonthsAgo / data.forecast.workingDays.sameDayTwoMonthsAgo,
    twoMonthsAgo: item.twoMonthsAgo,
    normalizedTwoMonthsAgo: item.twoMonthsAgo / data.forecast.workingDays.twoMonthsAgo,
    sameDayOneMonthAgo: item.sameDayOneMonthAgo,
    normalizedSameDayOneMonthAgo: item.sameDayOneMonthAgo / data.forecast.workingDays.sameDayOneMonthAgo,
    oneMonthAgo: item.oneMonthAgo,
    normalizedOneMonthAgo: item.oneMonthAgo / data.forecast.workingDays.oneMonthAgo,
    realized: item.inAnalysis,
    normalizedRealized: item.inAnalysis / data.forecast.workingDays.inAnalysisPartial,
    projected: item.projected,
    normalizedProjected: item.projected / data.forecast.workingDays.inAnalysis,
    expected: item.expected,
    normalizedExpected: item.expected / data.forecast.workingDays.inAnalysis,
    expectedHistorical: item.expectedHistorical,
    normalizedExpectedHistorical: item.expectedHistorical / data.forecast.workingDays.inAnalysis,
  });

  const mapOtherItem = (item: any) => ({
    name: item.name,
    title: item.title,
    slug: item.slug,
    clientSlug: item.clientSlug,
    sponsorSlug: item.sponsorSlug,
    caseSlug: item.caseSlug,
    threeMonthsAgo: item.threeMonthsAgo,
    twoMonthsAgo: item.twoMonthsAgo,
    oneMonthAgo: item.oneMonthAgo,
    current: item.inAnalysis,
  });

  return {
    consulting: {
      clients: data.forecast.byKind.consulting.byClient.map(mapConsultingItem),
      sponsors: data.forecast.byKind.consulting.bySponsor.map(mapConsultingItem),
      cases: data.forecast.byKind.consulting.byCase.map(mapConsultingItem),
      projects: data.forecast.byKind.consulting.byProject.map(mapConsultingItem),
      totals: mapConsultingItem(data.forecast.byKind.consulting.totals),
    },
    consultingPre: {
      clients: data.forecast.byKind.consultingPre.byClient.map(mapOtherItem),
      sponsors: data.forecast.byKind.consultingPre.bySponsor.map(mapOtherItem),
      cases: data.forecast.byKind.consultingPre.byCase.map(mapOtherItem),
      projects: data.forecast.byKind.consultingPre.byProject.map(mapOtherItem),
      totals: {
        threeMonthsAgo: data.forecast.byKind.consultingPre.totals.threeMonthsAgo,
        twoMonthsAgo: data.forecast.byKind.consultingPre.totals.twoMonthsAgo,
        oneMonthAgo: data.forecast.byKind.consultingPre.totals.oneMonthAgo,
        current: data.forecast.byKind.consultingPre.totals.inAnalysis,
      },
    },
    handsOn: {
      clients: data.forecast.byKind.handsOn.byClient.map(mapOtherItem),
      sponsors: data.forecast.byKind.handsOn.bySponsor.map(mapOtherItem),
      cases: data.forecast.byKind.handsOn.byCase.map(mapOtherItem),
      projects: data.forecast.byKind.handsOn.byProject.map(mapOtherItem),
      totals: {
        threeMonthsAgo: data.forecast.byKind.handsOn.totals.threeMonthsAgo,
        twoMonthsAgo: data.forecast.byKind.handsOn.totals.twoMonthsAgo,
        oneMonthAgo: data.forecast.byKind.handsOn.totals.oneMonthAgo,
        current: data.forecast.byKind.handsOn.totals.inAnalysis,
      },
    },
    squad: {
      clients: data.forecast.byKind.squad.byClient.map(mapOtherItem),
      sponsors: data.forecast.byKind.squad.bySponsor.map(mapOtherItem),
      cases: data.forecast.byKind.squad.byCase.map(mapOtherItem),
      projects: data.forecast.byKind.squad.byProject.map(mapOtherItem),
      totals: {
        threeMonthsAgo: data.forecast.byKind.squad.totals.threeMonthsAgo,
        twoMonthsAgo: data.forecast.byKind.squad.totals.twoMonthsAgo,
        oneMonthAgo: data.forecast.byKind.squad.totals.oneMonthAgo,
        current: data.forecast.byKind.squad.totals.inAnalysis,
      },
    },
  };
}

// Função auxiliar para validar os dados
export function validateForecastData(data: any): boolean {
  if (!data?.forecast?.byKind) {
    console.error('Dados de previsão inválidos: estrutura principal ausente');
    return false;
  }

  const requiredSections = ['consulting', 'consultingPre', 'handsOn', 'squad'];
  const requiredSubsections = ['byClient', 'bySponsor', 'byCase', 'byProject', 'totals'];

  for (const section of requiredSections) {
    if (!data.forecast.byKind[section]) {
      console.error(`Dados de previsão inválidos: seção ${section} ausente`);
      return false;
    }

    for (const subsection of requiredSubsections) {
      if (!data.forecast.byKind[section][subsection]) {
        console.error(`Dados de previsão inválidos: subseção ${subsection} ausente em ${section}`);
        return false;
      }
    }
  }

  if (!data.forecast.workingDays) {
    console.error('Dados de previsão inválidos: dias úteis ausentes');
    return false;
  }

  return true;
}

// Função para tratar erros de dados ausentes
export function getDefaultForecastItem(): ForecastItem {
  return {
    slug: '',
    sameDayThreeMonthsAgo: 0,
    normalizedSameDayThreeMonthsAgo: 0,
    threeMonthsAgo: 0,
    normalizedThreeMonthsAgo: 0,
    sameDayTwoMonthsAgo: 0,
    normalizedSameDayTwoMonthsAgo: 0,
    twoMonthsAgo: 0,
    normalizedTwoMonthsAgo: 0,
    sameDayOneMonthAgo: 0,
    normalizedSameDayOneMonthAgo: 0,
    oneMonthAgo: 0,
    normalizedOneMonthAgo: 0,
    realized: 0,
    normalizedRealized: 0,
    projected: 0,
    normalizedProjected: 0,
    expected: 0,
    normalizedExpected: 0,
    expectedHistorical: 0,
    normalizedExpectedHistorical: 0,
  };
}

// Função para tratar erros de dados ausentes em outros tipos
export function getDefaultOtherItem() {
  return {
    name: '',
    slug: '',
    threeMonthsAgo: 0,
    twoMonthsAgo: 0,
    oneMonthAgo: 0,
    current: 0,
  };
}

// Função para processar os dados com segurança
export function processForecastData(data: any): ForecastData {
  try {
    if (!validateForecastData(data)) {
      throw new Error('Dados de previsão inválidos');
    }
    return getForecastData(data);
  } catch (error) {
    console.error('Erro ao processar dados de previsão:', error);
    // Retorna uma estrutura de dados vazia mas válida
    return {
      consulting: {
        clients: [],
        sponsors: [],
        cases: [],
        projects: [],
        totals: getDefaultForecastItem(),
      },
      consultingPre: {
        clients: [],
        sponsors: [],
        cases: [],
        projects: [],
        totals: getDefaultOtherItem(),
      },
      handsOn: {
        clients: [],
        sponsors: [],
        cases: [],
        projects: [],
        totals: getDefaultOtherItem(),
      },
      squad: {
        clients: [],
        sponsors: [],
        cases: [],
        projects: [],
        totals: getDefaultOtherItem(),
      },
    };
  }
} 