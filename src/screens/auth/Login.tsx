import { View, Text, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator, TextInput, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import { useTheme } from "../../context/ThemeContext";
import { useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { AppInput } from "../../components/AppInput";
import { emailRules, passwordRules } from "../../utils/validators";
import { useForm, Controller } from 'react-hook-form';
import { z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image } from 'react-native';
import  AsyncStorage  from "@react-native-async-storage/async-storage";


type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;
const LoginSchema = z.object({
    email: z.email({error: "Please enter a valid email address"}),
     password: z
      .string()
      .min(8, { message: "Password is too short" })
      .max(20, { message: "Password is too long" }),
});
const logo = require('../../../assets/logo.png');
type LoginFormData = z.infer<typeof LoginSchema>;
export const LoginScreen = ({ navigation }: Props)=> {
    const {classes} = useTheme();
    const {login} = useAuth();
    const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>({resolver: zodResolver(LoginSchema)});
    const passwordRef = useRef<TextInput>(null);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true)
    try {
        const stored = await AsyncStorage.getItem('registered_user')
        if (!stored) {
            console.log("Error reading data");
            return
        }
        const registeredUser = JSON.parse(stored)
        if (data.email !== registeredUser.email || 
            data.password !== registeredUser.password) {
                return
            }
        await login({
            id: registeredUser.id,
            name: registeredUser.name,
            email: registeredUser.email,
            profileImage: registeredUser.profileImage
        }, "token");
    } 
    catch(error) {
        console.error("something is wrong");
    } finally {
        setIsSubmitting(false)
    }
};

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
                    <Text className={`text-2xl font-medium text-center ${classes.textPrimary}`}>
                        Welcome Back
                    </Text>
                    <Text className= {`text-2xl font-medium text-center  ${classes.textSecondary}`}>
                        Log In
                    </Text>
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
            hintText="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
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
            hintText="Pasword"
            autoCapitalize="none"
            returnKeyType="next"
            ref= {passwordRef}
          />
        )}
      />
      <View className="items-end mb-6">
        <TouchableOpacity>
            <Text className={classes.tabActive}>
                Forgot Password
            </Text>
        </TouchableOpacity>
    </View>
      <View>
        <TouchableOpacity className= {`${classes.btnPrimary} rounded-xl py-3.5 items-center`} onPress={handleSubmit(onSubmit)} disabled={isSubmitting}>
            {isSubmitting ? <ActivityIndicator/> : <Text onPress={handleSubmit(onSubmit)} className={classes.btnPrimaryText}> Log In</Text>}  
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-center mt-6">
      <Text className={`text-sm ${classes.textSecondary}`}>Don't have an account? {' '}</Text>
      <TouchableOpacity onPress={() => navigation.push('Register')}>
        <Text className={`text-sm font-medium ${classes.tabActive}`}>
            Sign up
        </Text>
    </TouchableOpacity>
    </View>
      </View>
        </ScrollView>
    </KeyboardAvoidingView>
    );
    
};
