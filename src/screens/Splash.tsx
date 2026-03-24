import { View, Text, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { useTheme } from "../context/ThemeContext";
import { useEffect } from "react";
import { Image } from "react-native";

type Props = NativeStackScreenProps<RootStackParamList, "Splash">;

export const SplashScreen = ({ navigation }: Props) => {
  const { classes } = useTheme();
  const logo = require("../../assets/logo.png");
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View
      className={`flex-1 justify-center items-center ${classes.background}`}
    >
      <Image
        source={logo}
        className="w-14 h-14 rounded-2xl mb-3"
        resizeMode="contain"
      />
    </View>
  );
};
