import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login';
import Question from './Question';

const App = () => {
  const [jwt, setJwt] = useState("");

  return(
    <div>
      <Router>
        <Switch>
          <Route
            path="/"
            exact
            render={
              props => (
                <Login
                  {...props}
                  setJwt={ setJwt }
                />
              )
            }
          />
          <Route
            path="/question"
            render={
              props => (
                <Question
                  {...props}
                  jwt={ jwt }
                />
              )
            }
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;