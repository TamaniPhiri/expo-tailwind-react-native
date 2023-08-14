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
