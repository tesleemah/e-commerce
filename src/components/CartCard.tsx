import { View, Text, Image, TouchableOpacity } from "react-native";
import { CartItem } from "../types";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { BottomTabParamList, RootStackParamList } from "../types/navigation";
import { RouteProp } from "@react-navigation/native";
import React from "react";

type Props = {
  item: CartItem;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
};

export const CartCard = React.memo(
  ({ item, onIncrease, onDecrease, onRemove }: Props) => {
    const { classes } = useTheme();

    return (
      <View className={`flex-1 ${classes.cardBg} rounded-xl p-3 mb-3`}>
        <Image
          source={{ uri: item.thumbnail }}
          style={{ width: "100%", height: 300 }}
          resizeMode="cover"
        />
        //main content
        <View className="flex-1 ml-3">
          //Title and the delete button
          <View className="flex-row justify-between">
            <Text className="flex-1" numberOfLines={2}>
              {item.title}
            </Text>
            <TouchableOpacity className="ml-2" onPress={onRemove}>
              <Ionicons color="#ef4444" size={14} name="trash-bin-outline" />
            </TouchableOpacity>
          </View>
          //Price and Quantity selector
          <View className="flex-row justify-between items-center">
            <Text className={`text-sm font-bold ${classes.textPrice}`}>
              ${(item.price * item.quantity).toFixed(2)}
            </Text>
          </View>
          //Quantity selector
          <View className="flex-row items-center gap-3">
            <TouchableOpacity className="w-7 h-7 rounded-full border border-[#1e2d4a] items-center justify-center">
              <Ionicons name="remove" size={14} color="#f1f5f9" />
            </TouchableOpacity>
            <Text className={`text-sm font-bold ${classes.textPrimary}`}>
              {item.quantity}
            </Text>
            <TouchableOpacity
              onPress={onIncrease}
              className="w-7 h-7 rounded-full bg-blue-600 items-center"
            >
              <Ionicons name="add" size={14} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  },
);
