import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { Grid, Card, CardContent } from '@material-ui/core';

import { LoginPage, RegistrationPage, ResetPasswordPage, CompaniesPage } from './pages';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Grid container className="center-container" justify="center" alignItems="center">
        <Grid item xs={8} sm={4}>
          <Card className="center-card">
            <CardContent>
              <Switch>
                <Route exact path="/" render={() => <Redirect to="/login" />} />
                <Route path="/login" component={LoginPage} />
                <Route path="/reset" component={ResetPasswordPage} />
                <Route path="/register" component={RegistrationPage} />
              </Switch>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </BrowserRouter>
  );
}

export default App;
