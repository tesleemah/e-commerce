import { View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import { useTheme } from "../../context/ThemeContext";

type Props = NativeStackScreenProps<RootStackParamList, "ProductDetails">;

export const ProductDetailsScreen = ({ navigation, route }: Props) => {
  const { classes } = useTheme();
  return (
    <View
      className={`flex-1 justify-center items-center ${classes.background}`}
    >
      <Text className={classes.textPrimary}>Product Details Screen</Text>
    </View>
  );
};
