import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import { Button, Checkbox, CircularProgress, FormGroup } from '@material-ui/core';
import { useState } from 'react';
import MessagesForm from '../../../components/Forms/MessagesForm';
import { createUsers, updateUsers } from '../../../api/services/users';
import { getRoles } from '../../../api/services/roles';
import { useEffect } from 'react';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 30
  },
  container: {
    display: 'flex',
    flexDirection: 'row'
  },
  inputBlock: {
    flex: 1,
    margin: 10
  },
  button: {
    marginLeft: 'auto',
    alignSelf: 'center'
  },
  buttonProgress: {
    color: theme.palette.text.secondary,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  msgUser: {
    marginLeft: '0'
  }
});

function UserDetailsForm(props) {
  const { userDetails, history } = props

  const [userName, setName] = useState(userDetails.name)
  const [userEmail, setEmail] = useState(userDetails.email)
  const [userPassword, setPassword] = useState('')
  const [userRoles, setUserRoles] = useState(userDetails.roles)

  const [loading, setLoading] = useState(false)
  const [errMsg, setErrMsg] = useState(null)

  const [roleList, setRoleList] = useState([])
  const fetchRoles = async () => {
    try {
      let { data } = await getRoles()
      setRoleList(data)
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchRoles()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (userRoles.length === 0) {
      setErrMsg("Please select a Role")
      return
    }
    setLoading(true)
    try {
      let userData = {
        id: userDetails.id
      }
      if (userName !== '') userData.name = userName
      if (userEmail !== '') userData.email = userEmail
      if (userPassword !== '') userData.password = userPassword
      userData.roles = userRoles

      let data = userDetails.id === 0 ? await createUsers(userData) : await updateUsers(userData)
      if (data.status === 200) {
        history.push('/app/users')
      } else {
        setErrMsg(data.message.message)
      }
    } catch (err) {
      setErrMsg('Some error occurred')
    }
    setLoading(false)
  }

  const {
    classes
  } = props;

  return (
    <div>
      <Grid container spacing={3} alignItems="flex-start" direction="row" justify="center">
        <Grid item xs={11}>
          <Paper className={classes.root}>
            <Typography variant="h5" component="h3">
              User Details
            </Typography>
            <form onSubmit={handleSubmit}>
              <div className={classes.container}>
                <div className={classes.inputBlock}>
                  <FormControl fullWidth className={classes.formControl}>
                    <InputLabel htmlFor="name">Name</InputLabel>
                    <Input required={userDetails.id == 0} inputProps={{ maxlength: 64 }} id="name" value={userName} onChange={e => setName(e.target.value)} />
                  </FormControl>
                </div>
                <div className={classes.inputBlock}>
                  <FormControl fullWidth className={classes.formControl}>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input required={userDetails.id == 0} inputProps={{ maxlength: 128 }} id="email" type="email" value={userEmail} onChange={e => setEmail(e.target.value)} />
                  </FormControl>
                </div>
              </div>
              <div className={classes.container}>
                <div className={classes.inputBlock}>
                  <FormControl fullWidth className={classes.formControl}>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input required={userDetails.id == 0} inputProps={{ maxlength: 32 }} id="password" type="password" value={userPassword} onChange={e => setPassword(e.target.value)} />
                  </FormControl>
                </div>
                <div className={classes.inputBlock}></div>
              </div>
              <div className={classes.inputBlock}>
                <FormLabel>Roles</FormLabel>
                <FormGroup row>
                  {roleList.map((role, index) => (
                    <FormControlLabel key={index}
                      control={(
                        <Checkbox checked={userRoles.indexOf(role.id) > -1} onChange={() => {
                          let ur = Object.assign([], userRoles)
                          if (ur.indexOf(role.id) > -1) {
                            ur.splice(ur.indexOf(role.id), 1)
                          } else {
                            ur.push(role.id)
                          }
                          setUserRoles(ur)
                        }} />
                      )}
                      label={role.name}
                    />
                  ))}
                </FormGroup>
              </div>
              <div className={classes.container}>
                {errMsg && (
                  <MessagesForm
                    variant="error"
                    className={classes.msgUser}
                    message={errMsg}
                    onClose={() => { setErrMsg(null) }}
                  />
                )}
                <Button variant="contained" disabled={loading} color="primary" className={classes.button} type="submit">
                  {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                  Save
                </Button>
              </div>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

UserDetailsForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserDetailsForm);
