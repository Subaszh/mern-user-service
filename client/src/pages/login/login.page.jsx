import React from 'react';
import { useHistory } from "react-router-dom";
import { TextField, Button } from '@material-ui/core';

import './login.page.css'

export const LoginPage = () => {
  const history = useHistory();
  return <form className="users-form" noValidate autoComplete="off">
    <TextField className="form-item form-input" label="User Name" variant="outlined" />
    <TextField className="form-item form-input" label="Email" variant="outlined" />
    <TextField className="form-item form-input" label="Password" variant="outlined" type="password"/>
    <div className="button-holder">
      <Button variant="contained" color="primary" > Login </Button>
      <Button variant="outlined" color="primary" onClick={() => history.push('/register')}> Register </Button>
    </div>
  </form>
}
