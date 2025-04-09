// types/navigation.ts
export type RootStackParamList = {
    ProductList: undefined;
    ProductDetail: { product: Product };
  };
  
  export type Product = {
    id: number;
    title: string;
    image: string;
    price: number;
    description?: string;
    brand: string;
    model: string;
    color: string;
    category: string;
    discount: number;
  };