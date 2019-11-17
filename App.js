import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import FetchLocation from './components/FetchLocation.js';
import UsersMap from './components/UsersMap.js';

export default class App extends React.Component {

  state = {
    userLocation: null,
    userPlaces: [],
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
        fetch('https://react-native-tutorial-98e02.firebaseio.com/places.json', {
          method: 'POST',
          body: JSON.stringify({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        }).then(res => console.log(res))
          .catch(err => console.log(err))
      },
      err => console.log(err),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 }
    )
  }

  getUserPlaces = () => {
    fetch('https://react-native-tutorial-98e02.firebaseio.com/places.json',)
      .then(res => res.json())
      .then(data => {
        const placesArray = [];
        for (i in data) {
          placesArray.push({
            latitude: data[i].latitude,
            longitude: data[i].longitude,
            id: i
          })
        }
        this.setState({ userPlaces: placesArray })
      })
      .catch(err => console.log(err))

  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <View style={{ marginBottom: 20 }}>
          <Button title="Get User Places" onPress={this.getUserPlaces} />
        </View>
        <FetchLocation title="Get Location" onGetLocation={this.getUserLocation} />
        <UsersMap userLocation={this.state.userLocation} userPlaces={this.state.userPlaces} />
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
