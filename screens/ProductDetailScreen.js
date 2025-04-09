// screens/ProductDetailScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

//const API_BASE_URL = 'https://fakestoreapi.in/api/products';
const API_BASE_URL = 'https://fakestoreapi.com/products'

const ProductDetailScreen = ({ route }) => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { productId } = route.params;
  
    useEffect(() => {
      const fetchProductDetails = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/${productId}`);
          setProduct(response.data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchProductDetails();
    }, [productId]);
  
    if (loading) {
      return <ActivityIndicator size="large" style={styles.loader} />;
    }
  
    if (error) {
      return <Text style={styles.error}>Error: {error}</Text>;
    }
  
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Image 
          source={{ uri: product.image }} 
          style={styles.image} 
          resizeMode="contain"
        />
        <View style={styles.details}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>Price: ${product.price}</Text>
          <Text style={styles.category}>Category: {product.category}</Text>
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
  rating: {
    fontSize: 16,
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
  },
});

export default ProductDetailScreen;