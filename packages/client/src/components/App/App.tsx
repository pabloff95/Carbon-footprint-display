import React, { FC, useEffect, useState } from 'react';
import { getApiUrl } from '../../utils';
import { CompanyEmissionsFilterForm } from '../Home/CompanyEmissionsFilterForm';

export const App: FC<unknown> = () => {
  const [isBackendAlive, setIsBackendAlive] = useState(false);
  const [isBackendAliveLoaded, setIsBackendAliveLoaded] = useState(false);

  useEffect(() => {
    if (isBackendAliveLoaded) {
      return;
    }

    const loadIsAlive = async (): Promise<void> => {
      const isAliveResponse = await fetch(`${getApiUrl()}/ping`);

      setIsBackendAliveLoaded(true);
      setIsBackendAlive((await isAliveResponse.text()) === 'pong!');
    };

    loadIsAlive();
  }, [
    isBackendAlive,
    isBackendAliveLoaded,
    setIsBackendAliveLoaded,
    setIsBackendAlive,
  ]);

  if (!isBackendAliveLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <CompanyEmissionsFilterForm />
    </div>
  );
};
