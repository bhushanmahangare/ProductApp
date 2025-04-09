// screens/ProductListScreen.tsx
import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  StyleSheet, 
  TextInput, 
  ScrollView, 
  ActivityIndicator,
  ListRenderItem
} from 'react-native';
import localData from '../assets/products.json';
import type { RootStackParamList, Product } from '../types/navigation';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductList'>;

const ProductListScreen = ({ navigation }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(['all']);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      if (!localData?.products || !Array.isArray(localData.products)) {
        throw new Error('Invalid local data format');
      }

      const productsArray: Product[] = localData.products.map(product => ({
        ...product,
        discount: product.discount ?? 0, // Ensure discount is always a number
        color: product.color ?? '', // Ensure color is always a string
      }));
      setProducts(productsArray);
      setFilteredProducts(productsArray);
      
      const categoriesList = productsArray
        .map(p => p.category)
        .filter((c): c is string => Boolean(c));
      setCategories(['all', ...new Set(categoriesList)]);
      
      setLoading(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load local data');
      setLoading(false);
    }
  }, []);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(text.toLowerCase()) ||
      product.description?.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(p => p.category === category);
      setFilteredProducts(filtered);
    }
    setSearchQuery('');
  };

  const renderProductItem: ListRenderItem<Product> = ({ item }) => (
    <TouchableOpacity 
      style={styles.productItem}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <Image 
        source={{ uri: item.image }} 
        style={styles.productImage} 
        resizeMode="contain"
      />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle} numberOfLines={1}>{item.title}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.productPrice}>${item.price}</Text>
          {item.discount > 0 && (
            <Text style={styles.discountText}>{item.discount}% off</Text>
          )}
        </View>
        <Text style={styles.productBrand}>{item.brand} {item.model}</Text>
        <Text style={styles.productCategory}>{item.category}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderCategoryButton = (category: string) => (
    <TouchableOpacity
      key={category}
      style={[
        styles.categoryButton,
        selectedCategory === category && styles.selectedCategoryButton
      ]}
      onPress={() => handleCategorySelect(category)}
    >
      <Text style={[
        styles.categoryButtonText,
        selectedCategory === category && styles.selectedCategoryText
      ]}>
        {category}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search products..."
        value={searchQuery}
        onChangeText={handleSearch}
        placeholderTextColor="#999"
      />

      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryContainer}
      >
        {categories.map(renderCategoryButton)}
      </ScrollView>

      <FlatList
        data={filteredProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No products found matching your criteria</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  // Keep all the same styles from previous JavaScript version
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 10,
  },
  searchInput: {
    height: 40,
    backgroundColor: 'white',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    margin: 10,
    fontSize: 16,
  },
  categoryContainer: {
    height: 50,
    paddingVertical: 10,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    marginRight: 10,
    height: 36,
  },
  selectedCategoryButton: {
    backgroundColor: '#2c3e50',
  },
  categoryButtonText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: 'white',
  },
  productItem: {
    flexDirection: 'row',
    padding: 15,
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 15,
    borderRadius: 8,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#27ae60',
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 12,
    color: '#7f8c8d',
    textTransform: 'capitalize',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#95a5a6',
  },
  listContainer: {
    paddingBottom: 20,
  },
   // ... previous styles
sortButton: {
  backgroundColor: '#2c3e50',
  padding: 10,
  margin: 10,
  borderRadius: 5,
  alignSelf: 'flex-end',
},
sortButtonText: {
  color: 'white',
  fontWeight: 'bold',
},
toggleContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 10,
  backgroundColor: '#f8f8f8',
},
dataSourceStatus: {
  textAlign: 'center',
  color: '#666',
  marginBottom: 10,
},
priceRow: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 10,
},
discountText: {
  color: '#e74c3c',
  fontWeight: 'bold',
},
productBrand: {
  fontSize: 14,
  color: '#7f8c8d',
},
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#e74c3c',
    textAlign: 'center',
    marginHorizontal: 20,
  },
});

export default ProductListScreen;