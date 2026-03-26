import React from "react";
import { Modal, View, Text, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

interface CategoriesModalProps {
  visible: boolean;
  onClose: () => void;
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
}

export const CategoriesModal = ({ 
  visible, onClose, categories, selectedCategory, onSelect 
}: CategoriesModalProps) => {
  const { isDark, classes } = useTheme();

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <TouchableOpacity 
        className="flex-1 bg-black/70" 
        activeOpacity={1} 
        onPress={onClose}
      >
        <View 
          className="absolute bottom-0 left-0 right-0 rounded-t-[40px] pb-12" 
          style={{ backgroundColor: isDark ? '#0f172a' : '#ffffff', minHeight: '50%' }}
        >
          {/* Handle Bar */}
          <View className="items-center pt-4 pb-2">
            <View className={`w-12 h-1.5 rounded-full ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`} />
          </View>

          {/* Header */}
          <View className="flex-row justify-between items-center px-6 mb-6">
            <Text className={`text-xl font-bold ${classes.textPrimary}`}>Categories</Text>
            <TouchableOpacity 
              onPress={onClose}
              className={`p-2 rounded-full ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}
            >
              <Ionicons name="close" size={20} color={isDark ? "#94a3b8" : "#475569"} />
            </TouchableOpacity>
          </View>

          {/* Categories List */}
          <ScrollView 
            className="px-6"
            showsVerticalScrollIndicator={false}
            style={{ maxHeight: Dimensions.get('window').height * 0.6 }}
          >
            <CategoryItem 
              label="all" 
              active={selectedCategory === 'all'} 
              onPress={() => { onSelect('all'); onClose(); }} 
              isDark={isDark}
            />
            {categories.map((cat) => (
              <CategoryItem 
                key={cat} 
                label={cat} 
                active={selectedCategory === cat} 
                onPress={() => { onSelect(cat); onClose(); }} 
                isDark={isDark}
              />
            ))}
          </ScrollView>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const CategoryItem = ({ label, active, onPress, isDark }: any) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.7}
    className={`flex-row items-center justify-between p-5 rounded-2xl mb-3 border ${
      active 
        ? 'border-blue-600 bg-blue-600/10' 
        : isDark ? 'border-slate-800 bg-[#1e293b]/30' : 'border-slate-100 bg-slate-50'
    }`}
  >
    <Text 
      className={`text-base font-semibold capitalize ${
        active ? 'text-blue-400' : isDark ? 'text-slate-200' : 'text-slate-800'
      }`}
    >
      {label === 'all' ? 'All Products' : label}
    </Text>
    
    {active && <Ionicons name="checkmark-circle" size={22} color="#3B82F6" />}
  </TouchableOpacity>
);