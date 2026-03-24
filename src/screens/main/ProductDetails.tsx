import { View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import { useTheme } from "../../context/ThemeContext";
import { useCallback, useState } from "react";

type Props = NativeStackScreenProps<RootStackParamList, "ProductDetails">;

export const ProductDetailsScreen = ({ navigation, route }: Props) => {
<<<<<<< HEAD
  // useCallback optimization — prevents recreation on every render
  const increment = useCallback(() => {
    setQuantity((prev) => prev + 1);
  }, []);

  const decrement = useCallback(() => {
    setQuantity((prev) => Math.max(1, prev - 1));
  }, []);
  const { classes } = useTheme();
  const [quantity, setQuantity] = useState(1);
  const [imageLoading, setImageLoading] = useState(true);

=======
  const { classes } = useTheme();
>>>>>>> 76d44df (feat: profile screem)
  return (
    <View
      className={`flex-1 justify-center items-center ${classes.background}`}
    >
      <Text className={classes.textPrimary}>Product Details Screen</Text>
    </View>
  );
};
