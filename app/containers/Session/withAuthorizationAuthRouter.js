import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import AuthLoading from './AuthLoading';

export default function withAuthorizationAuthRouter(Component) {
  class AuthenticatedAuthComponent extends React.Component {
    render() {
      const { isAuthenticated } = this.props;
      const authenticating = isAuth => {
        // Check authentication
        if (isAuth === null) {
          return (<AuthLoading />);
        }
        // Is not authenticate
        if (isAuth === true) {
          return (<Redirect to="/app" />);
        }
        // Is authenticate
        return (
          <Component {...this.props} />
        );
      };

      return authenticating(isAuthenticated);
    }
  }

  AuthenticatedAuthComponent.propTypes = {
    isAuthenticated: PropTypes.bool
  };

  AuthenticatedAuthComponent.defaultProps = {
    isAuthenticated: null
  };

  const reducer = 'authReducer';
  const mapStateToProps = (state) => ({
    isAuthenticated: state.get(reducer).loggedIn,
    ...state
  });

  return connect(mapStateToProps)(AuthenticatedAuthComponent);
}
