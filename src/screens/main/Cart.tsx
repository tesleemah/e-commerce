import { useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { BottomTabParamList, RootStackParamList } from "../../types/navigation";
import { useTheme } from "../../context/ThemeContext";
import { useCart } from "../../context/CartContext"; // Updated to Context
import { CartCard } from "../../components/CartCard";
import { CartItems } from "../../types";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, "Cart">,
  NativeStackScreenProps<RootStackParamList>
>;

export const CartScreen = ({ navigation }: Props) => {
  const { classes } = useTheme();
  const { state, dispatch } = useCart(); // Using Context + Reducer
  const { cartItems } = state;

  // Derived calculations (Instant and safe)
  const cartTotal = cartItems.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const cartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  const renderItem = useCallback(
    ({ item }: { item: CartItems }) => (
      <CartCard
        item={item}
        onIncrease={() => dispatch({ type: "INCREASE_QTY", payload: item.id })}
        onDecrease={() => dispatch({ type: "DECREASE_QTY", payload: item.id })}
        onRemove={() =>
          dispatch({ type: "REMOVE_FROM_CART", payload: item.id })
        }
      />
    ),
    [dispatch], // dispatch is stable and won't cause unnecessary re-renders
  );

  const emptyState = () => (
    <View
      className={`flex-1 justify-center items-center ${classes.background}`}
    >
      <Ionicons name="cart-outline" size={40} />

      <Text className="mt-4 text-lg font-semibold">Your cart is empty</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        className="mt-6 bg-blue-500 px-6 py-3 rounded-xl"
      >
        <Text className="text-white font-medium">Start Shopping</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1">
        {/* Header */}
        <View className="bg-slate-100 px-4 py-4 flex-row justify-between items-center">
          <Text
            className={`text-xl font-bold items-center justify-center${classes.textPrimary}`}
          >
            Cart
          </Text>

          <Text className="text-black text-xs font-bold">
            {cartCount}{" "}
            {<Ionicons name="cart-sharp" size={22} color={"bg-black"} />}
          </Text>
        </View>

        {/* List */}
        <FlatList
          className="flex-1"
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ padding: 16, flexGrow: 1 }}
          ListEmptyComponent={emptyState}
        />

        {/* Bottom Section */}
        {cartItems.length > 0 && (
          <View
            className={`px-4 pt-4 pb-6 border-t ${classes.border} ${classes.surface}`}
          >
            <View className="flex-row justify-between mb-2">
              <Text className={`text-sm ${classes.textSecondary}`}>
                Subtotal
              </Text>
              <Text className={`text-sm font-medium ${classes.textPrimary}`}>
                ${cartTotal.toFixed(2)}
              </Text>
            </View>

            <View className="flex-row justify-between mb-2">
              <Text className={`text-sm ${classes.textSecondary}`}>
                Delivery
              </Text>
              <Text className={`text-sm font-medium ${classes.textPrice}`}>
                $10.00
              </Text>
            </View>

            <View
              className={`flex-row justify-between mb-4 pt-2 border-t ${classes.border}`}
            >
              <Text className={`text-base font-bold ${classes.textPrimary}`}>
                Total
              </Text>
              <Text className={`text-base font-bold ${classes.textPrice}`}>
                ${(cartTotal + 10).toFixed(2)}
              </Text>
            </View>

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
    </SafeAreaView>
  );
};
