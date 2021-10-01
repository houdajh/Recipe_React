import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AppL from './login/components/AppL'
import AppS from './signUp/components/AppS'
import reportWebVitals from './reportWebVitals';
import PrivateRoute from "./PrivateRoute"
import { AuthProvider } from "./context/AuthContext"

import { BrowserRouter as Router, Switch, Route } from "react-router-dom"



document.title = "Healthy food";
ReactDOM.render(
  
  <React.StrictMode>
    

    <Router>
    <AuthProvider>
        <Switch>
          <Route exact path="/signIn"  component={AppL} />
          <Route exact path="/signUp"  component={AppS} />
          <PrivateRoute exact path="/" component={App} />
        </Switch>
        </AuthProvider>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
