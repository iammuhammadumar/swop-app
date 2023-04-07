import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';

import { name as appName } from './app.json';
import RootApp from './src';

if (__DEV__) {
  import('./ReactotronConfig').then(() => {});
}

AppRegistry.registerComponent(appName, () => RootApp);
