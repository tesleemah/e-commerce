import { Product } from "."

export type RootStackParamList ={
    Splash: undefined,
    Login: undefined,
    Register: undefined,
    MainTabs : undefined,
    ProductDetails: { product: Product },
    Checkout: undefined,
    Success: { orderId: string }
}
export type BottomTabParamList ={
    Home: undefined,
    Wishlist: undefined,
    Cart: undefined,
    Profile: undefined

}