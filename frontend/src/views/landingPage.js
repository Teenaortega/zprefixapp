import React from "react";
import { Link, Outlet } from "react-router-dom";
import getData from "../rest/getData";
import "./Landing.css";


export async function loader() {
  const data = await getData();
  return { data };
}

const Landing = () => {
  return (

    <>
      <div className="Landing"
        style={{
          backgroundImage: `url("https://www.netsuite.com/portal/assets/img/business-articles/inventory-management/social-inventory.jpg")`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          width: '100vw',
          height: '100vh',
          zIndex: 1,
          display: "flex",
          justifycontent: "center",
          alignItems: "center",
          flexDirection: "column"
        }}
      >
        <Link style={{ textDecoration: 'none' }} to="/users">
          <button id="button">
            <h1 className="text" style={{color:"white"}}>Enter Site</h1>
          </button>
        </Link>
        <footer className="text2" style={{color:"white"}}>Created by Teena Ortega for Galvanize</footer>
        <Outlet />
      </div>
    </>
  );
};

export default Landing;