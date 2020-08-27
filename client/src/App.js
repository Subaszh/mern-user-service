import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { Grid, Card, CardContent } from '@material-ui/core';
import {NotificationContextProvider} from "./context/Notification.context"
import { LoginPage, RegistrationPage, ResetPasswordPage, CompaniesPage } from './pages';
import { NotificationBar } from './components';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <NotificationContextProvider>
        <Switch>
          <Route path="/companies" component={CompaniesPage} />
          <Grid container className="center-container" justify="center" alignItems="center">
            <Grid item xs={8} sm={4}>
              <Card className="center-card">
                <CardContent>
                  <Route path="/reset-password" component={ResetPasswordPage} />
                  <Route path="/login" component={LoginPage} />
                  <Route path="/register" component={RegistrationPage} />
                  <Route path="/*" render={() => <Redirect to="/login" />} />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Switch>
        <NotificationBar />
      </NotificationContextProvider>
    </BrowserRouter>
  );
}

export default App;
