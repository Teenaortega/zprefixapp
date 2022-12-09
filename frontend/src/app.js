import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Users from "./views/users";
import Landing from "./views/landingPage";
import Items from "./views/items";
import NewItem from "./views/newItem";
import UserContext from "./components/UserContext";
import NavigationLayout from "./views/NavigationLayout";
import Box from '@mui/material/Box';
import Item from "./views/singleitem";

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
                <Route path="/" element={<Landing />} />
                <Route element={<NavigationLayout/>}>
                  <Route path="/users" element={<Users />} />
                  <Route path="/items" element={<Items />} />
                  <Route path="/newitem" element={<NewItem />} />
                  <Route path="/items/:id" element={<Item />} />
              </Route>
              </Routes>
            </UserContext.Provider>
          </header>
        </Box>
      </div>
    </>
  );
}

export default App;
