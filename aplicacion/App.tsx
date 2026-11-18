import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { WikiNavigator } from "./src/navigator/WikiNavigation";
import { ThemeProvider } from "./src/theme/ThemeContext";
const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <WikiNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;