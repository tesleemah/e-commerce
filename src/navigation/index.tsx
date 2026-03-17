import { NavigationContainer } from "@react-navigation/native";
import { AuthStack } from "./AuthStack";
import { AppStack } from "./AppStack";


export const RootNavigator = () =>{
    const isLoggedIn = false;
    return (
        <NavigationContainer>
            {isLoggedIn? <AppStack/> : <AuthStack/>}
        </NavigationContainer>
    )
}