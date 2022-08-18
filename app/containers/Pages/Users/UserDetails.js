import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import { injectIntl, intlShape } from 'react-intl';
import UserDetailsForm from './UserDetailsForm';

function UserTable(props) {
  const userDetails = props.location && props.location.state && props.location.state.user_details ? props.location.state.user_details : null
  const { history } = props
  const title = brand.name + ' - User Details';
  const description = brand.desc;
  if (userDetails === null) history.push('/app/users')

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <div>
        {userDetails && <UserDetailsForm history={history} userDetails={userDetails} />}
      </div>
    </div>
  );
}

UserTable.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(UserTable);
