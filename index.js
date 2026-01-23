/**
 * @format
 */
if (!__DEV__) {
    console.log = () => {};
    console.warn = () => {};
  }

import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

const RNApp = props => {
    return (
    //   <Provider store={store}>
        <App props={props} />
    //   </Provider>
    );
  };

AppRegistry.registerComponent(appName, () => RNApp);
