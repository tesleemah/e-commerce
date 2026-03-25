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
import { Ionicons } from "@expo/vector-icons";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { useCart } from "../../context/CartContext";

type Props = CompositeScreenProps<
  NativeStackScreenProps<RootStackParamList, "ProductDetails">,
  BottomTabScreenProps<BottomTabParamList>
>;

export const ProductDetailsScreen = ({ navigation, route }: Props) => {
  const { product } = route.params;
  const { dispatch } = useCart();

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

  const discountedPrice = (
    product.price -
    (product.price * product.discountPercentage) / 100
  ).toFixed(2);

  return (
    <ScrollView className={`flex-1 pt-8 ${classes.background}`}>
      <View className="absolute top-0 left-0 right-0 z-10 flex-row justify-between items-center px-4 pt-4">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="w-10 h-10 rounded-full bg-black/40 items-center justify-center"
        >
          <Ionicons name="arrow-back" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity className="w-10 h-10 rounded-full bg-black/40 items-center justify-center">
          <Ionicons name="heart-outline" size={20} color="white" />
        </TouchableOpacity>
      </View>
      <View style={{ height: 300 }}>
        <Image
          source={{ uri: product.thumbnail }}
          style={{ width: "100%", height: 300 }}
          resizeMode="contain"
          onLoad={() => setImageLoading(false)}
        />
        {imageLoading && (
          <View className="absolute inset-0 items-center justify-center bg-[#0d1526]">
            <ActivityIndicator size="large" color="#2563EB" />
          </View>
        )}
      </View>
      <View className="px-4 pt-4">
        {/* Category badge */}
        <View className="self-start mb-2">
          <Text
            className={`text-xs px-3 py-1 rounded-full ${classes.pillInactive} ${classes.pillIncativeText}`}
          >
            {product.category}
          </Text>
        </View>

        {/* Title */}
        <Text className={`text-xl font-bold mb-2 ${classes.textPrimary}`}>
          {product.title}
        </Text>

        {/* Rating row */}
        <View className="flex-row items-center gap-2 mb-3">
          <Ionicons name="star" size={16} color="#f59e0b" />
          <Text className={`text-sm font-medium ${classes.textPrimary}`}>
            {product.rating}
          </Text>
          <Text className={`text-sm ${classes.textMuted}`}>
            ({product.stock} in stock)
          </Text>
        </View>

        {/* Price row */}
        <View className="flex-row items-center gap-3 mb-2">
          <Text className={`text-2xl font-bold ${classes.textPrice}`}>
            ${discountedPrice}
          </Text>
          <Text className={`text-base line-through ${classes.textMuted}`}>
            ${product.price}
          </Text>
          <View className="bg-red-900 px-2 py-0.5 rounded-full">
            <Text className="text-xs text-red-400 font-medium">
              -{product.discountPercentage}%
            </Text>
          </View>
        </View>

        {/* Stock status */}
        <Text
          className={`text-sm mb-4 ${
            product.availabilityStatus === "In Stock"
              ? classes.textSuccess
              : classes.textError
          }`}
        >
          {product.availabilityStatus}
        </Text>
      </View>
      <View className={`h-px mx-4 my-4 ${classes.border}`} />
      {/* Quantity selector */}
      <View className="pl-5 pr-5 flex-row items-center justify-between mb-4">
        <Text className={`text-base font-medium ${classes.textPrimary}`}>
          Quantity
        </Text>
        <View className="flex-row items-center gap-4">
          <TouchableOpacity
            onPress={decrement}
            className={`w-9 h-9 rounded-full items-center justify-center ${classes.surface}`}
            disabled={quantity === 1}
          >
            <Ionicons name="remove" size={12} color={"#475569"} />
          </TouchableOpacity>
          <Text
            className={`text-lg font-bold w-6 text-center ${classes.textPrimary}`}
          >
            {quantity}
          </Text>
          <TouchableOpacity
            onPress={increment}
            className={`w-9 h-9 rounded-full items-center justify-center ${classes.surface}`}
          >
            <Ionicons name="add" size={12} color="bg-black" />
          </TouchableOpacity>
        </View>
      </View>
      <View className="px-4 mt-4">
        <TouchableOpacity
          onPress={() => {
            dispatch({
              type: "ADD_TO_CART",
              payload: { product, quantity },
            });
            navigation.navigate("MainTabs", { screen: "Cart" });
          }}
          className={`py-4 rounded-2xl items-center flex-row justify-center gap-2 ${classes.btnPrimary}`}
        >
          <Ionicons name="cart-outline" size={20} color="white" />
          <Text className={`text-base font-bold ${classes.btnPrimaryText}`}>
            Add to Cart
          </Text>
        </TouchableOpacity>
      </View>
      <View className={`h-px mx-4 my-4 ${classes.border}`} />
      <View className="px-8">
        <Text className={`text-base font-semibold mb-3 ${classes.textPrimary}`}>
          Reviews ({product.reviews.length})
        </Text>
        {product.reviews.map((review, index) => (
          <View key={index} className={`p-3 rounded-xl mb-3 ${classes.cardBg}`}>
            {/* Reviewer name + rating row */}
            <View className="flex-row justify-between items-center mb-1">
              <Text className={`text-sm font-medium ${classes.textPrimary}`}>
                {review.reviewerName}
              </Text>
              <View className="flex-row items-center gap-1">
                <Ionicons name="star" size={12} color="#f59e0b" />
                <Text className={`text-xs ${classes.textMuted}`}>
                  {review.rating}
                </Text>
              </View>
            </View>
            {/* Comment */}
            <Text className={`text-sm ${classes.textSecondary}`}>
              {review.comment}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};
