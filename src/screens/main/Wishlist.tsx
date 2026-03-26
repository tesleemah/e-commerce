import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { BottomTabParamList, RootStackParamList } from "../../types/navigation";
import { useTheme } from "../../context/ThemeContext";
import { ProductCard } from "../../components/ProductCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { useWishlist } from "../../context/WishListContext";
import { Ionicons } from "@expo/vector-icons";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, "Favorite">,
  NativeStackScreenProps<RootStackParamList>
>;

export const WishlistScreen = ({ navigation }: Props) => {
  const { classes } = useTheme();
  const { wishlistItems, removeFromWishlist } = useWishlist();

  if (wishlistItems.length === 0) {
    return (
      <SafeAreaView
        className={`flex-1 justify-center items-center ${classes.background}`}
      >
        <Ionicons name="heart-dislike-outline" size={80} color="#64748b" />
        <Text className={`text-xl font-bold mt-4 ${classes.textPrimary}`}>
          No saved items yet
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          className="mt-6 bg-blue-600 px-8 py-3 rounded-xl"
        >
          <Text className="text-white font-bold">Browse Products</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className={`flex-1 ${classes.background}`}>
      <View className="px-4 py-4 items-center">
        <Text
          className={`text-2xl font-bold items-center ${classes.textPrimary}`}
        >
          Wishlist
        </Text>
      </View>
      <FlatList
        data={wishlistItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() =>
              navigation.navigate("ProductDetails", { product: item })
            }
          />
        )}
        numColumns={2}
        columnWrapperStyle={{ paddingHorizontal: 16, gap: 12 }}
      />
    </SafeAreaView>
  );
};
