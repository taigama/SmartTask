import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import { Icon } from "react-native-elements";
import PropTypes from "prop-types";

import CheckLine from './CheckLine';
import FakeCheckLine from './FakeCheckLine';
import realm, { getNewId } from '../../../Realm/Realm';


const CHECK_LIST_MARGIN = 20;

export default class CheckList extends Component {

	static propTypes = {
		data: PropTypes.object.isRequired,// CheckListSchema (id, checks)
		deleteCallback: PropTypes.func,
	};

	constructor(props) {
		super(props);
		const { data, deleteCallback } = this.props;

		this.state = {
			data: data
		};

		this.onChangeChecklistHeader = this.onChangeChecklistHeader.bind(this);

		this.onAddNewLine = this.onAddNewLine.bind(this);
		this.onDeleteLine = this.onDeleteLine.bind(this);

		this.onClickDeleteCheckList = this.onClickDeleteCheckList.bind(this);
		this.trulyDeleteChecklist = this.trulyDeleteChecklist.bind(this);
	}

	renderChildren() {
		return (this.state.data.checks || []).map(
			(checkLine) => <CheckLine
				data={checkLine}
				deleteCallback={this.onDeleteLine}
			/>
		);
	}

	render() {
		return (
			<View
				style={styles.wrap}
			>
				<View style={styles.headerSection}>

					<View style={styles.headerLeft}>
						<Icon
							name='check-box'
							color='#333'
							size={30}
						/>
					</View>

					<TextInput
						style={styles.headerCenter}
						placeholder='Group of task you will do...'
						defaultValue={this.state.data.title}
						onFocus={this.onFocusText}
						onBlur={this.onBlurText}
						onSubmitEditing={this.onChangeChecklistHeader}

					/>

					<View style={[styles.headerRight, { width: 30, height: 30 }]} />

					{/*<TouchableOpacity
                        style={styles.headerRight}
                        onPress={this.onClickDeleteCheckList}
                    >
                        <Icon
                            name='delete-forever'
                            color='#333'
                            size={30}
                        />
                    </TouchableOpacity>*/}

				</View>


				<View style={style.childSection}>
					{this.renderChildren()}
					<FakeCheckLine callback={this.onAddNewLine} />
				</View>
			</View>
		)
	}

	onChangeChecklistHeader(text) {
		var checkList = this.state.data;
		realm.write(() => {
			checkList.title = text;
		});
	}


	onAddNewLine(text) {
		var newId = 1;
		var allChecks = realm.objects('Check');
		if (allChecks != null) {
			newId = getNewId(allChecks, 'id');
		}
		var checkList = this.state.data;


		realm.write(() => {
			realm.create('Check', {
				key: newId,
				isCheck: false,
				content: text,
				checkList: checkList
			});

			checkList = realm.objectForPrimaryKey('CheckList', checkList.id);
		});

		this.setState({ data: checkList });
	}

	onDeleteLine(checkLineData) {
		var newData = this.state.data.id;
		realm.write(() => {
			realm.delete(checkLineData);
			newData = realm.objectForPrimaryKey('CheckList', newData);
		});

		this.setState({ data: newData });
	}

	onClickDeleteCheckList() {
		Alert.alert(
			'Deleting a checklist',
			'Do you really want to delete this checklist?',
			[
				{ text: 'Cancel' },
				{ text: 'OK', onPress: this.trulyDeleteChecklist },
			]
		);
	}

	trulyDeleteChecklist() {
		if (this.props.deleteCallback)
			this.props.deleteCallback(this.state.data);
	}
}

const styles = StyleSheet.create({
	wrap: {
		width: '100%',
		minHeight: 0,
	},
	headerSection: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		margin: CHECK_LIST_MARGIN,
		marginRight: CHECK_LIST_MARGIN / 2.0,
	},
	headerLeft: {
		marginRight: 20,
	},
	headerRight: {
		marginLeft: CHECK_LIST_MARGIN / 2.0
	},
	headerCenter: {
		height: 30,
		justifyContent: 'center',
		flex: 1
	},
	childSection: {
		width: '100%',
		minHeight: 0,
	}
});