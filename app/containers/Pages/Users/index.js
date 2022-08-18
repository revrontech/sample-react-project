import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import { injectIntl, intlShape } from 'react-intl';
import UserList from './UserList';

function UserTable(props) {
  const title = brand.name + ' - Users';
  const description = brand.desc;
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
        <UserList history={props.history} />
      </div>
    </div>
  );
}

UserTable.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(UserTable);
