import { useEffect, useState } from 'react';
import { getApiUrl } from '@carbonfootprintdisplay/client/src/utils/index';
import { EmissionsData } from '@carbonfootprintdisplay/lib/src/index';

interface UseOrganizationsEmisionsResult {
  emissions: EmissionsData[];
  areEmissionsLoading: boolean;
}

/**
 * This hook is used to get the complete list of emissions of an organization.
 * @returns {UseOrganizationsResult}
 */
const useGetOrganizationEmissions = (
  organizationName: string
): UseOrganizationsEmisionsResult => {
  const [emissions, setEmisions] = useState<EmissionsData[]>([]);
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
        .then((emissionsList: EmissionsData[]) => {
          const filteredEmissionsList = emissionsList.filter(
            ({ monthsData }) => monthsData.length > 0 // Remove years with no data
          );
          setEmisions(filteredEmissionsList);
        })
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
