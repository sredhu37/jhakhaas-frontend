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
              <img src={user.pictureUrl} className="dashboardImg"></img>
            </OverlayTrigger>
          </td>
          <td>{user.totalScore}</td>
        </tr>
      );
    });

    return result;
  }

  useEffect(() => {
    const getTop10List = async () => {
      try {
        const top10Leaders = await axios.get("http://127.0.0.1:4000/api/users/leaders");
        console.log("Top leaders: ", top10Leaders.data);
        setTopLeaders(top10Leaders.data);
      } catch(error) {
        console.log("Unable to get top 10 list. Please inform Sunny immediately! Error: ", error);
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
              <th>User</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {loadLeaders()}
          </tbody>
        </Table>
      </div>
    } />
  );
};

export default Dashboard;
