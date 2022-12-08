import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import UserGrid from "../components/UserGrid";
import UserContext from '../components/UserContext';

const Home = () => {
  const [userList] = useContext(UserContext);
  const [setUserData] = useState(userList);
  const { search } = useLocation('');
  const [queryType, queryTerm] = (search.split('='));

  useEffect(() => {
    if (userList) {
      setUserData(
        userList.filter((user) => user.l_name?.toLowerCase().includes(queryTerm))
      );
    }
  }, [setUserData, userList, queryTerm, queryType]);

  const userNav = useNavigate();
  const handleClick = (id) => {
    userNav(`users/${id}`);
  }

  const columns = [
    { field: 'id', headerName: 'Profile', headerClassName: 'headers', hide: true },
    { field: 'l_name', headerName: 'Last Name', flex: 1, headerClassName: 'headers', },
    { field: 'f_name', headerName: 'First Name', flex: 1, headerClassName: 'headers', },
    {
      field: 'Profile',
      flex: .5,
      headerClassName: 'headers',
      renderCell: (cellValues) => {
        return (
          <IconButton
            onClick={() => handleClick(cellValues.id)}
          >
            <AccountCircleIcon />
          </IconButton>
        )
      }
    },
  ];

  return (
    <div style={{ height: '85vh', width: '75%', display: 'flex' }}>
      <UserGrid columns={columns} data={userList} />
    </div>
  );
};

export default Home;