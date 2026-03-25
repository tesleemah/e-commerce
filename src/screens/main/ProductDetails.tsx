import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabParamList, RootStackParamList } from "../../types/navigation";
import { useTheme } from "../../context/ThemeContext";
import { useCallback, useState } from "react";

type Props = CompositeScreenProps<
  NativeStackScreenProps<RootStackParamList, "ProductDetails">,
  BottomTabScreenProps<BottomTabParamList>
>;

export const ProductDetailsScreen = ({ navigation, route }: Props) => {
  const { product } = route.params;

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

  return (
    <View
      className={`flex-1 justify-center items-center ${classes.background}`}
    >
      <Text className={classes.textPrimary}>Product Details Screen</Text>
    </View>
  );
};
