import React from 'react'
import { StackViewStyleInterpolator } from 'react-navigation-stack';
import DevelopeScreen from './Screens/Develope/DevelopeScreen';

const transitionConfig = () => ({
  screenInterpolator: StackViewStyleInterpolator.forHorizontal
});

export const App = () => {
  return (
    <Router>
      <Scene key="root"
        transitionConfig={transitionConfig}
      >
        <Scene key="develope"
          component={DevelopeScreen}
          title="Splash"
          hideNavBar
        />
      </Router>
  );
}