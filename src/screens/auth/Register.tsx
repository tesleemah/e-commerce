import { View, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform, ActivityIndicator, TextInput } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import { useTheme } from "../../context/ThemeContext";
import {z} from "zod";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AppInput } from "../../components/AppInput";
import { emailRules, passwordRules } from "../../utils/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image } from "react-native";
import  AsyncStorage  from "@react-native-async-storage/async-storage";
type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;
const RegisterSchema = z.object({
    firstname: z.string().min(2, { message: "Name is too short" }),
    lastname: z.string().min(2, { message: "Name is too short" }),
    email: z.email({ error: "Please enter a valid email address" }),
    password: z.string()
        .min(8, { message: "Password is too short" })
        .max(20, { message: "Password is too long" }),
    confirmPassword: z.string()
}).refine(
    (data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"]
    }
)
type RegisterFormData = z.infer<typeof RegisterSchema>;
const logo = require('../../../assets/logo.png');


export const RegisterScreen = ({ navigation }: Props)=> {

    const {classes} = useTheme();
    const passwordRef = useRef<TextInput>(null);
    const lastNameRef = useRef<TextInput>(null);
    const emailRef = useRef<TextInput>(null);
    const confirmPasswordRef = useRef<TextInput>(null)
    const { control, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({resolver: zodResolver(RegisterSchema)});
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const onSubmit = async (data:RegisterFormData) => {
    try {
        setIsSubmitting(true)
        const newUser = {
            id: "1",
            name: `${data.firstname} ${data.lastname}`,
            email: data.email,
            password: data.password,
            
        }
        await AsyncStorage.setItem('registered_user', JSON.stringify(newUser))
        navigation.navigate('Login')
    } catch(error) {
        console.error("Sign Up failed")
    } finally {
        setIsSubmitting(false)
    }
}
    return (
    <KeyboardAvoidingView  behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className={`flex-1 ${classes.background}`}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
            <View className="flex-1 px-5 pt-12 pb-8">
                <View className="items-center mb-8">
                   <Image source={logo} className="w-14 h-14 rounded-2xl mb-3" resizeMode="contain"/>
                   <Text className={` text-xl font-medium mb-1 ${classes.textPrimary}`}>
                    ShopApp
                   </Text>
                   <Text className={`text-xs ${classes.textMuted}`}>
                    Your Premium App
                   </Text>
                </View>
                  <View className="justify-center mb-6">
                    <Text className= {`text-2xl font-medium text-center  ${classes.textSecondary}`}>
                        Sign UP
                    </Text>
                   </View>
                   <View className="flex-row gap-3">
                     <View className="flex-1">
                      <Controller 
        control={control}
        name="firstname"
        render={({ field: { onChange, onBlur, value } }) => (
          <AppInput
            label="First Name"
            value ={value}
            onBlur={onBlur}
            onChangeText={onChange}
            errorMessage={errors.lastname?.message}
            autoCapitalize="words"
            returnKeyType="next"
          />
        )}
      />
      </View>
      <View className="flex-1">
        <Controller 
        control={control}
        name="lastname"
        render={({ field: { onChange, onBlur, value } }) => (
          <AppInput
            label="Last Name"
            value ={value}
            onBlur={onBlur}
            onChangeText={onChange}
            errorMessage={errors.lastname?.message}
            autoCapitalize="words"
            returnKeyType="next"
            ref= {lastNameRef}
          />
        )}
      />
      </View>
      </View>
      
      <Controller 
        control={control}
        rules={emailRules}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <AppInput
            label="Email"
            value ={value}
            onBlur={onBlur}
            onChangeText={onChange}
            onSubmit={() => passwordRef.current?.focus()}
            errorMessage={errors.email?.message}
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
            ref= {emailRef}
          />
        )}
      />
           <Controller 
        control={control}
        name="password"
        rules={passwordRules}
        render={({ field: { onChange, onBlur, value } }) => (
          <AppInput
            label="Password"
            value ={value}
            onBlur={onBlur}
            onChangeText={onChange}
            errorMessage={errors.password?.message}
            autoCapitalize="none"
            returnKeyType="next"
            ref= {passwordRef}
          />
        )}
      />
       <Controller 
        control={control}
        rules={passwordRules}
        name="confirmPassword"
        render={({ field: { onChange, onBlur, value } }) => (
          <AppInput
            label="Confirm Password"
            value ={value}
            onBlur={onBlur}
            onChangeText={onChange}
            errorMessage={errors.confirmPassword?.message}
            autoCapitalize="none"
            returnKeyType="done"
            ref= {confirmPasswordRef}
          />
        )}
      />
     
      <View>
        <TouchableOpacity className= {`${classes.btnPrimary} rounded-xl py-3.5 items-center`} onPress={handleSubmit(onSubmit)} disabled={isSubmitting}>
            {isSubmitting ? <ActivityIndicator/> : <Text onPress={handleSubmit(onSubmit)} className={classes.btnPrimaryText}> Sign UP</Text>}  
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-center mt-6">
      <Text className={`text-sm ${classes.textSecondary}`}>Already have an Account? {' '}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text className={`text-sm font-medium ${classes.tabActive}`}>
            Log In
        </Text>
    </TouchableOpacity>
    </View>
      </View>
        </ScrollView>
    </KeyboardAvoidingView>
    );
};

