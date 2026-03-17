export interface ThemeClass {
  
    "background": string,
    "surface": string,
    "inputBg": string,
    "cardBg": string,
    "border": string,
    "borderFocused": string,
    "textPrimary": string,
    "textSecondary": string,
    "textMuted": string,
    "textPrice": string,
    "textError": string,
    "textSuccess": string,
    "btnPrimary": string,
    "btnPrimaryText": string,
    "btnOutline": string,
    "btnOutlineText": string,
    "btnDisabled": string,
    "btnDisabledText": string,
    "iconDefault": string,
    "tabActive": string,
    "tabInactive": string,
    "wishlistActive": string,
    "wishlistInactive": string,
    "starRating": string,
    "badge": string,
    "badgeText": string,
    "pillActive": string,
    "pillActiveText": string,
    "pillInactive": string,
    "pillIncativeText": string,
    "successBg": string,
    "errorBg": string,
    "warningText": string,
    "overlay": string,
    "skeleton": string
  
};
export interface Product {
    "id": number,
    "title": string,
    "description": string,
    "price": number,
    "discountPercentage": number,
    "rating": number,
    "stock": number,
    "brand": string,
    "category": string,
    "thumbnail": string,
    "images": string[],
    "availabilityStatus": string,
    "tags": string[],
    "reviews": Review[] 

};
export interface Review {
    "rating": number,
    "comment": string,
    "date": string,
    "reviewerName": string,
    "reviewerEmail": string
};
export interface CartItems extends Product{
    "quantity": number
};

export interface WishList extends Product{
    "addedAt": string
};

export interface User{
    "id": string,
    "name": string,
    "email": string,
    "profileImage": string | null

};

export type PaymentMethod = "card"|"transfer"|"cash";

export interface OrderSummary{
    "id": string,
    "items": CartItems[],
    "total": number,
    "paymentMethod": string,
    "deliveryAddress":{
        "name": string,
        "address":string,
        "city": string,
        "phone": number,
        "createdAt": string
    }
};