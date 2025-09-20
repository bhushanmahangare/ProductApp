import React from 'react';
import LocalProductApp from './screens/LocalProduct/LocalProductApp';
//import APIProductApp from './screens/APIProduct/APIProductApp';
//import BottomUpNavigation from './screens/BottomUPNavigation/BottomUpNavigation';
//import BottomUpNavigationWithFocus from './screens/BottomUPNavigation/BottomUpNavigationWithFocus';
import { ThemeProvider, useTheme } from './context/ThemeContext';

function App(): React.JSX.Element {
  return (
      <ThemeProvider>
        <LocalProductApp />;
      </ThemeProvider>
  )
  //return <APIProductApp />
  //return <BottomUpNavigation />;
  //return <BottomUpNavigationWithFocus />;
}
export default App;
