import React from 'react';
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button } from '@material-ui/core';
import { useNotification } from '../../hooks/use-notification';
import { UserService } from '../../api'

import './login.page.css'

export const LoginPage = () => {
  const history = useHistory();
  const { sendNotification } = useNotification()

  const { control, errors, handleSubmit } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange'
  });

  const onSubmit = (formData) => {
    UserService.login(formData).then(userId => {
      if(userId) {
        sendNotification("Login Successfull", "success")
        localStorage.setItem('userId', userId)
        history.push('/companies')
      }
    }).catch(e => sendNotification(e, "error"))
  };

  return <form className="users-form" onSubmit={handleSubmit(onSubmit)}>
    <Controller
        as={TextField}
        name="email"
        control={control}
        rules={{required: true, pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/}}
        variant="outlined"
        label="Email Address" 
        className="form-item form-input"
      />
      {errors.email?.type === "required" && <span className="validation-error">Email is required</span>}
      {errors.email?.type === "pattern" && <span className="validation-error">Not a Valid Email</span>}
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
      {errors.password?.type === "required" && <span className="validation-error">Password is required</span>}
    <div className="button-holder">
      <Button variant="contained" color="primary" type="submit"> Login </Button>
      <Button variant="outlined" color="primary" onClick={() => history.push('/register')}> Register </Button>
      <Button variant="outlined" color="primary" onClick={() => history.push('/reset-password')}> Reset Password </Button>
    </div>
  </form>
}
