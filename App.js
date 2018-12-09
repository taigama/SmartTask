import { createStackNavigator, createAppContainer, createTabNavigator, createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import WorkspaceScreen from './app/screens/WorkspaceScreen';
import TaskDetailScreen from './app/screens/TaskDetailScreen';
import ProjectScreen from './app/screens/ProjectScreen';
import SplashScreen from './app/screens/SplashScreen';


export const TabNavigator = createMaterialTopTabNavigator({
  Workspace: {
    screen: WorkspaceScreen,
    tabBarOptions: {
      activeTintColor: '#e91e63',
      labelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: 'blue',
      },
    }
  },
  Project: {
    screen: ProjectScreen,
    tabBarOptions: {
      activeTintColor: '#e91e63',
      labelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: 'blue',
      },
    }
  },
});


export const RootStack  = createStackNavigator({
  Splash: { 
    screen: SplashScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: 'Splash',
    }),
  },
  Project: { 
    screen: ProjectScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: 'Project',
    }),
  },
  Workspace: { 
    screen: WorkspaceScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: 'Workspace',
    }),
  },
  TaskDetail: { 
    screen: TaskDetailScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: 'TaskDetail',
    }),
  },
});

export const App = createAppContainer(TabNavigator);
