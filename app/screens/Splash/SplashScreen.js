import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Animated, Easing } from 'react-native';
import { Actions } from 'react-native-router-flux';

class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0);

    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease
    }).start();
  }

  componentDidMount() {
    setTimeout(() => {
      Actions.project();
    }, 1500);
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.Image source={require('../../_Resources/icon_1.png')} style={{
          width: 100,
          height: 100,
          transform: [
            {
              rotate: this.animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg'],
              })
            },
            {
              scaleX: this.animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1]
              })
            },
            {
              scaleY: this.animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1]
              })
            }
          ],
        }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: "center",

  },
  splashImage: {
   
  }
});

export default SplashScreen;