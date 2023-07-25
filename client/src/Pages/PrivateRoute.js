import React from 'react';
import {Outlet} from 'react-router-dom';
import SignIn from './SignIn';

const PrivateRoute = ({auth}) => {
  //console.log(auth);
  return (
        auth?<Outlet/>:<SignIn/>
        
  );
};

export default PrivateRoute;
