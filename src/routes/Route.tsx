import React, { ComponentType } from 'react';
import {useAuth} from '../hooks/Auth';

import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect
} from 'react-router-dom';
interface RouteProps extends ReactDOMRouteProps  {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({ isPrivate = false, component: Component, ...rest}) => {
  const {token} = useAuth();

  return (
    <ReactDOMRoute 
    {...rest}
    render={({location}) => {
      return isPrivate === !!token ? (
        <Component/>
      ) : (
        <Redirect to={{
          pathname: isPrivate ? '/' : '/Dashboard',
          state: {from: location}
        }}/>
      )
    }}
    />
      
  )
};

export default Route;