import { createStackNavigator, createAppContainer, createTabNavigator, createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import WorkspaceScreen from './screens/WorkspaceScreen';
import { StackViewStyleInterpolator } from 'react-navigation-stack';
import TaskDetailScreen from './screens/TaskDetailScreen';
import ProjectScreen from './screens/ProjectScreen';
import SplashScreen from './screens/SplashScreen';
import React from 'react'
import { Router, Scene, ActionConst, Stack } from 'react-native-router-flux';
import Modal from 'react-native-modal';


export const TabNavigator = createBottomTabNavigator({
  Workspace: WorkspaceScreen,
  Project: ProjectScreen
});

// const transitionConfig = ({
//   screenInterpolator: sceneProps => {
//     const { layout, position, scene } = sceneProps;
//     const { index } = scene;

//     const translateX = position.interpolate({
//         inputRange: [index - 1, index, index + 1],
//         outputRange: [layout.initWidth, 0, 0]
//     });

//     const opacity = position.interpolate({
//         inputRange: [
//             index - 1,
//             index - 0.99,
//             index,
//             index + 0.99,
//             index + 1
//         ],
//         outputRange: [0, 1, 1, 0.3, 0]
//     });

//     return { opacity, transform: [{ translateX }] };
//   }
// });

const transitionConfig = () => ({
  screenInterpolator: StackViewStyleInterpolator.forHorizontal
});

export const RootStack  = createStackNavigator({
  Project: {
    screen: ProjectScreen, 
    navigationOptions: {
        header: null
    }
  },
  Workspace: WorkspaceScreen,
  TaskDetail: TaskDetailScreen,
}, { transitionConfig: () => transitionConfig});

export const App = () => {
  return (
    <Router>
      <Scene 
        key="root"
        transitionConfig={transitionConfig}
        >
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
  );
}