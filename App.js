import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import FetchLocation from './components/FetchLocation.js';
import UsersMap from './components/UsersMap.js';

export default class App extends React.Component {

  state = {
    userLocation: null,
  }

  getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position)
        this.setState({
          userLocation: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }
        })
      },
      err => console.log(err),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 }
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <FetchLocation title="Get Location" onGetLocation={this.getUserLocation} />
        <UsersMap userLocation={this.state.userLocation} />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
