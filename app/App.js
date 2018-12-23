import React from 'react'
import { createStackNavigator, createAppContainer, createTabNavigator, createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import { Router, Scene, ActionConst, Stack, Lightbox, Overlay } from 'react-native-router-flux';
import { StackViewStyleInterpolator } from 'react-navigation-stack';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import WorkspaceScreen from './Screens/Workspace/WorkspaceScreen';
import TaskDetailScreen from './Screens/Detail/TaskDetailScreen';
import ProjectScreen from './Screens/Project/ProjectScreen';
import SplashScreen from './Screens/Splash/SplashScreen';
import AllReducers from './_Commons/AllReducers';
import SearchScreen from './Screens/Search/SearchScreen';
import SearchScreenWS from './Screens/Search/SearchScreenWS';
import EditLabelScreen from './Screens/Label/EditLabelScreen';
import Modal from 'react-native-modal';

const store = createStore(AllReducers);

const transitionConfig = () => ({
  screenInterpolator: StackViewStyleInterpolator.forHorizontal
});

const transitionConfigV2 = () => ({
  screenInterpolator: (props) => {
    switch (props.scene.route.params.direction) {
      case 'vertical':
        return StackViewStyleInterpolator.forVertical(props);
      case 'fade':
        return StackViewStyleInterpolator.forFade(props);
      case 'none':
        return StackViewStyleInterpolator.forInitial;
      case 'horizontal':
      default:
        return StackViewStyleInterpolator.forHorizontal(props)
    }
  }
});

export const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Overlay>
          <Modal key="modal" hideNavBar>
            <Stack key="root" transitionConfig={transitionConfigV2}>
              <Scene key="splash" component={SplashScreen} title="Splash" hideNavBar  />
              <Scene key="search" direction="fade" component={SearchScreen} title="Search" hideNavBar />
              <Scene key="searchws" direction="fade" component={SearchScreenWS} title="SearchWS" hideNavBar />
              <Scene key="project" direction="fade" component={ProjectScreen} title="Boards" hideNavBar initial/>
              <Scene key="workspace" direction="horizontal" component={WorkspaceScreen} title="Workspace" hideNavBar />
              <Scene key="detail" direction="vertical" component={TaskDetailScreen} title="Detail" hideNavBar />
              <Scene key="label" direction="fade" component={EditLabelScreen} title="Edit labels" hideNavBar />
            </Stack >
          </Modal>
        </Overlay>
      </Router>
    </Provider>
  );
}