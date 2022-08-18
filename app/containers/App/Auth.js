import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NotFound from 'containers/Pages/Standalone/NotFoundDedicated';
import Outer from '../Templates/Outer';
import {
  Login, Register, ResetPassword, TermsConditions
} from '../pageListAsync';

function Auth() {
  return (
    <Outer>
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/reset-password" component={ResetPassword} />
        <Route path="/terms-conditions" component={TermsConditions} />
        <Route path={['/', '/login']} component={Login} />
        <Route component={NotFound} />
      </Switch>
    </Outer>
  );
}

export default Auth;
