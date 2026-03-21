import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { SplashScreen } from "../screens/Splash";
import { LoginScreen } from "../screens/auth/Login";
import { RegisterScreen } from "../screens/auth/Register";

const Stack = createNativeStackNavigator<RootStackParamList>()

export const AuthStack = ()=>{
    return(
        <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }} >
            <Stack.Screen name = {"Splash"} component={SplashScreen} />
            <Stack.Screen name = {"Login"} component={LoginScreen} />
            <Stack.Screen name = {"Register"} component={RegisterScreen} 
             />
            
        </Stack.Navigator>
    )


}

