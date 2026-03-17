import { View, Text } from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { BottomTabParamList } from "../../types/navigation";
import { useTheme } from "../../context/ThemeContext";

type Props = BottomTabScreenProps<BottomTabParamList, 'Home'>;
export const HomeScreen = ({ navigation }: Props)=> {
    const {classes} = useTheme();
    return <View className={`flex-1 justify-center items-center ${classes.background}`}>
        <Text className={classes.textPrimary}>
            Home Screen
        </Text>
    </View>
};
