import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import brand from 'enl-api/dummy/brand';
import { withStyles } from '@material-ui/core/styles';
import ReduxFormDemo from './ReduxFormDemo';

const styles = ({
  root: {
    flexGrow: 1,
  }
});

function ReduxForm(props) {
  const title = brand.name + ' - Form';
  const description = brand.desc;
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <ReduxFormDemo onSubmit={(values) => showResult(values)} />
    </div>
  );
}

ReduxForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ReduxForm);
