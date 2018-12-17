import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import { App, Dev } from './app/App';

AppRegistry.registerComponent(appName, () => App);
