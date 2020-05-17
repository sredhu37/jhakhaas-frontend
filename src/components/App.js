import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login';
import Question from './Question';

const App = () => {
  return(
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/question" component={ Question } />
        </Switch>
      </Router>
    </div>
  );
}

export default App;