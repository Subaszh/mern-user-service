import React from 'react';
import { TextField, Button } from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { UserService } from '../../api';
import { useNotification } from '../../hooks/use-notification';

export const ResetPasswordPage = () => {
  const history = useHistory()
  const { sendNotification } = useNotification()

  const { handleSubmit, control, errors } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange'
  });

  const onSubmit = async (formData) => {
    UserService.resetPassword(formData).then(() => {
      sendNotification('Password successfully reset', 'success')
      history.push('/login')
    }).catch(e => sendNotification(e, 'error'))
  };

  return <form className="users-form" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)} >  
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
      name="currentPassword"
      control={control}
      rules={{required: true}}
      variant="outlined"
      label="Current Password" 
      className="form-item form-input"
      type="password"
    />
  
  <Controller
      as={TextField}
      name="newPassword"
      control={control}
      rules={{required: true}}
      variant="outlined"
      label="New Password" 
      className="form-item form-input"
      type="password"
    />

  <div className="button-holder">
    <Button variant="contained" color="primary" type="submit"> Reset Password </Button>
    <Button variant="outlined" color="primary" onClick={() => history.push('/login')}> Go back to Login </Button>
  </div>
</form>
}
