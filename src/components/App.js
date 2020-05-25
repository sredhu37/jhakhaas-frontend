import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login';
import Question from './Question';
import NavBar from './NavBar';
import Home from './Home';
import Dashboard from './Dashboard';
import Profile from './Profile';
import Unauthorized from './Unauthorized';

const App = () => {
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);

  return(
    <div>
      <Router>
        <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Switch>
          <Route path="/login">
            <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          </Route>
          <Route path="/question">
            <Question isLoggedIn={isLoggedIn} />
          </Route>
          <Route path="/profile">
            <Profile isLoggedIn={isLoggedIn} />
          </Route>
          <Route path="/dashboard">
            <Dashboard isLoggedIn={isLoggedIn} />
          </Route>
          <Route path="/unauthorized">
            <Unauthorized isLoggedIn={isLoggedIn} />
          </Route>
          <Route path="/" exact>
            <Home isLoggedIn={isLoggedIn} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;