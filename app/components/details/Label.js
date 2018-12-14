
import PropTypes from "prop-types";

import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
} from "react-native";

const LABEL_BORDER_RADIUS = 5;
const LABEL_PADDING = 5;


export default class Label extends Component {



  static propTypes = {
    idLabel: PropTypes.number
  };

  constructor(props) {
      super(props);


      const { idLabel } = this.props;
      // TODO: ListLabel.get(idLabel) => label string & label color
      var labelString, labelColor;
      if(!idLabel) {
          labelString = 'example';
          labelColor = '#e00';
      }
      else {
          labelString = idLabel.toString();
          labelColor = '#0d0';
      }

      this.state = {
          backgroundColor: labelColor,
          labelString: labelString,
      };
  }

  render() {


    return (
      <View style={{
        backgroundColor: this.state.backgroundColor,
        borderRadius: LABEL_BORDER_RADIUS,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 4,
        marginTop: 4
      }}>
        <Text style={styles.labelText}>
            {this.state.labelString}
        </Text>
      </View>
    )
  }


}

const styles = StyleSheet.create({
  labelText: {
      color: 'white',
      margin: 5,
      fontWeight: 'bold',
  },
});