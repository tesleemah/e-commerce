import React, { forwardRef, useRef, useState } from "react";
import {
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

interface AppInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  hintText?: string;
  secureTextEntry?: boolean;
  errorMessage?: string;
  keyboardType?: KeyboardTypeOptions;
  returnKeyType?: ReturnKeyTypeOptions;
  onSubmit?: () => void;
  autoCapitalize?: "none" | "words";
  ref?: string;
}

export const AppInput = forwardRef<TextInput, AppInputProps>((props, ref) => {
  const {
    label,
    value,
    onBlur,
    onChangeText,
    hintText,
    secureTextEntry,
    errorMessage,
    keyboardType,
    returnKeyType,
    onSubmit,
    autoCapitalize,
  } = props;
  const { classes } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View className={`mb-3.5 ${classes.inputBg}`}>
      <Text className={`text-xs font-medium mb-1.5 ${classes.textSecondary}`}>
        {label}
      </Text>

      <View
        className={`flex-row items-center rounded-xl overflow-hidden ${classes.inputBg} ${isFocused ? classes.borderFocused : classes.border}`}
      >
        <TextInput
          ref={ref}
          className={`flex-1 px-4 py-3 ${classes.inputBg}`}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            props.onBlur?.();
          }}
          placeholder={hintText}
          placeholderTextColor="#475569"
          secureTextEntry={secureTextEntry && !isVisible}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmit}
          autoCapitalize={autoCapitalize ?? "none"}
        />

        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setIsVisible(!isVisible)}
            className="px-3 py-3"
          >
            <Ionicons
              name={isVisible ? "eye-outline" : "eye-off-outline"}
              size={18}
              color="#475569"
            />
          </TouchableOpacity>
        )}
      </View>

      {errorMessage && errorMessage.length > 0 && (
        <Text className={`text-xs mt-1 ${classes.textError}`}>
          {errorMessage}
        </Text>
      )}
    </View>
  );
});
