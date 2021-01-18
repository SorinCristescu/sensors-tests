import React, { lazy, Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { GeistProvider, CssBaseline } from '@geist-ui/react';

// Routing
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import ErrorFallback from './components/errorFallback';
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
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => {
              window.location.reload();
            }}
          >
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
          </ErrorBoundary>
        </Layout>
      </Router>
    </GeistProvider>
  );
};

export default App;
