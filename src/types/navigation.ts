import { NavigatorScreenParams } from "@react-navigation/native";
import { Product } from ".";

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Register: undefined;
  MainTabs: NavigatorScreenParams<BottomTabParamList>;
  ProductDetails: { product: Product };
  Checkout: undefined;
  Success: {
    orderId: string
    total: number
    paymentMethod: string
    address: string
};
  EditProfile: undefined;
};
export type BottomTabParamList = {
  Home: undefined;
  Favorite: undefined;
  Cart: undefined;
  Profile: undefined;
};
