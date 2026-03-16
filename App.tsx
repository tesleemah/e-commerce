import "./global.css"
import { Text, View } from "react-native";
import { ThemeProvider } from "./src/context/ThemeContext";
 
export default function App() {
  return (
   <ThemeProvider>
     <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">
        Welcome to Nativewind!
      </Text>
    </View>
   </ThemeProvider>
  );
}