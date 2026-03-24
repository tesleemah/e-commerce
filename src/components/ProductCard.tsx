import { Image, Text, TouchableOpacity, View } from "react-native";
import { Product } from "../types";
import { useTheme } from "../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

type Props = {
  product: Product;
  onPressed: () => void;
};

export const ProductCard = React.memo(({ product, onPressed }: Props) => {
  const { classes } = useTheme();
  return (
    <View>
      <TouchableOpacity
        onPress={onPressed}
        className={` rounded-2xl overflow-hidden mb-3 ${classes.cardBg}`}
      >
        <Image
          source={{ uri: product.thumbnail }}
          style={{ width: "100%", height: 160 }}
          resizeMode="cover"
        />
        <View className="p-3">
          <Text
            numberOfLines={2}
            className={`${classes.textPrimary} text-sm font-medium`}
          >
            {product.title}
          </Text>
          <Text
            numberOfLines={2}
            className={`${classes.textPrice} text-sm font-bold`}
          >
            {` $ ${product.price}`}
          </Text>
          <View className="flex-row items-center gap-1">
            <Ionicons name="star" size={12} color="#f59e0b" />
            <Text className={`text-xs ${classes.textMuted}`}>
              {product.rating}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
});
