import React from 'react'
import { createStackNavigator, createAppContainer, createTabNavigator, createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import { Router, Scene, ActionConst, Stack } from 'react-native-router-flux';
import { StackViewStyleInterpolator } from 'react-navigation-stack';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import DevelopeScreen from './Screens/Develope/DevelopeScreen';
import WorkspaceScreen from './Screens/Workspace/WorkspaceScreen';
import TaskDetailScreen from './Screens/CardDetail/TaskDetailScreen';
import ProjectScreen from './Screens/Project/ProjectScreen';
import SplashScreen from './Screens/Splash/SplashScreen';
import AllReducers from './_Commons/AllReducers';
import SearchScreen from './Screens/Search/SearchScreen';

const transitionConfig = () => ({
  screenInterpolator: StackViewStyleInterpolator.forHorizontal
});

const store = createStore(AllReducers);

export const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Scene key="root"
          transitionConfig={transitionConfig}
          >
           <Scene key="develope"
            component={DevelopeScreen}
            title="Splash"
            hideNavBar
          />
           <Scene key="search"
            component={SearchScreen}
            title="Splash"
            hideNavBar
            
          />
           <Scene key="splash"
            component={SplashScreen}
            title="Splash"
            hideNavBar
          />
          <Scene key="project"
            component={ProjectScreen}
            title="Boards"
            initial
            hideNavBar
          />
          <Scene 
            key="workspace"
            component={WorkspaceScreen}
            title="Boards' name"
            hideNavBar
          />
        </Scene>
      </Router>
    </Provider>
  );
}