import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import PropTypes from "prop-types";

import Checkbox from '../Checkbox';
import realm, { getNewId } from '../../../Realm/Realm';

const CHECK_LINE_MARGIN = 10;
const LINE_HEIGHT = 40;

export default class CheckLine extends React.Component {


	static propTypes = {
		data: PropTypes.object.isRequired,
		deleteCallback: PropTypes.func
	};

	constructor(props) {
		super(props);//data: CheckSchema


		const { data, deleteCallback } = this.props;


		this.state = {
			data: data
		};


		this.onCheck = this.onCheck.bind(this);

		this.onChangeText = this.onChangeText.bind(this);

		this.onConfirmDelete = this.onConfirmDelete.bind(this);

		this.txt = data.content;
		this.isCheck = data.isCheck;
	}

	render() {


		return (
			<View style={styles.wrap}>

				<View style={styles.left}>
					<Checkbox
						isCheck={this.state.data.isCheck}
						callback={this.onCheck}
					/>
				</View>

				<TextInput
					underlineColorAndroid='#3f51b555'
					style={styles.center}
					placeholder='Specify what to do...'
					defaultValue={this.state.data.content}
					onSubmitEditing={this.onChangeText}
				/>
			</View>
		)
	}

	onCheck(bool) {
		this.isCheck = bool;
		this.saveChange();
	}

	onChangeText(e) {
		this.txt = e.nativeEvent.text;

		this.saveChange();
	}


	saveChange() {

		if(this.txt == null || this.txt == "")
		{
      this.onConfirmDelete();
      return;
		}

		var checks = [
			this.txt != this.props.data.content,
			this.isCheck != this.props.data.isCheck
		];

		if (checks[0] || checks[1]) {
			var data = this.props.data;

			realm.write(() => {
				data.isCheck = this.isCheck;
				data.content = this.txt;
			});
		}
	}

	onConfirmDelete() {
		if (this.props.deleteCallback)
			this.props.deleteCallback(this.state.data);
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
		height: 5,
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	center: {
		justifyContent: 'center',
    height: LINE_HEIGHT,
		flex: 1,
		paddingRight: CHECK_LINE_MARGIN,
	}
});