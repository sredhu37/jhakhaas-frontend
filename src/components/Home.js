import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const LoginOption = (props) => {
  if(!props.isLoggedIn) {
    return(
      <Link to='/login'>
        <Button>Login</Button>
      </Link>
    );
  } else {
    return null;
  }
};

const Home = (props) => {
  axios.defaults.withCredentials = true;
  const history = useHistory();

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      try {
        await axios.get("http://127.0.0.1:4000/auth/isLoggedIn");
        props.setIsLoggedIn(true);
        history.push("/question");
      } catch(error) {
        props.setIsLoggedIn(false);
      }
    }

    checkIfLoggedIn();
  });

  return(
    <div>
      This is home page.
      <LoginOption isLoggedIn={props.isLoggedIn} />
    </div>
  );
};

export default Home;