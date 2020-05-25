import React from 'react';
import { Link } from 'react-router-dom';

const Home = (props) => {
  if(props.isLoggedIn) {
    return(
      <div>
        Already logged in.
      </div>
    );
  } else {
    return(
      <div>
        This is home page.
        <Link to='/login'>Login</Link>
      </div>
    );
  }
};

export default Home;