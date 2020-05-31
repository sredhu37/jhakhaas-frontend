import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Home = (props) => {
  axios.defaults.withCredentials = true;
  const history = useHistory();

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      try {
        await axios.get(`${process.env.REACT_APP_SERVER_URL}/auth/isLoggedIn`);
        props.setIsLoggedIn(true);
        history.push("/profile");
      } catch(error) {
        props.setIsLoggedIn(false);
      }
    }

    checkIfLoggedIn();
  });

  return(
    <div>
      This is home page.
    </div>
  );
};

export default Home;