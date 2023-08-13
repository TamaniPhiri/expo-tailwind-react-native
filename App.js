import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Navbar from "./components/Navbar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Details from "./screens/Details";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Navbar />
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false, presentation:"fullScreenModal" }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Details" component={Details} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
