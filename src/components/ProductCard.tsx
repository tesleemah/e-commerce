import React, { useCallback } from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Product } from "../types";
import { useTheme } from "../context/ThemeContext";
import { useWishlist } from "../context/WishListContext";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2;

type Props = {
  product: Product;
  onPress: () => void;
};

export const ProductCard = React.memo(({ product, onPress }: Props) => {
  const { classes } = useTheme();
  const { isWishlisted, addToWishlist, removeFromWishlist } = useWishlist();

  // Check if this specific product is in the wishlist
  const favorited = isWishlisted(product.id);

  // Toggle Logic
  const toggleWishlist = useCallback(() => {
    if (favorited) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  }, [favorited, product, addToWishlist, removeFromWishlist]);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ width: CARD_WIDTH }}
      className={`rounded-2xl overflow-hidden mb-3 relative ${classes.cardBg || "bg-white"}`}
      activeOpacity={0.85}
    >
      {/* Product Image */}
      <View>
        <Image
          source={{ uri: product.thumbnail }}
          style={{ width: CARD_WIDTH, height: 160 }}
          resizeMode="cover"
        />

        {/* Heart Toggle Button */}
        <TouchableOpacity
          onPress={toggleWishlist}
          activeOpacity={0.7}
          className="absolute top-2 right-2 w-8 h-8 rounded-full items-center justify-center backdrop-blur-md"
          style={{ backgroundColor: "rgba(0,0,0,0.25)" }}
        >
          <Ionicons
            name={favorited ? "heart" : "heart-outline"}
            size={18}
            color={favorited ? "#ef4444" : "#ffffff"}
          />
        </TouchableOpacity>
      </View>

      {/* Product Info */}
      <View className="p-3">
        <Text
          numberOfLines={1}
          className={`text-sm font-bold mb-1 ${classes.textPrimary}`}
        >
          {product.title}
        </Text>

        <View className="flex-row justify-between items-center mb-1">
          <Text
            className={`text-sm font-bold ${classes.textPrice || "text-blue-500"}`}
          >
            ${product.price}
          </Text>

          {/* Rating */}
          <View className="flex-row items-center gap-1">
            <Ionicons name="star" size={12} color="#f59e0b" />
            <Text className={`text-xs ${classes.textMuted}`}>
              {product.rating}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
});
