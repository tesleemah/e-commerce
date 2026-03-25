import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomTabParamList } from "../types/navigation";
import { HomeScreen } from "../screens/main/Home";
import { WishlistScreen } from "../screens/main/Wishlist";
import { CartScreen } from "../screens/main/Cart";
import { ProfileScreen } from "../screens/main/Profile";
import { useTheme } from "../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator<BottomTabParamList>();

export const TabNavigator = () => {
  const { classes, isDark } = useTheme();
  const tabcolor = isDark ? `${classes.background}` : "#3b82f6";
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          backgroundColor: tabcolor,
          borderTopColor: "#e5e7eb",
          borderTopWidth: 0.5,
          elevation: 5, // Optional: adds a slight shadow on Android
          shadowOpacity: 0.1,
        },
        tabBarActiveTintColor: "#3b82f6", // Blue for the active tab (standard for white themes)
        tabBarInactiveTintColor: "#9ca3af", // Gray for inactive tabs
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "500",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={22}
              color={focused ? classes.tabActive : classes.tabInactive}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Favorite"
        component={WishlistScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "heart" : "heart-outline"}
              size={22}
              color={focused ? classes.tabActive : classes.tabInactive}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "cart" : "cart-outline"}
              size={22}
              color={focused ? classes.tabActive : classes.tabInactive}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={22}
              color={focused ? classes.tabActive : classes.tabInactive}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
