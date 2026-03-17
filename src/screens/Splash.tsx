import { View, Text,TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { useTheme } from "../context/ThemeContext";



type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export const SplashScreen = ({ navigation, route }: Props)=> {
    const {classes} = useTheme();
    return (
    <View className={`flex-1 justify-center items-center ${classes.background}`}>
        <Text className={classes.textPrimary}>
            Splash Screen
        </Text>
    </View>
    );
    
};
