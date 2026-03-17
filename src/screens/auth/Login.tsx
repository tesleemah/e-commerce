import { View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import { useTheme } from "../../context/ThemeContext";
type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen = ({ navigation }: Props)=> {
    const {classes} = useTheme();
    return (<View className={`flex-1 justify-center items-center ${classes.background}`}>
        <Text className={classes.textPrimary}>
            LogIn Screen
        </Text>
    </View>
    );
    
};
export {LoginScreen};