import {
  View,
  Text,
  Image,
  Alert,
  TouchableOpacity,
  Switch,
} from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { BottomTabParamList } from "../../types/navigation";
import { useTheme } from "../../context/ThemeContext";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../context/AuthContext";
import { IconProps } from "@expo/vector-icons/build/createIconSet";
import { User } from "../../types";
import { AppInput } from "../../components/AppInput";
import { MenuItem } from "../../components/MenuItem";

type Props = BottomTabScreenProps<BottomTabParamList, "Profile">;

export const ProfileScreen = ({ navigation }: Props) => {
  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the media library is required.",
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
      AsyncStorage.setItem("profile_image", result.assets[0].uri);
      useEffect(() => {
        AsyncStorage.getItem("profile_image").then((uri) => {
          if (uri) setProfileImage(uri);
        });
      }, []);
    }
  };
  const handleSave = async () => {
    try {
      const nameParts = editName.trim().split(" ");
      const updatedUser: User = {
        ...user!,
        name: editName.trim(),
        email: editEmail.trim(),
      };
      await updateUser(updatedUser);

      // also update registered_user in AsyncStorage
      const stored = await AsyncStorage.getItem("registered_user");
      if (stored) {
        const parsed = JSON.parse(stored);
        await AsyncStorage.setItem(
          "registered_user",
          JSON.stringify({
            ...parsed,
            name: editName.trim(),
            email: editEmail.trim(),
          }),
        );
      }
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile", error);
    }
  };

  const { user, logout, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name ?? "");
  const [editEmail, setEditEmail] = useState(user?.email ?? "");
  const { classes, isDark, toggleTheme } = useTheme();

  const [profileImage, setProfileImage] = useState<string | null>();

  return (
    <View className={`flex-1 justify-centter ${classes.background}`}>
      <View className="items-center mb-8 pt-8">
        <View className="flex-row justify-between items-center mb-6"></View>
        <TouchableOpacity onPress={pickImage}>
          <View className="relative">
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                style={{ width: 80, height: 80 }}
                className="rounded-full"
              />
            ) : (
              <View className="w-20 h-20 rounded-full bg-blue-800 items-center justify-center border-2 border-blue-500"></View>
            )}
            <View className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-blue-600 items-center justify-center border-2 border-[#0a0f1e]">
              <Ionicons name="camera" size={12} color="white" />
            </View>
          </View>
        </TouchableOpacity>
        {isEditing ? (
          <View className="w-full px-4 mt-3">
            <AppInput
              label="Full Name"
              value={editName}
              onChangeText={setEditName}
              autoCapitalize="words"
              returnKeyType="next"
            />
            <AppInput
              label="Email"
              value={editEmail}
              onChangeText={setEditEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="done"
            />
            <View className="flex-row justify-center gap-10 mt-4">
              <TouchableOpacity onPress={() => setIsEditing(false)}>
                <Text className={`text-base ${classes.textMuted}`}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSave}>
                <Text className="text-base text-blue-500 font-bold">Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View className="items-center">
            <Text
              className={`text-base font-semibold mt-3 ${classes.textPrimary}`}
            >
              {user?.name ?? "User"}
            </Text>
            <Text className={`text-sm mt-1 ${classes.textMuted}`}>
              {user?.email ?? ""}
            </Text>
          </View>
        )}
      </View>
      <View className="mx-4 mb-6 overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100">
        <MenuItem
          icon="pencil-outline"
          iconBg="#3b82f6"
          title="Edit Profile"
          onPress={() => setIsEditing(true)}
          titleColor={"text-white"}
        />
        <MenuItem
          icon="heart-outline"
          iconBg="#3b82f6"
          title="Favourite"
          onPress={() => {
            navigation.navigate("Favorite");
          }}
          titleColor={"text-white"}
        />
        <MenuItem
          icon="cart-outline"
          iconBg="#10b981"
          title="Cart"
          onPress={() => {
            navigation.navigate("Cart");
          }}
          titleColor={"text-white"}
        />
        <MenuItem
          icon="moon-outline"
          iconBg="#6366f1"
          title="Theme"
          rightElement={<Switch value={isDark} onValueChange={toggleTheme} />}
          onPress={toggleTheme}
          titleColor={"text-white"}
        />
      </View>
      <View className="pt-8 mt-4 justify-center items-center">
        <View className="overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm">
          <MenuItem
            icon="log-out-outline"
            iconBg="#fee2e2" // Light red background (Red-100)
            iconColor="#ef4444" // Bright red icon (Red-500)
            title="Logout"
            titleColor="text-red-500" // Red text label
            onPress={logout}
            isLast={true}
            rightElement={<View />}
          />
        </View>
      </View>
    </View>
  );
};
