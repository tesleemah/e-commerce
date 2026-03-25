import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import { useTheme } from "../../context/ThemeContext";
import { useState, useMemo } from "react"; // Added useMemo for efficiency
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../../context/CartContext"; // Changed to our Context
import { AppInput } from "../../components/AppInput";

type Props = NativeStackScreenProps<RootStackParamList, "Checkout">;
type PaymentMethod = "card" | "transfer" | "cash";

const CheckoutSchema = z.object({
  fullName: z.string().min(2, { message: "Full name is required" }),
  address: z.string().min(5, { message: "Address is required" }),
  city: z.string().min(2, { message: "City is required" }),
  phone: z.string().min(10, { message: "Valid phone number required" }),
});

type CheckoutFormData = z.infer<typeof CheckoutSchema>;

export const CheckoutScreen = ({ navigation }: Props) => {
  const { classes } = useTheme();

  // 1. Switch to Context
  const { state, dispatch } = useCart();
  const { cartItems } = state;

  // 2. Derived State (Subtotal)
  const subtotal = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cartItems],
  );

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(CheckoutSchema),
  });

  const onSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true);
    try {
      const orderId = `ORD-${Date.now()}`;

      // 3. Dispatch Clear Action
      dispatch({ type: "CLEAR_CART" });

      navigation.navigate("Success", {
        orderId,
        total: subtotal + 10,
        paymentMethod,
        address: data.address,
      });
    } catch (error) {
      console.error("Checkout error", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const PaymentOption = ({
    method,
    label,
    subtitle,
    icon,
  }: {
    method: PaymentMethod;
    label: string;
    subtitle: string;
    icon: string;
  }) => (
    <TouchableOpacity
      onPress={() => setPaymentMethod(method)}
      className={`flex-row items-center gap-3 p-3 rounded-xl mb-2 border ${
        paymentMethod === method
          ? "border-blue-600 bg-blue-900/20" // Softened the background for dark mode
          : classes.border
      }`}
    >
      <View
        className={`w-4 h-4 rounded-full border-2 items-center justify-center ${
          paymentMethod === method ? "border-blue-500" : "border-gray-500"
        }`}
      >
        {paymentMethod === method && (
          <View className="w-2 h-2 rounded-full bg-blue-500" />
        )}
      </View>
      <Text className="text-lg">{icon}</Text>
      <View className="flex-1">
        <Text className={`text-sm font-medium ${classes.textPrimary}`}>
          {label}
        </Text>
        <Text className={`text-xs ${classes.textMuted}`}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className={`flex-1 ${classes.background}`}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View className="px-4 pt-12 pb-8">
          {/* Header */}
          <View className="flex-row items-center gap-3 mb-6">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className={`w-10 h-10 rounded-full items-center justify-center border ${classes.border} ${classes.surface}`}
            >
              <Ionicons name="arrow-back" size={20} color={"#94a3b8"} />
            </TouchableOpacity>
            <Text className={`text-xl font-bold ${classes.textPrimary}`}>
              Checkout
            </Text>
          </View>

          {/* Delivery Address Section */}
          <Text
            className={`text-xs font-semibold uppercase tracking-widest mb-3 ${classes.textMuted}`}
          >
            Delivery Address
          </Text>
          <View
            className={`rounded-2xl p-4 mb-5 border ${classes.cardBg} ${classes.border}`}
          >
            <Controller
              control={control}
              name="fullName"
              render={({ field: { onChange, onBlur, value } }) => (
                <AppInput
                  label="Full Name"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  hintText="John Doe"
                  errorMessage={errors.fullName?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="address"
              render={({ field: { onChange, onBlur, value } }) => (
                <AppInput
                  label="Street Address"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  hintText="123 Main Street"
                  errorMessage={errors.address?.message}
                />
              )}
            />
            <View className="flex-row gap-3">
              <View className="flex-1">
                <Controller
                  control={control}
                  name="city"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <AppInput
                      label="City"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      hintText="Lagos"
                      errorMessage={errors.city?.message}
                    />
                  )}
                />
              </View>
              <View className="flex-1">
                <Controller
                  control={control}
                  name="phone"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <AppInput
                      label="Phone"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      hintText="+234..."
                      keyboardType="phone-pad"
                      errorMessage={errors.phone?.message}
                    />
                  )}
                />
              </View>
            </View>
          </View>

          {/* Payment Method Section */}
          <Text
            className={`text-xs font-semibold uppercase tracking-widest mb-3 ${classes.textMuted}`}
          >
            Payment Method
          </Text>
          <View
            className={`rounded-2xl p-4 mb-5 border ${classes.cardBg} ${classes.border}`}
          >
            <PaymentOption
              method="card"
              label="Card"
              subtitle="Credit or debit card"
              icon="💳"
            />
            <PaymentOption
              method="transfer"
              label="Transfer"
              subtitle="Bank transfer"
              icon="🏦"
            />
            <PaymentOption
              method="cash"
              label="Cash"
              subtitle="Pay on delivery"
              icon="💵"
            />
          </View>

          {/* Order Summary Section */}
          <Text
            className={`text-xs font-semibold uppercase tracking-widest mb-3 ${classes.textMuted}`}
          >
            Order Summary
          </Text>
          <View
            className={`rounded-2xl p-4 mb-5 border ${classes.cardBg} ${classes.border}`}
          >
            {cartItems.map((item) => (
              <View
                key={item.id}
                className={`flex-row justify-between items-center py-2 border-b ${classes.border}`}
              >
                <Text
                  className={`flex-1 text-sm ${classes.textSecondary}`}
                  numberOfLines={1}
                >
                  {item.title}
                </Text>
                <Text className={`text-xs mx-3 ${classes.textMuted}`}>
                  ×{item.quantity}
                </Text>
                <Text className={`text-sm font-semibold ${classes.textPrice}`}>
                  ${(item.price * item.quantity).toFixed(2)}
                </Text>
              </View>
            ))}

            <View className="flex-row justify-between mt-3 mb-1">
              <Text className={`text-sm ${classes.textSecondary}`}>
                Subtotal
              </Text>
              <Text className={`text-sm ${classes.textPrimary}`}>
                ${subtotal.toFixed(2)}
              </Text>
            </View>

            <View className="flex-row justify-between mb-3">
              <Text className={`text-sm ${classes.textSecondary}`}>
                Delivery
              </Text>
              <Text className={`text-sm ${classes.textPrice}`}>$10.00</Text>
            </View>

            <View
              className={`flex-row justify-between pt-3 border-t ${classes.border}`}
            >
              <Text className={`text-base font-bold ${classes.textPrimary}`}>
                Total
              </Text>
              <Text className={`text-base font-bold ${classes.textPrice}`}>
                ${(subtotal + 10).toFixed(2)}
              </Text>
            </View>
          </View>

          {/* Confirm Button */}
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className={`py-4 rounded-2xl items-center ${classes.btnPrimary} ${isSubmitting ? "opacity-50" : "opacity-100"}`}
          >
            {isSubmitting ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className={`text-base font-bold ${classes.btnPrimaryText}`}>
                Confirm Order
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
