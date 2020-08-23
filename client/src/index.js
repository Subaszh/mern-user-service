import React from 'react';
import ReactDom from 'react-dom';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { LoginPage } from './pages';

const container = document.createElement('div');
document.body.appendChild(container);

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/reset" component={LoginPage} />
        <Route path="/register" component={LoginPage} />
        <Route path="/companies" component={LoginPage} />
      </Switch>
    </BrowserRouter>
  );
}

ReactDom.render(<App />, container);