import React from 'react';
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button } from '@material-ui/core';
import { useNotification } from '../../hooks/use-notification';
import { UserService } from '../../api'

export const RegistrationPage = () => {
  const history = useHistory();
  const { sendNotification } = useNotification()
  const { control, errors, handleSubmit } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange'
  });

  const onSubmit = (formData) => {
    UserService.register(formData).then(() => {
      sendNotification('Registration Successful', 'success')
      history.push('/login')
    }).catch(e => sendNotification(e, 'error'))
  };

  return <form className="users-form"  onSubmit={handleSubmit(onSubmit)}>
    <Controller
        as={TextField}
        name="name"
        control={control}
        rules={{required: true}}
        variant="outlined"
        label="User Name" 
        className="form-item form-input"
        helperText={errors?.email?.message ? "" : errors?.email?.message}
      />
      {errors.name?.type === "required" && <span className="validation-error">User Name is required</span>}
      
    <Controller
        as={TextField}
        name="email"
        control={control}
        rules={{required: true, pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/}}
        variant="outlined"
        label="Email Address" 
        className="form-item form-input"
        helperText={errors?.email?.message ? "" : errors?.email?.message}
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
      <Button variant="contained" color="primary" type="submit"> Register </Button>
      <Button variant="outlined" color="primary" onClick={() => history.push('/login')}> Sign In </Button>
    </div>
  </form>
}
