import React, {useState, useCallback} from 'react';

export const NotificationContext = React.createContext({
  notification: null,
  sendNotification: () => {}
})

export const NotificationContextProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);
  const sendNotification = (message, type) => setNotification({type, message})

  const contextValue = {
    notification,
    sendNotification: useCallback((message, type) => sendNotification(message, type), []),
  }

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  )
}