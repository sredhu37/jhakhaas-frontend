import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login';
import Question from './Question';

const App = () => {
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