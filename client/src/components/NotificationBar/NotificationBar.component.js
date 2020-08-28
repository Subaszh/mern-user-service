import React, { useState, useEffect } from 'react'
import { useNotification } from '../../hooks/use-notification'
import { Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

export const NotificationBar = () => {
  const {notification, removeNotification} = useNotification()
  const [open, setOpen] = useState(true)
  
  const handleClose = () => {
    removeNotification()
    setOpen(false)
  }

  useEffect(()=> {
    setOpen(true)
  }, [notification])

  return (notification && 
    <Snackbar open={open} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      message={notification.message} autoHideDuration={5000} >
        <Alert severity={notification.type}>{notification.message}</Alert>
      </Snackbar>)
}