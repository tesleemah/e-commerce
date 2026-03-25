import { Product } from ".";

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Register: undefined;
  MainTabs: undefined;
  ProductDetails: { product: Product };
  Checkout: undefined;
  Success: { orderId: string };
  EditProfile: undefined;
};
export type BottomTabParamList = {
  Home: undefined;
  Favorite: undefined;
  Cart: undefined;
  Profile: undefined;
};
