import { NavigationContainer } from "@react-navigation/native"
import Navigation from "./src/navigation/Navigation";
import { Provider } from "react-redux";
import store from "./src/store/index"
import { SafeAreaView } from "react-native-safe-area-context";

const App = () => {
  return (
    <Provider store={store} >
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
}

export default App

