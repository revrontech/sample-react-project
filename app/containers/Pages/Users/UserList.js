import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import MUIDataTable from 'mui-datatables';
import { getUsers } from 'enl-api/services/users';
import { IconButton, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add'

const styles = theme => ({
  table: {
    '& > div': {
      overflow: 'auto'
    },
    '& table': {
      '& td': {
        wordBreak: 'keep-all'
      },
      [theme.breakpoints.down('md')]: {
        '& td': {
          height: 60,
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }
      }
    }
  }
});

function UserList(props) {
  console.log(props.his)
  const { history } = props
  const [userList, setUserList] = useState([])
  const fetchUsers = async () => {
    try {
      let { data } = await getUsers()
      data = data.map(e => ({ ...e, roles_name: e.roles_name.join(', ') }))
      setUserList(data)
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchUsers()
  }, [])

  const findUser = (user_id) => {
    for (const user of userList) {
      if (user.id == user_id) return user
    }
    return null
  }

  const columns = [
    {
      name: 'name',
      label: "Name",
      options: {
        filter: true
      }
    },
    {
      name: 'email',
      label: "Email",
      options: {
        filter: true
      }
    },
    {
      name: 'roles_name',
      label: "Roles",
      options: {
        filter: false
      }
    },
    {
      name: 'created_on',
      label: 'Created On',
      options: {
        filter: false
      }
    },
    {
      name: 'updated_on',
      label: 'Updated On',
      options: {
        filter: false
      }
    },
    {
      name: 'id',
      label: 'Actions',
      options: {
        filter: false,
        customBodyRender: (value) => (<Chip onClick={() => history.push('/app/users/details', { user_details: findUser(value) })} label="Update" style={{ background: '#000', color: '#FFF' }} />)
      }
    }
  ];

  const options = {
    responsive: 'vertical',
    print: false,
    download: false,
    rowsPerPage: 10,
    page: 0,
    selectableRows: 'none',
    customToolbar: () => {
      return (
        <Tooltip title="Add User">
          <IconButton onClick={() => history.push('/app/users/details', { user_details: { id: 0, name: '', email: '', roles: [] } })}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      )
    }
  };

  const { classes } = props;

  return (
    <div className={classes.table}>
      <MUIDataTable
        data={userList}
        columns={columns}
        options={options}
      />
    </div>
  );
}

UserList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserList);
