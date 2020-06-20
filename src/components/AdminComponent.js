import React from 'react';
import Unauthorized from './Unauthorized';

const AdminComponent = (props) => {
  return (props.myUser.role === 'ADMIN') ? props.component : <Unauthorized />;
}

export default AdminComponent;
