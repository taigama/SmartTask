
import PropTypes from "prop-types";

import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text
} from "react-native";

import CardWrapper from './CardWrapper';
import Label from './Label';


export default class CardLabel extends Component {

  static propTypes = {
    idGroupLabel: PropTypes.number
  };

  constructor(props) {
      super(props);
      this.state = {
          idGroupLabel: null,
      };
  }

  render() {
    const { idGroupLabel } = this.props;
    this.viewSub = null;


    var viewSub;
    if(idGroupLabel)
    {
      this.labels = null;// TODO: labels list from idGroupLabel
      this.labels = [
          {key: 3},
          {key: 4},
          {key: 5},
          {key: 6},
          {key: 6},
          {key: 6},
          {key: 6},
          {key: undefined},
          {key: 6},
          {key: 6},
          {key: 6},
          {key: undefined},
      ];
      this.viewSub = () => (
        this.labels.map((label) => <Label idLabel={label.key} />)
      );
    }
    else
    {
      this.viewSub = () => (
          <View style={styles.backgroundText}>
              <Text style={styles.emptyText}>
                  Labels...
              </Text>
          </View>
      );
    }

    return (
      <CardWrapper
        iconName='dns'
        iconColor='#555'
        iconSize={24}
        renderContent={this.viewSub}
      />
    )
  }


}

const styles = StyleSheet.create({
  backgroundText: {
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 4
  },
  emptyText: {
    color: '#555'
  },
});