import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './login.js';
import SignIn from './signin.js';
import Blog from './Blog.js';
const App = (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/signin" component={SignIn} />
      <Redirect from="/login" to="/" />
      <Route path="/blog/:id" component={Blog} />
    </Switch>
  </BrowserRouter>
);

export default App;