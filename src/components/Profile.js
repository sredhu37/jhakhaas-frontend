import React from 'react';
import SecureComponent from './SecureComponent';

const Profile = (props) => {
  return(
    <SecureComponent isLoggedIn={props.isLoggedIn} component={
      <div>
        This is profile.
      </div>
    } />
  );
};

export default Profile;
