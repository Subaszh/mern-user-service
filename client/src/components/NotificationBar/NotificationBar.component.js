import React, { useState } from 'react'
import { useNotification } from '../../hooks/use-notification'
import { Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

export const NotificationBar = () => {
  const {notification} = useNotification()
  const [open, setOpen] = useState(true)
  
  const handleClose = () => {
    setOpen(false)
  }

  return (notification && 
    <Snackbar key={Math.random()} open={open} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      message={notification.message} autoHideDuration={5000} >
        <Alert severity={notification.type}>{notification.message}</Alert>
      </Snackbar>)
}