
import PropTypes from "prop-types";

import React, { Component } from "react";
import {
  View,
  StyleSheet,
} from "react-native";
import {
  Icon,
} from "react-native-elements";


export default class CardWrapper extends Component {

  static propTypes = {

    iconName: PropTypes.string.isRequired,
    iconSize: PropTypes.number,
    iconColor: PropTypes.string,

    renderContent: PropTypes.func.isRequired,
  };

    constructor(props) {
        super(props);


        const { iconName, iconSize, iconColor, renderContent } = this.props;

        var sizeIcon = iconSize?iconSize:24;

        this.state = {
            iconName: iconName,
            iconSize: sizeIcon,
            iconColor: iconColor?iconColor:'black',
            margin: 30-sizeIcon
        };

        this.renderContent = renderContent;
    }


  render() {

    return (
      <View style={styles.wrapCard}>
        <View style={{
            width: 30 - this.state.margin,
            margin: 20 + this.state.margin,
        }}>
          <Icon
              name={this.state.iconName}
              size={this.state.iconSize}
              color={this.state.iconColor}
          />
        </View>
        <View style={styles.wrapContent}>
            {this.renderContent()}
        </View>
      </View>
    )
  }


}

const styles = StyleSheet.create({
  wrapCard: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#eee',
    minHeight: 70,
  },
  wrapContent: {
    flex: 1,
    minHeight: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    marginRight: 20
  }
});