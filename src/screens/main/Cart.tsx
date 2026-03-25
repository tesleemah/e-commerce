import { useCallback } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { BottomTabParamList, RootStackParamList } from "../../types/navigation";
import { useTheme } from "../../context/ThemeContext";
import { useCartStore } from "../../types/CartStore";
import { CartCard } from "../../components/CartCard";
import { CartItem } from "../../types";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, "Cart">,
  NativeStackScreenProps<RootStackParamList>
>;

export const CartScreen = ({ navigation, route }: Props) => {
  const { classes } = useTheme();
  const cartItems = useCartStore((state) => state.cartItems);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const increaseQty = useCartStore((state) => state.increaseQty);
  const decreaseQty = useCartStore((state) => state.decreaseQty);
  const clearCart = useCartStore((state) => state.clearCart);
  const cartTotal = useCartStore((state) => state.cartTotal);
  const cartCount = useCartStore((state) => state.cartCount);
  const renderItem = useCallback(
    ({ item }: { item: CartItem }) => (
      <CartCard
        item={item}
        onIncrease={() => increaseQty(item.id)}
        onDecrease={() => decreaseQty(item.id)}
        onRemove={() => removeFromCart(item.id)}
      />
    ),
    [increaseQty, decreaseQty, removeFromCart],
  );
  const emptyState = () => {
    return (
      <View
        className={`flex-1 justify-center items-center ${classes.background}`}
      >
        <Text className="text-5xl">🛒</Text>
        <Text className="mt-4 text-lg font-semibold">Your cart is empty</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          className="mt-6 bg-blue-500 px-6 py-3 rounded-xl"
        >
          <Text className="text-white font-medium">Start Shopping</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      //Header
      <View className="px-4 py-4 flex-row justify-between items-center">
        Cart
        <Text className={`${cartCount()} items`}>Count-bage-</Text>
      </View>
      //FlatList
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={emptyState}
      ></FlatList>
      //bottom section
      {cartItems.length > 0 && (
        <View
          className={`px-4 pt-4 pb-6 border-t ${classes.border} ${classes.surface}`}
        >
          // Subtotal
          <View className="flex-row justify-between mb-2">
            <Text className={`text-sm ${classes.textSecondary}`}>Subtotal</Text>
            <Text className={`text-sm font-medium ${classes.textPrimary}`}>
              ${cartTotal().toFixed(2)}
            </Text>
          </View>
          //Delivery
          <View className="flex-row justify-between mb-2">
            <Text className={`text-sm ${classes.textSecondary}`}>Delivery</Text>
            <Text className={`text-sm font-medium ${classes.textPrice}`}>
              $10.00
            </Text>
          </View>
          // Total
          <View className="flex-row justify-between mb-4 pt-2 border-t ${classes.border}">
            <Text className={`text-base font-bold ${classes.textPrimary}`}>
              Total
            </Text>
            <Text className={`text-base font-bold ${classes.textPrice}`}>
              ${(cartTotal() + 10).toFixed(2)}
            </Text>
          </View>
          // Checkout
          <TouchableOpacity
            onPress={() => navigation.navigate("Checkout")}
            className={`py-4 rounded-2xl items-center ${classes.btnPrimary}`}
          >
            <Text className={`text-base font-bold ${classes.btnPrimaryText}`}>
              Checkout
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
