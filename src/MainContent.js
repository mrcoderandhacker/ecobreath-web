import React from 'react';
import Dashboard from './Dashboard';
import Profiles from './Profiles';
import Controls from './Controls';
import Analytics from './Analytics';
import Settings from './Settings';
import MyPlants from './MyPlants';

const MainContent = ({ activePage }) => {
  switch (activePage) {
    case 'Dashboard':
      return <Dashboard />;
    case 'Profiles':
      return <Profiles />;
    case 'Controls':
      return <Controls />;
    case 'Analytics':
      return <Analytics />;
    case 'Settings':
      return <Settings />;
    case 'My Plants':
    default:
      return <MyPlants />;
  }
};

export default MainContent;
