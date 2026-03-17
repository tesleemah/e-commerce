import { View, Text } from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { BottomTabParamList } from "../../types/navigation";
import { useTheme } from "../../context/ThemeContext";

type Props = BottomTabScreenProps<BottomTabParamList, 'Cart'>;

export const CartScreen = ({ navigation }: Props)=> {
    const {classes} = useTheme();
    return <View className={`flex-1 justify-center items-center ${classes.background}`}>
        <Text className={classes.textPrimary}>
            Cart Screen
        </Text>
    </View>
};