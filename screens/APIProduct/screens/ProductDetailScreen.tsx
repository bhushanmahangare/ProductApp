// screens/ProductDetailScreen.tsx
import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import type { RootStackParamList } from '../types/navigation';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetail'>;

const ProductDetailScreen = ({ route }: Props) => {
  const { product } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image 
        source={{ uri: product.image }} 
        style={styles.image} 
        resizeMode="contain"
      />
      <View style={styles.details}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        <Text style={styles.category}>Category: {product.category}</Text>
        
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>
            ⭐ {product.rating.rate} ({product.rating.count} reviews)
          </Text>
        </View>

        <Text style={styles.description}>{product.description}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
    color: '#2c3e50',
  },
  price: {
    fontSize: 20,
    color: '#27ae60',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  category: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 15,
    textTransform: 'capitalize',
  },
  ratingContainer: {
    marginBottom: 15,
  },
  rating: {
    fontSize: 16,
    color: '#f39c12',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#2c3e50',
  },
});

export default ProductDetailScreen;