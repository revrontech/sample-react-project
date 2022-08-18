import React, {
  useRef,
  useEffect,
  useState
} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { injectIntl, FormattedMessage } from 'react-intl';
import messages from 'enl-api/ui/menuMessages';
import MainMenu from './MainMenu';
import styles from './sidebar-jss';

function SidebarContent(props) {
  const {
    classes,
    drawerPaper,
    toggleDrawerOpen,
    loadTransition,
    leftSidebar,
    dataMenu,
    status,
    openMenuStatus,
    userAttr
  } = props;
  const [transform, setTransform] = useState(0);
  const refSidebar = useRef(null);

  const setStatus = st => {
    switch (st) {
      case 'online':
        return classes.online;
      case 'idle':
        return classes.idle;
      case 'bussy':
        return classes.bussy;
      default:
        return classes.offline;
    }
  };

  const handleScroll = (event) => {
    setTransform(event.target.scrollTop);
  };

  useEffect(() => {
    refSidebar.current.addEventListener('scroll', handleScroll);

    return () => {
      refSidebar.current.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={classNames(classes.drawerInner, !drawerPaper ? classes.drawerPaperClose : '')}>
      <div className={classes.drawerHeader}>
        <div
          className={classes.profile}
          style={{ opacity: 1 - (transform / 100), marginTop: transform * -0.3 }}
        >
          <Avatar
            alt={userAttr.name}
            src={userAttr.avatar}
            className={classNames(classes.avatar, classes.bigAvatar)}
          />
          <div>
            <h4>{userAttr.name}</h4>
            <Button size="small" onClick={openMenuStatus}>
              <i className={classNames(classes.dotStatus, setStatus(status))} />
              <FormattedMessage {...messages[status]} />
            </Button>
          </div>
        </div>
      </div>
      <div
        id="sidebar"
        ref={refSidebar}
        className={
          classNames(
            classes.menuContainer,
            leftSidebar && classes.rounded,
            classes.withProfile
          )
        }
      >
        <MainMenu userAttr={userAttr} loadTransition={loadTransition} dataMenu={dataMenu} toggleDrawerOpen={toggleDrawerOpen} />
      </div>
    </div>
  );
}

SidebarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  userAttr: PropTypes.object.isRequired,
  drawerPaper: PropTypes.bool.isRequired,
  toggleDrawerOpen: PropTypes.func,
  loadTransition: PropTypes.func,
  leftSidebar: PropTypes.bool.isRequired,
  dataMenu: PropTypes.array.isRequired,
  status: PropTypes.string.isRequired,
  openMenuStatus: PropTypes.func.isRequired,
};

SidebarContent.defaultProps = {
  toggleDrawerOpen: () => { },
  toggleDrawerClose: () => { },
  loadTransition: () => { },
  anchorEl: null,
};

export default withStyles(styles)(injectIntl(SidebarContent));