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

  return <form className="users-form" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
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
    <Controller
        as={TextField}
        name="email"
        control={control}
        rules={{required: true}}
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
      <Button variant="contained" color="primary" type="submit"> Register </Button>
      <Button variant="outlined" color="primary" onClick={() => history.push('/login')}> Sign In </Button>
    </div>
  </form>
}
