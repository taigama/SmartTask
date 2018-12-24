import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, Animated, Easing} from 'react-native';
import {Actions} from 'react-native-router-flux';

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
      Actions.replace('project');
    }, 1500);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          resizeMode='contain'
          source={require('../../_Resources/logo.png')}
          style={{
            width: 200,
            height: 200
          }}
        />
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
  splashImage: {}
});

export default SplashScreen;