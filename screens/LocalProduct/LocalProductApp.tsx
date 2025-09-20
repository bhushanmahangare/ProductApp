// App.tsx
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductListScreen from '../LocalProduct/screens/ProductListScreen';
import ProductDetailScreen from '../LocalProduct/screens/ProductDetailScreen';
import type { RootStackParamList } from './types/navigation';
import { SafeAreaView, StatusBar, View, Text } from 'react-native';
import ThemeToggleButton from '../../src/components/ThemeToggleButton';
import { ThemeProvider, useTheme } from '../../context/ThemeContext';



const Stack = createNativeStackNavigator<RootStackParamList>();

export default function LocalProductApp() {
  const { theme } = useTheme();

  const backgroundColor = theme === 'dark' ? '#000' : '#f2f2f2';
  const textColor = theme === 'dark' ? '#fff' : '#000';

  function alert(arg0: string): void {
    throw new Error('Function not implemented.');
  }

  // function LogoTitle() {
  //   return (
  //     <Image
  //       style={{ width: 50, height: 50 }}
  //       source={require('../assets/download.png')}
  //     />
  //   );
  // }
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />
        <View style={{ flex: 1, padding: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: textColor }}>Contacts</Text>
            <ThemeToggleButton />

              <NavigationContainer>
                <Stack.Navigator initialRouteName="ProductList"
                    screenOptions={{
                      headerStyle: {
                        backgroundColor: '#142bd9',
                      },
                      headerTintColor: '#fff',
                      headerTitleStyle: {
                        fontWeight: 'bold',
                      },
                    }}
                >
                  <Stack.Screen 
                    name="ProductList" 
                    component={ProductListScreen} 
                    options={{ title: 'Products',
                      // headerStyle: {
                      //   backgroundColor: '#f4511e',
                      // },
                      // headerTintColor: '#fff',
                      // headerTitleStyle: {
                      //   fontWeight: 'bold',
                      // },
                      // headerRight: () => (
                      //   <Button onPress={() => alert('This is a button!')} title="Info" />
                      // ),
                    }}
                  />
                  <Stack.Screen 
                    name="ProductDetail" 
                    component={ProductDetailScreen} 
                    options={{ title: 'Product Details' ,
                      //headerTitle: () => <LogoTitle />,
                    }}
                  />
                </Stack.Navigator>
              </NavigationContainer>
            </View>
        </SafeAreaView>
  );
}