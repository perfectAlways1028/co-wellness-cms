
import React, { Suspense } from 'react';
import { Provider as StoreProvider } from 'mobx-react';
import stores from './mobx/stores';
const App = React.lazy(() => import(/* webpackChunkName: "App" */'./App' ));

export default () => {
  return (
      <StoreProvider {...stores}>
        <Suspense fallback={<div className="loading" />}>
        <App/>
        </Suspense>
      </StoreProvider>
  );
};
