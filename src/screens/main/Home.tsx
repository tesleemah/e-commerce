import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { BottomTabParamList, RootStackParamList } from "../../types/navigation";
import { useTheme } from "../../context/ThemeContext";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProductCard } from "../../components/ProductCard";
import { Product } from "../../types";
import { useProducts } from "../../hooks/useProduct";
import { Ionicons } from "@expo/vector-icons";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, "Home">,
  NativeStackScreenProps<RootStackParamList>
>;
export const HomeScreen = ({ navigation }: Props) => {
  const { classes } = useTheme();
  const { products, loading, error } = useProducts();
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState<string[]>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://dummyjson.com/products/categories",
        );

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data.map((category: { slug: string }) => category.slug));
      } catch (error) {
        console.error("Error fetching categories");
      }
    };
    fetchCategories();
  }, []);

  const renderProduct = useCallback(
    ({ item }: { item: Product }) => (
      <ProductCard
        product={item}
        onPressed={() =>
          navigation.navigate("ProductDetails", { product: item })
        }
      />
    ),
    [navigation],
  );
  // useMemo optimization — only recomputes when products, searchText or selectedCategory changes
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchText.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchText, selectedCategory]);
  return (
    <SafeAreaView className={`flex-1 ${classes.background}`}>
      <FlatList
        data={filteredProducts}
        numColumns={3}
        ListEmptyComponent={() => {
          if (loading) return null;
          if (error)
            return (
              <View className="flex-1 items-center justify-center py-20">
                <Text className={classes.textError}>{error}</Text>
              </View>
            );
          return (
            <View className="flex-1 items-center justify-center py-20">
              <Ionicons name="search-outline" size={48} color="#475569" />
              <Text className={`text-base mt-4 ${classes.textSecondary}`}>
                No products found
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setSearchText("");
                  setSelectedCategory("all");
                }}
                className={`mt-4 px-6 py-2 rounded-xl ${classes.btnPrimary}`}
              >
                <Text className={classes.btnPrimaryText}>Clear search</Text>
              </TouchableOpacity>
            </View>
          );
        }}
        ListFooterComponent={() => {
          if (!loading) return null;
          return (
            <View className="py-10 items-center">
              <ActivityIndicator size="large" color="#2563EB" />
            </View>
          );
        }}
        columnWrapperStyle={{ gap: 10, paddingHorizontal: 16 }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(products) => products.id.toString()}
        renderItem={renderProduct}
        ListHeaderComponent={() => (
          <View className="flex-row justify-between items-center px-4 py-4">
            <Text className={`text-2xl font-bold ${classes.textPrimary}`}>
              Discover
            </Text>
            <Ionicons name="notifications-outline" size={24} color="#475569" />
            <View
              className={`flex-row items-center mx-4 mb-4 px-3 gap-2 rounded-xl ${classes.inputBg} ${classes.border}`}
            >
              <Ionicons name="search-outline" size={18} color="#475569" />
              <TextInput
                placeholder="Search products..."
                value={searchText}
                onChangeText={setSearchText}
                className={`flex-1 py-3 ${classes.textPrimary}`}
                placeholderTextColor="#475569"
              />
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              className="px-4 mb-4"
            >
              <TouchableOpacity
                onPress={() => setSelectedCategory("all")}
                className={`px-4 py-2 rounded-full mr-2 ${
                  selectedCategory === "all"
                    ? classes.pillActive
                    : classes.pillInactive
                }`}
              >
                <Text
                  className={
                    selectedCategory === "all"
                      ? classes.pillActiveText
                      : classes.pillIncativeText
                  }
                >
                  All
                </Text>
              </TouchableOpacity>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  onPress={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full mr-2 ${selectedCategory === category ? classes.pillActive : classes.pillInactive}`}
                >
                  <Text
                    className={
                      selectedCategory === category
                        ? classes.pillActiveText
                        : classes.pillIncativeText
                    }
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      />
    </SafeAreaView>
  );
};
