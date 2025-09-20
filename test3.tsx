import React, {useState, useEffect } from 'react';
import {
  Button,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Platform,
  ActivityIndicator
} from 'react-native';


const ShowHideExample = () => {
  const [login, setLogin] = useState(false);
//   const [ cnt, setCnt] = useState(0);
//   let counter = 0;

    const [ isLoading, setIsLoading ] = useState(false);
    const [ countdown, SetCountDown ] = useState(0);

    useEffect(() => {
        let interval:any;
        if( isLoading && countdown > 0 ) {
          interval = setInterval(() => {
            SetCountDown((prev) => prev - 1);
          }, 1000);
        }
        return () => clearInterval(interval);
      }, [isLoading, countdown]);



    const handleButtonPress = () => {
        setIsLoading(true);    
        SetCountDown(5);    
        setTimeout(() => {
          setIsLoading(false);
          SetCountDown(0);
        }, 5000);
      };

  const loginMsg = login ? 'You are loggedIn' : 'You are not loggedIn';

  return (
    <>
      {/* Sets the status bar content (dark icons) */}
      <StatusBar barStyle="dark-content" />

      {/* iOS: Fake the status bar background using a view */}
      {/* {Platform.OS === 'ios' && <View style={styles.statusBarBackground} />} */}

      {/* <SafeAreaView style={login ? styles.loggedIn : styles.loggedOut}>
       */}
      <SafeAreaView style={login ? styles.loggedIn : styles.loggedOut}>
        
        <Text>{loginMsg}</Text>
        {/* <Text>Counter: {cnt}</Text>
        <Text>Counter: {counter}</Text> */}
        <Button title="Toggle Login" onPress={() => setLogin(!login)} />
        {/* <Button title="increment" onPress={() => { setCnt(counter++); }} />
        <Button title="decrement" onPress={() => { setCnt(counter--); }} />
        <Button title="show Loader" onPress={() => {}} /> */}
        { isLoading ? ( 
            <>
            <ActivityIndicator size="large" />
            <ActivityIndicator size="small" color="#0000ff" />
            <ActivityIndicator size="large" color="#00ff00" />

            </> ) : ( <Button title="Click Me" onPress={handleButtonPress} disabled={isLoading} /> ) }

        {isLoading && (
            <View style={styles.overlay}>
                <ActivityIndicator size="large" color="#fff" />
                <Text style={styles.countdownText}> {countdown} seconds remaining </Text>
             </View>
        )}
      </SafeAreaView>
    </>
  );
};

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 62 : 0;

const styles = StyleSheet.create({
  statusBarBackground: {
    height: STATUS_BAR_HEIGHT,
    backgroundColor: 'green',
  },
  loggedIn: {
    flex: 1,
    //backgroundColor: 'red',
    padding: 12,
  },
  loggedOut: {
    flex: 1,
    //backgroundColor: 'blue',
    padding: 12,
  },
  countdownText: {
    color: 'white',
    fontSize: 20,
    marginTop: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default ShowHideExample;
