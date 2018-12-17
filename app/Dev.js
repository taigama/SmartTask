import React from 'react'
import { createStackNavigator, createAppContainer, createTabNavigator, createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import { Router, Scene, ActionConst, Stack } from 'react-native-router-flux';
import { StackViewStyleInterpolator } from 'react-navigation-stack';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

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