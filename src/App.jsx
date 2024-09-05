

import React from 'react';
import { useRoutes } from 'react-router-dom';
import routeList from './Routes';


function App() {
  const routes = useRoutes(routeList);

  return (
    <div  >
      
          {routes}
        </div>
      
  );
}

export default App;
