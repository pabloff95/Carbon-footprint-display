import { useEffect, useState } from 'react';
import { getApiUrl } from '../utils';

interface UseOrganizationsEmisionsResult {
  emissions: { date: Date; emissions: number }[];
  areEmissionsLoading: boolean;
}

/**
 * This hook is used to get the complete list of emissions of an organization.
 * @returns {UseOrganizationsResult}
 */
const useGetOrganizationEmissions: (
  organization: string
) => UseOrganizationsEmisionsResult = (organizationName: string) => {
  const [emissions, setEmisions] = useState<
    { date: Date; emissions: number }[]
  >([]);
  const [areEmissionsLoading, setAreEmissionsLoading] = useState(false);

  useEffect(() => {
    if (!organizationName) {
      return;
    }

    const loadEmissions = async (): Promise<void> => {
      setAreEmissionsLoading(true);

      await fetch(`${getApiUrl()}/organizations/emissions/${organizationName}`)
        .then(async response => {
          if (!response.ok) {
            throw new Error('Error while fetching the organization emissions!');
          }

          return response.json();
        })
        .then((emissionsList: { date: Date; emissions: number }[]) =>
          setEmisions(emissionsList)
        )
        .catch(error => {
          console.error(error.message);
          setEmisions([]);
        })
        .finally(() => setAreEmissionsLoading(false));
    };

    loadEmissions();
  }, [organizationName]);

  return { emissions, areEmissionsLoading };
};

export default useGetOrganizationEmissions;
export type { UseOrganizationsEmisionsResult };
