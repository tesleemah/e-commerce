import "./global.css";
import { View } from "react-native";
import { ThemeProvider } from "./src/context/ThemeContext";
import { RootNavigator } from "./src/navigation/";
import { AuthProvider } from "./src/context/AuthContext";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { CartProvider } from "./src/context/CartContext";

export default function App() {
  return (
    <View className="bg-red-500 flex-1">
      <ThemeProvider>
        <CartProvider>
          <AuthProvider>
            <RootNavigator />
          </AuthProvider>
        </CartProvider>
      </ThemeProvider>
    </View>
  );
}
