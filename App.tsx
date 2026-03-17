import "./global.css"
import { Text, View } from "react-native";
import { ThemeProvider } from "./src/context/ThemeContext";
import { RootNavigator } from "./src/navigation";
 
export default function App() {
  return (
   <ThemeProvider>
     <RootNavigator/>
   </ThemeProvider>
  );
}