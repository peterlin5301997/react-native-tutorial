import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import FetchLocation from './components/FetchLocation.js';

export default function App() {

  getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position)
      },
      err => console.log(err),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 }
    )
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <FetchLocation title="Get Location" onGetLocation={this.getUserLocation}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
