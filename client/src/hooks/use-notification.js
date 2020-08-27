import {useContext} from 'react'
import { NotificationContext } from "../context/Notification.context"

export const useNotification = () => {
  return useContext(NotificationContext)
}