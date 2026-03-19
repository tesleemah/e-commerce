import { NavigationContainer } from "@react-navigation/native";
import { AuthStack } from "./AuthStack";
import { AppStack } from "./AppStack";
import { useAuth } from "../context/AuthContext";
import { ActivityIndicator, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

export const RootNavigator = () =>{
    const { user, isLoading } = useAuth();
    const { classes } = useTheme()
    if (isLoading){
 return (
        <View className={`flex-1 justify-center items-center ${classes.background}`}>
            <ActivityIndicator size="large" color="#2563EB" />
        </View>
    );
}
    return (
        <NavigationContainer>
            {user? <AppStack/> : <AuthStack/>}
        </NavigationContainer>
    );
};