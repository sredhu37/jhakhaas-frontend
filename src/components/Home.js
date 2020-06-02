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
    <div className="homeDiv">
      <h1>Frequently asked questions</h1>
      <ol>
        <li>
          <h3>What is this app about?</h3>
          <p>
            We believe that improving oneself is a continuous process.
            Hence, we have come up with a simple concept to improve one's problem solving skill.
            That is just solve <b>ONE QUESTION PER DAY</b>.</p>
            By following this principle, you will not feel overwhelmed and you will learn something everyday.
        </li>
        <li>
          <h3>Why this name JhaKhaas?</h3>
          <p>
            I got this idea from a person who gets a feeling of satisfaction by solving aptitude problems.
            First name which came to my mind was <b><i>Chalo Sawaal Banate Hain</i></b>. But that's more like a tagline instead of name of an app.

            Then I thought, why not give it name of the person who gave me the idea.
            Hence, <b>Jha => Jha Parivar => Jha Specials => JhaKhaas</b> (which also means Awesome, Epic, Cool). 
          </p>
        </li>
        <li>
          <h3>How to use this app?</h3>
          <ul>
            <li>
              To login you need to have a gmail account.
            </li>
            <li>
              After logging in, you will see your <i>Profile</i>.
            </li>
            <li>
              You can click on the <i>Question</i> tab to attempt today's question.
            </li>
            <li>
              You can read the question, solve it and come back later to answer it within the same day.
            </li>
            <li>
              You cannot attempt a question more than 3 times.
            </li>
            <li>
              For every correct answer, you get 1 point. No negative marking.
            </li>
            <li>
              Dashboard tab means Leader's dashboard. You can check your current rank there.
            </li>
            <li>
              To go to your profile page, click on your Photo on the top right corner.
            </li>
          </ul>
        </li>
        <li>
          <h3>How to contact the developer?</h3>          
          Please reach out to me at <b><i>redhu.sunny1994@gmail.com</i></b> in any of the following cases:
          <ul>
            <li>
              You have good interesting problems you want on this app.
            </li>
            <li>
              You want a new feature to be added here.
            </li>
            <li>
              There is a bug in this app.
            </li>
            <li>
              You have any other good idea that can be implemented.
            </li>
            <li>
              Or just to say Hi!
            </li>
          </ul>
        </li>
        <li>
          In the end, I would like to say:
          <h4>Chalo Sawaal Banate Hain</h4>
        </li>
      </ol>
    </div>
  );
};

export default Home;