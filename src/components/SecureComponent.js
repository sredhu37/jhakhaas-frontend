import React from 'react';
import { Redirect } from 'react-router-dom';

const SecureComponent = (props) => {
  return (props.isLoggedIn) ? props.component : <Redirect to='/' />;
}

export default SecureComponent;
