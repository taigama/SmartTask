import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";


const LABEL_BORDER_RADIUS = 5;
const LABEL_MARGIN = 4;

export default class Label extends React.Component {


	static propTypes = {
		data: PropTypes.object.isRequired,// LabelItem
		clickCallback: PropTypes.func
	};

	constructor(props) {
		super(props);


		const { data, clickCallback } = this.props;

		this.state = {
			backgroundColor: data.color,
			labelString: data.title,
		};

		if (clickCallback) {
			this.state.callback = clickCallback;
		}
	}

	render() {


		return (
			<TouchableOpacity
				onPress={this.state.callback}
				style={[styles.labelBackground, { backgroundColor: this.state.backgroundColor }]}
			>
				<Text
					numberOfLines={1}
					style={styles.labelText}
				>
					{this.state.labelString}
				</Text>
			</TouchableOpacity>
		)
	}


}

const styles = StyleSheet.create({
	labelBackground: {
		borderRadius: LABEL_BORDER_RADIUS,
		height: 30,
		minWidth: 50,
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: LABEL_MARGIN,
		marginBottom: LABEL_MARGIN
	},
	labelText: {
		color: 'white',
		margin: 5,
		fontWeight: 'bold'
	},
});