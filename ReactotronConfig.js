import Reactotron from 'reactotron-react-native';
import { NativeModules } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
let scriptHostname;
if (__DEV__) {
  const scriptURL = NativeModules.SourceCode.scriptURL;
  scriptHostname = scriptURL.split('://')[1].split(':')[0];
}
Reactotron.setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from react-native or @react-native-community/async-storage depending on where you get it from
  .configure({ host: scriptHostname }) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect();
