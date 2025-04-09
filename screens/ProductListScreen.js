// screens/ProductListScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, TextInput, ScrollView, ActivityIndicator , Switch } from 'react-native';
import axios from 'axios';

//const API_BASE_URL = 'https://fakestoreapi.in/api/products';
const API_BASE_URL = 'https://fakestoreapi.com/products';


const ProductListScreen = ({ navigation }) => {
    const [dataSource, setDataSource] = useState('local'); // 'api' or 'local'
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');


    useEffect(() => {
        if (dataSource === 'api') {
          fetchInitialData();
        } else {
          loadLocalData();
        }
      }, [dataSource]);

      const loadLocalData = () => {
        try {
          setLoading(true);
          const localData = require('../data/products.json');
          
          // Validate local data structure
          if (!localData?.products || !Array.isArray(localData.products)) {
            throw new Error('Invalid local data format');
          }
      
          const productsArray = localData.products;
          
          setProducts(productsArray);
          setFilteredProducts(productsArray);
          
          // Extract unique categories
          const categoriesList = productsArray.map(p => p.category).filter(Boolean);
          setCategories(['all', ...new Set(categoriesList)]);
          
          setLoading(false);
        } catch (error) {
          setError(error.message || 'Failed to load local data');
          setLoading(false);
        }
      };
    
      const fetchInitialData = async () => {
        try {
          const [categoriesRes, productsRes] = await Promise.all([
            axios.get(`${API_BASE_URL}/category`),
            fetchProducts(1)
          ]);
          
          // Safely handle categories response
          const receivedCategories = categoriesRes?.data || [];
          setCategories(['all', ...receivedCategories]);
      
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };


const fetchProducts = async (pageNum, category = selectedCategory) => {
    if (dataSource === 'local') return;


  try {
    setLoading(true);
    let url = `${API_BASE_URL}?page=${pageNum}&limit=20`;
    
    if (category !== 'all') url += `&type=${category}`;
    if (sortOrder) url += `&sort=${sortOrder}`;

    const response = await axios.get(url);
    const productsData = response?.data?.products || []; // Now checking for .products
    const totalProducts = response?.data?.total || 0; // Assuming the API returns total count
    setTotalPages(Math.ceil(totalProducts / 20)); // Assuming 20 items per page
    setPage(pageNum);    
    setProducts(prev => [...prev, ...productsData]);
    setFilteredProducts(prev => [...prev, ...productsData]);

  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};


    
      const handleSearch = (text) => {
        setSearchQuery(text);
        const filtered = products.filter(product =>
          product.title.toLowerCase().includes(text.toLowerCase()) ||
          product.description.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredProducts(filtered);
      };

      const handleCategorySelect = async (category) => {
        setSelectedCategory(category);
        setProducts([]);
        setFilteredProducts([]);
        setPage(1);
        await fetchProducts(1, category);
      };
    
      const handleSortChange = () => {
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newSortOrder);
        setProducts([]);
        setFilteredProducts([]);
        setPage(1);
        fetchProducts(1, selectedCategory);
      };
    
      const loadMore = () => {
        if (page < totalPages && !loading) {
          fetchProducts(page + 1);
        }
      };



      const renderProductItem = ({ item }) => (
        <TouchableOpacity style={styles.productItem}
          onPress={() => navigation.navigate('ProductDetail', { product: item })}>
          <Image source={{ uri: item.image }} style={styles.productImage} />
          <View style={styles.productInfo}>
            <Text style={styles.productTitle}>{item.title}</Text>
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
    
      const renderFooter = () => (
        loading ? <ActivityIndicator size="large" color="#0000ff" /> : null
      );


  const renderCategoryButton = (category) => (
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

    // Add data source toggle UI
    const renderDataSourceToggle = () => (
        <View style={styles.toggleContainer}>
          <Text>API Data</Text>
          <Switch
            value={dataSource === 'local'}
            onValueChange={(value) => setDataSource(value ? 'local' : 'api')}
          />
          <Text>Local Data</Text>
        </View>
      );


  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Error: {error}</Text>
      </View>
    );
  }


  return (
    <View style={styles.container}>
              {renderDataSourceToggle()}

      {/* Rest of existing UI components */}
      <Text style={styles.dataSourceStatus}>
        Current Data Source: {dataSource.toUpperCase()}
      </Text>

         {/* Add Sort Button */}
      <TouchableOpacity style={styles.sortButton} onPress={handleSortChange}>
        <Text style={styles.sortButtonText}>
          Sort: {sortOrder.toUpperCase()}
        </Text>
      </TouchableOpacity>


      {/* Search Bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search products..."
        placeholderTextColor="#95a5a6"
        value={searchQuery}
        onChangeText={handleSearch}
      />
  
      {/* Category Filter */}
      <ScrollView 
        horizontal
        style={styles.categoryContainer}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      >
        {categories.map(renderCategoryButton)}
      </ScrollView>
  
      {/* Product List */}
      <FlatList
        data={filteredProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No products found</Text>
        }
      />
    </View>
  );
  
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
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
  // ... your existing styles
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    gap: 10,
    backgroundColor: '#f0f0f0'
  },
  });

export default ProductListScreen;