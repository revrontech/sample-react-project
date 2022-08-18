import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import AuthLoading from './AuthLoading';

export default function withAccessRightRouter(Component, routeName) {
  const checkRights = (userAttr) => (userAttr.rights && userAttr.rights.indexOf(routeName) > -1);

  class AccessComponent extends React.Component {
    render() {
      const { userAttr } = this.props;
      const authenticating = userDetails => {
        // Check authentication
        if (userDetails === null || userDetails.rights === null) {
          return (<AuthLoading />);
        }

        // Is not authenticate
        if (!checkRights(userDetails)) {
          return (<Redirect to="/app" />);
        }
        // Is authenticate
        return (
          <Component {...this.props} />
        );
      };

      return (authenticating(userAttr));
    }
  }

  AccessComponent.propTypes = {
    userAttr: PropTypes.any
  };

  AccessComponent.defaultProps = {
    userAttr: null
  };

  const reducer = 'authReducer';
  const mapStateToProps = (state) => ({
    userAttr: state.get(reducer).user,
    ...state
  });

  return connect(mapStateToProps)(AccessComponent);
}
