import { useEffect, useState } from 'react';
import { getApiUrl } from '../utils';

interface UseOrganizationsResult {
  organizations: string[];
  areOrganizationsLoading: boolean;
}

/**
 * This hook is used to get a list of all the distinct organization names saved in the database.
 * @returns {UseOrganizationsResult}
 */
const useGetOrganizations: () => UseOrganizationsResult = () => {
  const [organizations, setorganizations] = useState([]);
  const [areOrganizationsLoading, setAreOrganizationsLoading] = useState(false);

  useEffect(() => {
    const loadOrganizations = async (): Promise<void> => {
      setAreOrganizationsLoading(true);

      await fetch(`${getApiUrl()}/organizations`)
        .then(response => response.json())
        .then(organizationsList => setorganizations(organizationsList))
        .catch(error => {
          console.error(error);
          setorganizations([]);
        })
        .finally(() => setAreOrganizationsLoading(false));
    };

    loadOrganizations();
  }, []);

  return { organizations, areOrganizationsLoading };
};

export default useGetOrganizations;
export type { UseOrganizationsResult };
