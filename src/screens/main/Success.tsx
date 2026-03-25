import { View, Text, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import { useTheme } from "../../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = NativeStackScreenProps<RootStackParamList, "Success">;

export const SuccessScreen = ({ route, navigation }: Props) => {
  const { classes } = useTheme();
  const { orderId, total, paymentMethod, address } = route.params;

  const handleBackToHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "MainTabs" }],
    });
  };

  return (
    <SafeAreaView className={`flex-1 ${classes.background}`}>
      <View className="flex-1 items-center justify-center px-6">
        {/* Checkmark Circle */}
        <View className="w-24 h-24 rounded-full bg-emerald-950 border-4 border-emerald-500 items-center justify-center mb-6">
          <Ionicons name="checkmark" size={48} color="#10b981" />
        </View>

        {/* Title */}
        <Text className={`text-2xl font-bold mb-2 ${classes.textPrimary}`}>
          Order Placed!
        </Text>
        <Text className={`text-sm mb-4 ${classes.textSecondary}`}>
          Your order has been confirmed
        </Text>

        {/* Order ID */}
        <View className="bg-blue-950 px-4 py-2 rounded-full mb-6">
          <Text className="text-sm text-blue-400 font-mono">#{orderId}</Text>
        </View>

        {/* Summary Card */}
        <View
          className={`w-full rounded-2xl p-4 mb-6 border ${classes.cardBg} ${classes.border}`}
        >
          <View className="flex-row justify-between py-2">
            <Text className={`text-sm ${classes.textMuted}`}>Payment</Text>
            <Text
              className={`text-sm font-medium capitalize ${classes.textPrimary}`}
            >
              {paymentMethod}
            </Text>
          </View>
          <View className="flex-row justify-between py-2">
            <Text className={`text-sm ${classes.textMuted}`}>Delivery to</Text>
            <Text
              className={`text-sm font-medium ${classes.textPrimary}`}
              numberOfLines={1}
              style={{ maxWidth: 180 }}
            >
              {address}
            </Text>
          </View>
          <View
            className={`flex-row justify-between py-3 mt-1 border-t border-[#1e2d4a]`}
          >
            <Text className={`text-base font-bold ${classes.textPrimary}`}>
              Total Paid
            </Text>
            <Text className={`text-base font-bold ${classes.textPrice}`}>
              ${total.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Back to Home Button */}
        <TouchableOpacity
          onPress={handleBackToHome}
          className={`w-full py-4 rounded-2xl items-center mb-3 ${classes.btnPrimary}`}
        >
          <Text className={`text-base font-bold ${classes.btnPrimaryText}`}>
            Back to Home
          </Text>
        </TouchableOpacity>

        {/* Continue Shopping Button */}
        <TouchableOpacity
          onPress={handleBackToHome}
          className="w-full py-4 rounded-2xl items-center border border-[#1e2d4a]"
        >
          <Text className={`text-base ${classes.textSecondary}`}>
            Continue Shopping
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
