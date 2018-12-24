import React, { Component } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import PropTypes from "prop-types";


const CHECK_LINE_MARGIN = 10;
const LINE_HEIGHT = 40;

export default class FakeCheckLine extends React.Component {

	static propTypes = {
		callback: PropTypes.func
	};

	constructor(props) {
		super(props);
		const { callback } = this.props;
		this.onChangeText = this.onChangeText.bind(this);
	}

	render() {


		return (
			<View style={styles.wrap}>

				<View style={styles.left}>

				</View>

				<TextInput
					ref={(input) => {
						this.input = input;
					}}
          underlineColorAndroid='#3f51b555'
					style={styles.center}
					placeholder='Add a specific task...'
					onSubmitEditing={this.onChangeText}
				/>

			</View>
		)
	}


	onChangeText(e) {
		if (this.props.callback)
			this.props.callback(e.nativeEvent.text);
		this.input.clear();
	}
}

const styles = StyleSheet.create({
	wrap: {
		width: '100%',
		height: LINE_HEIGHT,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginLeft: CHECK_LINE_MARGIN,
		marginRight: CHECK_LINE_MARGIN,
	},
	left: {
		marginRight: CHECK_LINE_MARGIN - 4,
		width: 30,
		height: LINE_HEIGHT,
		justifyContent: 'center',
		alignItems: 'center'
	},
	center: {
		height: LINE_HEIGHT,
		justifyContent: 'center',
		flex: 1,
		paddingRight: CHECK_LINE_MARGIN,
	}
});