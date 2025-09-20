/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import HealthApp from './screens/HealthApp/login';
import {name as appName} from './app.json';
import ShowHideExample from './test3';

//AppRegistry.registerComponent(appName, () => App);
//AppRegistry.registerComponent(appName, () => ShowHideExample);
AppRegistry.registerComponent(appName, () => HealthApp);
