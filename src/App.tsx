import './App.css';
import { renderRoutes } from 'react-router-config';

import routes from './routes';
import { HashRouter } from 'react-router-dom';
import { useEffect } from 'react';
import cookie from 'react-cookies';

function App() {
  useEffect(() => {
    try {
      if (!cookie.load('userInfo')) {
        window.location.replace('#/login');
      }
    } catch (err) {
      console.log(err);
    }

  }, [])

  return (
    <HashRouter>
      {renderRoutes(routes)}
    </HashRouter>
  );
}

export default App;
