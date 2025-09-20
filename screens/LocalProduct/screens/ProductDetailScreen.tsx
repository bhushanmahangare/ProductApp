// screens/ProductDetailScreen.tsx
import React, { useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import type { RootStackParamList } from '../types/navigation';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetail'>;

type Product = {
  image: string;
  title: string;
  price: number;
  discount: number;
  category: string;
  brand: string;
  model: string;
  description?: string;
};

const ProductDetailScreen = ({ route, navigation }: Props) => {
  const { product }: { product: Product } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: product.title,
    });
  }, [navigation, product.title]);

  return (
    <ScrollView contentContainerStyle={productStyles.container}>
      <Image 
        source={{ uri: product.image }} 
        style={productStyles.image} 
        resizeMode="contain"
      />
      <View style={productStyles.details}>
        <Text style={productStyles.title}>{product.title}</Text>
        <View style={productStyles.priceContainer}>
          <Text style={productStyles.price}>${product.price}</Text>
          {product.discount > 0 && (
            <Text style={productStyles.discount}>Save {product.discount}%</Text>
          )}
        </View>
        <Text style={productStyles.category}>Category: {product.category}</Text>
        <Text style={productStyles.category}>Brand: {product.brand}</Text>
        <Text style={productStyles.model}>Model: {product.model}</Text>
        <Text style={productStyles.description}>{product.description}</Text>
      </View>
    </ScrollView>
  );
};

// Keep all the same styles from previous JavaScript version
const productStyles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
  details: {
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    color: 'green',
    marginBottom: 10,
  },
  category: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 10,
    textTransform: 'capitalize',
  },
  brand: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 10,
  },
  rating: {
    fontSize: 16,
    marginBottom: 15,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  discount: {
    fontSize: 16,
    color: 'red',
    marginLeft: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
  },
  model: {
    fontSize: 16,
    marginBottom: 5, // Add this style
  },
});

export default ProductDetailScreen;
