import React from 'react'
import { createStackNavigator, createAppContainer, createTabNavigator, createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import { Router, Scene, ActionConst, Stack } from 'react-native-router-flux';
import { StackViewStyleInterpolator } from 'react-navigation-stack';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import WorkspaceScreen from './screens/WorkspaceScreen';
import TaskDetailScreen from './screens/TaskDetailScreen';
import ProjectScreen from './screens/ProjectScreen';
import SplashScreen from './screens/SplashScreen';
import AllReducers from './reducers/AllReducers';

export const TabNavigator = createBottomTabNavigator({
  Workspace: WorkspaceScreen,
  Project: ProjectScreen
});

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