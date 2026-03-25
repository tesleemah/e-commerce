import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

type MenuItemProps = {
  icon: keyof typeof Ionicons.glyphMap;
  iconBg: string;
  iconColor?: string;
  title: string;
  onPress: () => void;
  rightElement?: React.ReactNode;
  titleColor: string; // Default to your theme's text color
  isLast?: boolean;
};
export const MenuItem = ({
  icon,
  iconColor = "#fff",
  title,
  onPress,
  rightElement,
  titleColor = "text-white", // Default to your theme's text color
  isLast = false,
}: MenuItemProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      // conditional border-b based on isLast prop
      className={`flex-row items-center p-3.5 gap-3 ${!isLast ? "border-b border-white/10" : ""}`}
    >
      {/* Icon Box */}
      <View className="w-8 h-8 rounded-lg items-center justify-center">
        <Ionicons name={icon} size={18} color={iconColor} />
      </View>

      {/* Text Content */}
      <View className="flex-1">
        <Text className={`text-[16px] font-semibold ${titleColor}`}>
          {title}
        </Text>
      </View>

      {/* Right Action: Either a Switch/Element or a Chevron */}
      <View>
        {rightElement ? (
          rightElement
        ) : (
          <Ionicons name="chevron-forward" size={18} color="#4b5563" />
        )}
      </View>
    </TouchableOpacity>
  );
};
