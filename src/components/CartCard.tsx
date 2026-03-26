import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { CartItems } from "../types";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

type Props = {
  item: CartItems;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
};

export const CartCard = React.memo(
  ({ item, onIncrease, onDecrease, onRemove }: Props) => {
    const { classes } = useTheme();

    return (
      <View
        className={`flex-row ${classes.cardBg} rounded-2xl p-3 mb-4 shadow-sm border ${classes.border}`}
      >
        {/* Product Image */}
        <Image
          source={{ uri: item.thumbnail }}
          className="rounded-xl"
          style={{ width: 100, height: 100 }}
          resizeMode="cover"
        />

        {/* Content Area */}
        <View className="flex-1 ml-4 justify-between">
          {/* Top Row: Title & Remove */}
          <View className="flex-row justify-between items-start">
            <Text
              className={`flex-1 font-semibold text-base ${classes.textPrimary}`}
              numberOfLines={1}
            >
              {item.title}
            </Text>
            <TouchableOpacity onPress={onRemove} className="p-1">
              <Ionicons color="#ef4444" size={20} name="trash-outline" />
            </TouchableOpacity>
          </View>

          {/* Bottom Row: Price & Quantity Controls */}
          <View className="flex-row justify-between items-center mt-2">
            <Text className={`text-lg font-bold ${classes.textPrice}`}>
              ${(item.price * item.quantity).toFixed(2)}
            </Text>

            <View className="flex-row items-center bg-gray-100 dark:bg-slate-800 rounded-full p-1 px-2 gap-x-3">
              <TouchableOpacity
                onPress={onDecrease}
                className="w-8 h-8 rounded-full bg-white dark:bg-slate-700 items-center justify-center shadow-sm"
              >
                <Ionicons
                  name="remove"
                  size={16}
                  color={item.quantity > 1 ? "#3b82f6" : "#9ca3af"}
                />
              </TouchableOpacity>

              <Text
                className={`text-base font-bold min-w-[20px] text-center ${classes.textPrimary}`}
              >
                {item.quantity}
              </Text>

              <TouchableOpacity
                onPress={onIncrease}
                className="w-8 h-8 rounded-full bg-blue-600 items-center justify-center shadow-sm"
              >
                <Ionicons name="add" size={16} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  },
);
