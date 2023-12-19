/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";

/**
 * Need to import react-native-get-random-values for uuid to work
 */
import 'react-native-get-random-values'

AppRegistry.registerComponent(appName, () => App);
