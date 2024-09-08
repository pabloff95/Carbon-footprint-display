type EmissionsData = {
  year: number;
  monthsData: { month: number; emissions: number }[];
};

const baseYear = 2000;

export { EmissionsData, baseYear };
