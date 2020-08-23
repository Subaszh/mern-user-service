import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { LoginPage, RegistrationPage } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/reset" component={LoginPage} />
        <Route path="/register" component={RegistrationPage} />
        <Route path="/companies" component={RegistrationPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
