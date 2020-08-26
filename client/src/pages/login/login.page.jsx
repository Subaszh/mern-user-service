import React from 'react';
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import {TextField, Button} from '@material-ui/core';
import axios from 'axios'

import './login.page.css'

export const LoginPage = () => {
  const history = useHistory();
  
  const { control, errors, handleSubmit, formState } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur'
  });

  const onSubmit = async (formData) => {
    try {
      const { data } = await axios.post('http://localhost:3000/users/login', formData)
      localStorage.setItem('userId', data.id)
      history.push('/companies')
    } catch(e) {
      alert(e?.response.data.error || e)
    }
  };

  return <form className="users-form" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
    <Controller
        as={TextField}
        name="email"
        control={control}
        rules={{required: true, minLength: 5}}
        variant="outlined"
        label="Email Address" 
        className="form-item form-input"
        helperText={errors?.email?.message ? "" : errors?.email?.message}
      />
    <Controller
        as={TextField}
        name="password"
        control={control}
        rules={{required: true}}
        variant="outlined"
        label="Password" 
        className="form-item form-input"
        type="password"
      />
    <div className="button-holder">
      <Button variant="contained" color="primary" disabled={!formState.isValid} type="submit"> Login </Button>
      <Button variant="outlined" color="primary" onClick={() => history.push('/register')}> Register </Button>
    </div>
  </form>
}
