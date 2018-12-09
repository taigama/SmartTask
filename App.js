import { createStackNavigator, createAppContainer, createTabNavigator, createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import WorkspaceScreen from './app/screens/WorkspaceScreen';
import TaskDetailScreen from './app/screens/TaskDetailScreen';
import ProjectScreen from './app/screens/ProjectScreen';
import SplashScreen from './app/screens/SplashScreen';


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
