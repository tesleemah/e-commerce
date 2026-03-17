import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomTabParamList } from "../types/navigation";
import { HomeScreen } from "../screens/main/Home";
import { WishlistScreen } from "../screens/main/Wishlist";
import { CartScreen } from "../screens/main/Cart";
import {ProfileScreen } from "../screens/main/Profile";
import { useTheme } from "../context/ThemeContext";

const Tab = createBottomTabNavigator<BottomTabParamList>()

export const TabNavigator = ()=>{
    const {classes} = useTheme();

    return (
       <Tab.Navigator screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0d1526',
          borderTopColor: '#1e2d4a',
          borderTopWidth: 0.5,
        },
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: '#475569',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
        },
      }}>
        <Tab.Screen name='Home' component= {HomeScreen} options={{ tabBarLabel: 'Home' }}/>
        <Tab.Screen name='Cart' component= {CartScreen} options={{ tabBarLabel: 'Cart' }}/>
        <Tab.Screen name='Profile' component= {ProfileScreen} options={{ tabBarLabel: 'Profile' }}/>
        <Tab.Screen name='Wishlist' component= {WishlistScreen} options={{ tabBarLabel: 'Wishlist' }}/>
        


       </Tab.Navigator>

    );
}