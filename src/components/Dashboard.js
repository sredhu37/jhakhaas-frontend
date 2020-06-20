import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, OverlayTrigger, Tooltip } from 'react-bootstrap';
import SecureComponent from './SecureComponent';

const Dashboard = (props) => {
  const [ topLeaders, setTopLeaders ] = useState([]);

  const loadLeaders = () => {
    const result = topLeaders.map((user, index) => {
      const rank = index + 1;

      return(
        <tr key={user._id}>
          <td>{rank}</td>
          <td>
            <OverlayTrigger
              placement='right'
              overlay={
                <Tooltip>
                  {user.email}
                </Tooltip>
              }
            >
              <img src={user.pictureUrl} className="dashboardImg" alt="userPic"></img>
            </OverlayTrigger>
          </td>
          <td>{ " " + user.name }</td>
          <td>{user.totalScore}</td>
        </tr>
      );
    });

    return result;
  }

  const loadMyData = () => {
    const alreadyInTopLeaders = topLeaders.find(user => user._id === props.myUser._id);

    if(alreadyInTopLeaders) {
      return null;
    } else {
      return (
        <tr key={props.myUser._id}>
          <td>{props.myUser.rank}</td>
          <td>
            <OverlayTrigger
              placement='right'
              overlay={
                <Tooltip>
                  {props.myUser.email}
                </Tooltip>
              }
            >
              <img src={props.myUser.pictureUrl} className="dashboardImg" alt="userPic"></img>
            </OverlayTrigger>
          </td>
          <td>{ " " + props.myUser.name }</td>
          <td>{props.myUser.totalScore}</td>
        </tr>
      );
    }
  }

  useEffect(() => {
    const getTop10List = async () => {
      try {
        const top10Leaders = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users/leaders`);
        console.log("Top leaders: ", top10Leaders.data);
        setTopLeaders(top10Leaders.data);
      } catch(error) {
        console.log("Unable to get top 10 list. Please inform Administrator immediately! Error: ", error);
      }
    };

    getTop10List();
  }, []);

  return(
    <SecureComponent isLoggedIn={props.isLoggedIn} component={
      <div>
        <Table striped bordered hover className="dashboardTable">
          <thead>
            <tr>
              <th>#</th>
              <th> </th>
              <th>User</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {loadLeaders()}
            {loadMyData()}
          </tbody>
        </Table>
      </div>
    } />
  );
};

export default Dashboard;
