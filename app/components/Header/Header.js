import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Hidden from '@material-ui/core/Hidden';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { NavLink, Link } from 'react-router-dom';
import brand from 'enl-api/dummy/brand';
import product from 'enl-images/product.png';
import { injectIntl, FormattedMessage } from 'react-intl';
import link from 'enl-api/ui/link';
import UserMenu from './UserMenu';
import messages from './messages';
import styles from './header-jss';

function Header(props) {
  const {
    classes,
    toggleDrawerOpen,
    margin,
    signOut,
    dense,
    isLogin,
    avatar
  } = props;
  const [open] = useState(false);
  const [turnDarker, setTurnDarker] = useState(false);
  const [showTitle, setShowTitle] = useState(false);

  // Initial header style
  let flagDarker = false;
  let flagTitle = false;

  const handleScroll = () => {
    const doc = document.documentElement;
    const scroll = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    const newFlagDarker = (scroll > 30);
    const newFlagTitle = (scroll > 40);
    if (flagDarker !== newFlagDarker) {
      setTurnDarker(newFlagDarker);
      flagDarker = newFlagDarker;
    }
    if (flagTitle !== newFlagTitle) {
      setShowTitle(newFlagTitle);
      flagTitle = newFlagTitle;
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <AppBar
      className={classNames(
        classes.appBar,
        classes.floatingBar,
        margin && classes.appBarShift,
        turnDarker && classes.darker,
      )}
    >
      <Toolbar disableGutters={!open}>
        <div className={classNames(classes.brandWrap, dense && classes.dense)}>
          <span>
            <IconButton
              className={classes.menuButton}
              aria-label="Menu"
              onClick={toggleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
          </span>
          <Hidden smDown>
            <NavLink to="/app" className={classNames(classes.brand, classes.brandBar)}>
              <img src={product} alt={brand.name} />
            </NavLink>
          </Hidden>
        </div>
        <div className={classes.headerProperties}>
          <div
            className={classNames(
              classes.headerAction,
              showTitle && classes.fadeOut,
            )}
          />
        </div>
        <div className={classes.userToolbar}>
          {/* <SelectLanguage /> */}
          {isLogin
            ? <UserMenu signOut={signOut} avatar={avatar} />
            : (
              <Button
                color="primary"
                className={classes.buttonTop}
                component={Link}
                to={link.login}
                variant="contained"
              >
                <AccountCircle />
                <FormattedMessage {...messages.login} />
              </Button>
            )
          }
        </div>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  toggleDrawerOpen: PropTypes.func.isRequired,
  avatar: PropTypes.string.isRequired,
  margin: PropTypes.bool.isRequired,
  isLogin: PropTypes.bool,
  dense: PropTypes.bool,
  signOut: PropTypes.func.isRequired
};

Header.defaultProps = {
  dense: false,
  isLogin: false
};

export default withStyles(styles)(injectIntl(Header));
