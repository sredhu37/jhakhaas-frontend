import React from 'react';
import SecureComponent from './SecureComponent';

const Dashboard = (props) => {
  return(
    <SecureComponent isLoggedIn={props.isLoggedIn} component={
      <div>
        This is dashboard.
      </div>
    } />
  );
};

export default Dashboard;
