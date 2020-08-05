import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Question from './Question';
import QuestionForm from './QuestionHelperComponents/QuestionForm';
import NavBar from './NavBar';
import Home from './Home';
import Dashboard from './Dashboard';
import UploadQuestions from './UploadQuestions';
import Profile from './Profile';
import Unauthorized from './Unauthorized';

const App = () => {
  axios.defaults.withCredentials = true;
  
  /**
   * Following lines are added for production security
   * https://www.chromestatus.com/feature/5088147346030592
   * https://www.chromestatus.com/feature/5633521622188032
   * */
  axios.defaults.headers['SameSite'] = 'None';
  axios.defaults.headers['Secure'] = true;

  return(
    <div>
      <Router>
        <NavBar />
        <Switch>
          <Route path="/questions">
            <Question />
          </Route>
          <Route path="/question-form/:questionId">
            <QuestionForm />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/upload-questions">
            <UploadQuestions />
          </Route>
          <Route path="/unauthorized">
            <Unauthorized />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;