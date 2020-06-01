import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Question from './Question';
import NavBar from './NavBar';
import Home from './Home';
import Dashboard from './Dashboard';
import Profile from './Profile';
import Unauthorized from './Unauthorized';

const App = () => {
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [ myEmail, setMyEmail ] = useState("");
  const [ myPictureUrl, setMyPictureUrl ] = useState("");
  const [ myTotalScore, setMyTotalScore ] = useState(0);

  return(
    <div>
      <Router>
        <NavBar
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          myPictureUrl={myPictureUrl}
        />
        <Switch>
          <Route path="/question">
            <Question isLoggedIn={isLoggedIn} />
          </Route>
          <Route path="/profile">
            <Profile
              isLoggedIn={isLoggedIn}
              myEmail={myEmail}
              setMyEmail={setMyEmail}
              myPictureUrl={myPictureUrl}
              setMyPictureUrl={setMyPictureUrl}
              myTotalScore={myTotalScore}
              setMyTotalScore={setMyTotalScore}
            />
          </Route>
          <Route path="/dashboard">
            <Dashboard
              isLoggedIn={isLoggedIn}
              myEmail={myEmail}
              myPictureUrl={myPictureUrl}
              myTotalScore={myTotalScore}
            />
          </Route>
          <Route path="/unauthorized">
            <Unauthorized isLoggedIn={isLoggedIn} />
          </Route>
          <Route path="/" exact>
            <Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;