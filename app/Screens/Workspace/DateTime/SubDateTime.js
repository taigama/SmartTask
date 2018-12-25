import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";

import Helper from "../../../_Commons/Helper";
import {Icon} from "native-base";



const MARGIN = 10;


export default class SubDateTime extends React.PureComponent {

	static propTypes = {
    date: PropTypes.object.isRequired,
		isCheck: PropTypes.bool.isRequired
	};

	constructor(props) {
		super(props);
		const { date, isCheck } = this.props;

		this.state = {
			dateTime: date,
			isCheck: isCheck,
		};
	}

  componentWillReceiveProps({date, isCheck}) {
    this.setState({
      dateTime: date,
      isCheck: isCheck,
    });
  }

  refresh() {
    this.forceUpdate();
  }

	render() {
    var remainString = Helper.remainTimeString(this.state.dateTime);
    let color = this.state.isCheck ? '#0d0' : (new Date()) > this.state.dateTime ? '#e00' : '#555';

    return <View style={[styles.dateSection,
    	{ backgroundColor: color }
    ]}>
        <Icon name="clock-alert" type="MaterialCommunityIcons" style={styles.icon} />
        <Text style={styles.text}>  {remainString}</Text>
      </View>
	}
}

const styles = StyleSheet.create({
	dateSection: {
		padding: 6,
		flexDirection: 'row',
		borderRadius: 10
	},
	icon: {
    fontSize: 15,
		color: '#fff'
	},
	text: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 13
	}
});