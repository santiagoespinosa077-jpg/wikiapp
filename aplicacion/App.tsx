import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { WikiNavigator } from "./src/navigator/WikiNavigation";
const App = () => {
  return(
  <NavigationContainer>
    <WikiNavigator/>
  </NavigationContainer>
  );
}

export default App;