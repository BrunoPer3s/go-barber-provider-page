import React from 'react';
import {Switch} from 'react-router-dom';
import Route from './Route'; 

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import Profile from '../pages/Profile';


const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn}/>
      <Route path="/SignUp" exact component={SignUp}/>
      <Route path="/forgot-password" exact component={ForgotPassword}/>
      <Route path="/reset-password" exact component={ResetPassword}/>
      <Route path="/Dashboard" exact component={Dashboard} isPrivate/>
      <Route path="/profile" exact component={Profile} isPrivate/>
    </Switch>
  )
}

export default Routes
