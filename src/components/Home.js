import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';

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
  return(
    <div>
      This is home page.
      <LoginOption isLoggedIn={props.isLoggedIn} />
    </div>
  );
};

export default Home;