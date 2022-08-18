import React, { useContext } from 'react';
import { PropTypes } from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '../Templates/Dashboard';
import { AppContext } from './ThemeWrapper';
import {
  Home,
  Profile,
  Users,
  UserDetails
} from '../pageListAsync';
import withAccessRightRouter from '../Session/withAccessRightRouter';

function Application(props) {
  const { history } = props;
  const changeMode = useContext(AppContext);

  return (
    <Dashboard history={history} changeMode={changeMode}>
      <Switch>
        <Route path="/app/home" component={Home} />
        <Route path="/app/profile" component={Profile} />
        <Route path="/app/users/details" component={withAccessRightRouter(UserDetails, 'users')} />
        <Route path="/app/users" component={withAccessRightRouter(Users, 'users')} />

        <Route path={['/']} component={Home} />
        { /* Default */}
        {/* <Route component={NotFound} /> */}
      </Switch>
    </Dashboard>
  );
}

Application.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Application;
