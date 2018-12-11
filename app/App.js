import { createStackNavigator, createAppContainer, createTabNavigator, createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import WorkspaceScreen from './screens/WorkspaceScreen';
import TaskDetailScreen from './screens/TaskDetailScreen';
import ProjectScreen from './screens/ProjectScreen';
import SplashScreen from './screens/SplashScreen';


export const TabNavigator = createBottomTabNavigator({
  Workspace: WorkspaceScreen,
  Project: ProjectScreen
});


export const RootStack  = createStackNavigator({
  Workspace: WorkspaceScreen,
  Project: ProjectScreen,
  TaskDetail: TaskDetailScreen,
});

export const App = createAppContainer(RootStack);
