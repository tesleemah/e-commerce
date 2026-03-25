import "./global.css";
import { View } from "react-native";
import { ThemeProvider } from "./src/context/ThemeContext";
import { RootNavigator } from "./src/navigation/";
import { AuthProvider } from "./src/context/AuthContext";

export default function App() {
  return (
    <View className="bg-red-500 flex-1">
      <ThemeProvider>
        <AuthProvider>
          <RootNavigator />
        </AuthProvider>
      </ThemeProvider>
    </View>
  );
}
