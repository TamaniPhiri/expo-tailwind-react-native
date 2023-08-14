import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-reanimated";
import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <SafeAreaProvider>
        <StatusBar style="light" />
        <Home/>
    </SafeAreaProvider>
  );
}
