import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NotFound from '../Pages/Standalone/NotFoundDedicated';
import Auth from './Auth';
import Application from './Application';
import ThemeWrapper from './ThemeWrapper';
import withAuthorizationRouter from '../Session/withAuthorizationRouter';
import withAuthorizationAuthRouter from '../Session/withAuthorizationAuthRouter';
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

function App() {
  return (
    <ThemeWrapper>
      <Switch>
        <Route path="/app" component={withAuthorizationRouter(Application)} />
        <Route path="/" component={withAuthorizationAuthRouter(Auth)} />
        <Route component={NotFound} />
      </Switch>
    </ThemeWrapper>
  );
}

export default App;
