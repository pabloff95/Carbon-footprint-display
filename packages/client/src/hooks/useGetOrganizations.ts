import { useEffect, useState } from 'react';
import { getApiUrl } from '@cozero/client/src/utils/index';

interface UseOrganizationsResult {
  organizations: string[];
  areOrganizationsLoading: boolean;
}

/**
 * This hook is used to get a list of all the distinct organization names saved in the database.
 * @returns {UseOrganizationsResult}
 */
const useGetOrganizations = (): UseOrganizationsResult => {
  const [organizations, setOrganizations] = useState([]);
  const [areOrganizationsLoading, setAreOrganizationsLoading] = useState(false);

  useEffect(() => {
    const loadOrganizations = async (): Promise<void> => {
      setAreOrganizationsLoading(true);

      await fetch(`${getApiUrl()}/organizations`)
        .then(async response => {
          if (!response.ok) {
            throw new Error('Error while fetching the organization names!');
          }

          return response.json();
        })
        .then(organizationsList => setOrganizations(organizationsList))
        .catch(error => {
          console.error(error.message);
          setOrganizations([]);
        })
        .finally(() => setAreOrganizationsLoading(false));
    };

    loadOrganizations();
  }, []);

  return { organizations, areOrganizationsLoading };
};

export default useGetOrganizations;
export type { UseOrganizationsResult };
