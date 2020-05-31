import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SecureComponent from './SecureComponent';

const Profile = (props) => {
  const [ content, setContent ] = useState("This is the profile page");

  useEffect(() => {
    const getProfile = async () => {
      try {
        const profile = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users/profile`);
        if(profile) {
          console.log(profile.data);
          setContent(JSON.stringify(profile.data));
        } else {
          throw new Error("Couldn't receive profile from the server. Inform Sunny immediately!")
        }
      } catch(error) {
        console.log(error);
      }
    };

    getProfile();
  });

  return(
    <SecureComponent isLoggedIn={props.isLoggedIn} component={
      <div>
        {content}
      </div>
    } />
  );
};

export default Profile;
