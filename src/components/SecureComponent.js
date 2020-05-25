import React from 'react';
import { Redirect } from 'react-router-dom';

const SecureComponent = (props) => (props.isLoggedIn) ? props.component : <Redirect to='/login' />;

export default SecureComponent;
