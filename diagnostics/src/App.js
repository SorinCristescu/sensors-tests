import React, { lazy, Suspense, useState } from 'react';
import { GeistProvider, CssBaseline } from '@geist-ui/react';

// Routing
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import Layout from './layout';
import Loader from './components/loader';

// Lazy loading with code splitting.
const Home = lazy(() => import('./pages/home'));

const Journal = lazy(() => import('./pages/journal'));

const App = () => {
  const [themeType, setThemeType] = useState('dark');
  const switchThemes = () => {
    setThemeType((lastThemeType) =>
      lastThemeType === 'dark' ? 'light' : 'dark'
    );
  };

  return (
    <GeistProvider theme={{ type: themeType }}>
      <Router>
        <CssBaseline />
        <Layout switchThemes={switchThemes} themeType={themeType}>
          <Suspense fallback={<Loader />}>
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/:id" component={Journal}>
                <Journal themeType={themeType} />
              </Route>
            </Switch>
          </Suspense>
        </Layout>
      </Router>
    </GeistProvider>
  );
};

export default App;
