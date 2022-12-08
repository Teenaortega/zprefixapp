import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
// import Landing from "./views/Landing";
import Users from "./views/users";
// import UserGrid from "./components/UserGrid.js";
// import Member from "./views/Member";
import UserContext from "./components/UserContext";
// import SplashLayout from "./views/SplashLayout";
// import ContentLayout from "./views/ContentLayout";
// import AddMember from "./components/AddMember.js";
// import AddCert from "./components/AddCert.js";
// import ErrorPage from "./views/ErrorPage";
// import Navbar from "./components/Navbar";
import Box from '@mui/material/Box';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const options = new Headers({
        'Content-type': 'application/json',
      });
      const res = await fetch('http://localhost:8081/Users', options);
      const data = await res.json();
      setUserList(data);
    }
    getData()
      .catch(console.log)
  }, []);

  return (
    <>
      {/* <Navbar /> */}
      <div className="App">
        <Box>
          <header className="App-header">
            <UserContext.Provider value={[
              userList,
              setUserList,
              searchTerm,
              setSearchTerm
            ]}>
              <Routes>
                {/* <Route element={<SplashLayout />} >  */}
                  {/* <Route path="/" element={<Landing />} />
                </Route>
                {/* <Route element={<ContentLayout />} > */}
                  {/* <Route path="/trainings" element={<AllTraining />} /> */}
                  <Route path="/users" element={<Users />} />
                  {/* <Route path="/home/users/:id" element={<Member />} />
                  <Route path="/add-member" element={<AddMember />} />
                  <Route path="/add-item" element={<AddCert />} />
                  <Route path="/*" element={<ErrorPage />} /> */}
                {/* </Route> */}

              </Routes>
            </UserContext.Provider>
          </header>
        </Box>
      </div>
    </>
  );
}

export default App;
