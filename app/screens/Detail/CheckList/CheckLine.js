import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import PropTypes from "prop-types";

import Checkbox from '../Checkbox';
import ConditionButton from "../ConditionButton";
import realm, { getNewId } from '../../../Realm/Realm';

const CHECK_LINE_MARGIN = 20;

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
		this.onFocusText = this.onFocusText.bind(this);
		this.onBlurText = this.onBlurText.bind(this);

		this.onClickDelete = this.onClickDelete.bind(this);
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
					style={styles.center}
					placeholder='Specify what to do...'
					defaultValue={this.state.data.content}
					onFocus={this.onFocusText}
					onBlur={this.onBlurText}
					onSubmitEditing={this.onChangeText}
				/>

				<View style={styles.right}>
					<ConditionButton
						ref={(btnDelete) => {
							this.btnDelete = btnDelete;
						}}
						isShow={false}
						iconName='delete'
						callback={this.onClickDelete}
					/>
				</View>
			</View>
		)
	}

	onCheck(bool) {
		this.isCheck = bool;
		this.saveChange();
	}

	//
	// this.onChangeText = this.onChangeText.bind(this);
	// this.onFocusText = this.onFocusText.bind(this);
	// this.onBlurText = this.onBlurText.bind(this);
	//
	// this.onClickDelete = this.onClickDelete.bind(this);

	onChangeText(txt) {
		this.txt = txt;

		this.onBlurText();
	}

	onFocusText() {
		this.btnDelete.setShow(true);
	}
	onBlurText() {
		this.btnDelete.setShow(false);
		this.saveChange();
	}


	saveChange() {
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

	onClickDelete() {
		Alert.alert(
			'Deleting line',
			'Do you really want to delete this line?',
			[
				{ text: 'Cancel' },
				{ text: 'OK', onPress: this.onConfirmDelete },
			]
		)
	}
	onConfirmDelete() {
		if (this.props.deleteCallback)
			this.props.deleteCallback(this.state.data);
	}

}

const styles = StyleSheet.create({
	wrap: {
		width: '100%',
		height: 30,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginLeft: CHECK_LINE_MARGIN,
		marginRight: CHECK_LINE_MARGIN,
	},
	left: {
		marginRight: 20,
		width: 30,
		height: 30,
		justifyContent: 'center',
		alignItems: 'center'
	},
	right: {
		width: 30,
		height: 30,
		justifyContent: 'center',
		alignItems: 'center'
	},
	center: {
		height: 30,
		justifyContent: 'center',
		flex: 1
	}
});