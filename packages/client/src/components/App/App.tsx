import React, { FC, useEffect, useState } from 'react'

import { API_URL } from '~/config'
import { Logger, checkServerVersion } from '~/utils'

export const App: FC<unknown> = () => {
  const [response, setResponse] = useState<string>('NO SERVER RESPONSE')

  // useEffect(() => {
  //   async function fetchResponse(): Promise<void> {
  //     try {
  //       const res = await fetch(API_URL);
  //       const data = await res.text();
  //       setResponse(data);
  //     } catch (err) {
  //       Logger.error(err);
  //     }
  //   }

  //   fetchResponse();
  // }, []);

  useEffect(() => {
    checkServerVersion()
  }, [])

  return (
    <>
      <div>
        Here we use a <code>Dictionary&lt;number&gt;</code> interface from the{' '}
        <code>@cozero/domain</code> package:
        <pre>{`JSON.stringify(dictExample)`}</pre>
      </div>
      <div>
        And here we get a response from the API:
        <br />
        <br />
        {response}
      </div>
    </>
  )
}
