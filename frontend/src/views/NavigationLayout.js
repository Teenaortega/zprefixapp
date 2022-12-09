import React from 'react';
import { Outlet } from 'react-router';
import Navigation from '../components/Navigation';

const ContentLayout = () => {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
};

export default ContentLayout;