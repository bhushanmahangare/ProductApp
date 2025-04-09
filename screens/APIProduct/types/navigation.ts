// types/navigation.ts
export type RootStackParamList = {
    ProductList: undefined;
    ProductDetail: { product: Product };
  };
  
  export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: Rating;
  }
  
  export interface Rating {
    rate: number;
    count: number;
  }