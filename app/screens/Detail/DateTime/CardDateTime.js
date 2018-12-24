import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import DateTimePicker from 'react-native-modal-datetime-picker';
import PropTypes from "prop-types";

import CardWrapper from '../CardWrapper';
import realm from '../../../Realm/Realm';



const MARGIN = 10;


export default class CardDateTime extends Component {

	static propTypes = {
    dateTimeModel: PropTypes.object.isRequired,
		changeDateTimeCallback: PropTypes.func,
	};

	constructor(props) {
		super(props);
		const { dateTimeModel, changeDateTimeCallback } = this.props;

		let color = dateTimeModel.isCheck ? '#0d0' : (new Date()) > dateTimeModel.time ? '#e00' : '#555';
		this.state = {
			dateTime: dateTimeModel.time,
			isCheck: dateTimeModel.isCheck,
			isDatePickerVisible: false,
			isTimePickerVisible: false,
			color: color
		};

		this.onClicked = this.onClicked.bind(this);
		this.showDatePicker = this.showDatePicker.bind(this);
		this.hideDatePicker = this.hideDatePicker.bind(this);
		this.showTimePicker = this.showTimePicker.bind(this);
		this.hideTimePicker = this.hideTimePicker.bind(this);

		this.handleDatePicked = this.handleDatePicked.bind(this);
		this.handleTimePicked = this.handleTimePicked.bind(this);
	}

	showDatePicker() {
		this.setState({ isDatePickerVisible: true });
	}

	hideDatePicker() {
		this.setState({ isDatePickerVisible: false });
	}

	showTimePicker() {
		this.setState({ isTimePickerVisible: true });
	}

	hideTimePicker() {
		this.setState({ isTimePickerVisible: false });
	}

	handleDatePicked = (date) => {
		this.setState({
			isDatePickerVisible: false,
			dateTime: date
		});

		this.updateColor(this.state.isCheck);

		if (this.props.changeDateTimeCallback)
			this.props.changeDateTimeCallback(date, this.state.isCheck);
	};

	handleTimePicked = (date) => {
		this.setState({
			isTimePickerVisible: false,
			dateTime: date
		});

		this.updateColor(this.state.isCheck);

		if (this.props.changeDateTimeCallback)
			this.props.changeDateTimeCallback(date, this.state.isCheck);
	};

	updateColor(isChecked) {
		let color = isChecked ? '#0d0' : (new Date()) > this.state.dateTime ? '#e00' : '#555';
		this.setState({
			color: color
		});
		this.wrapper.updateIconColor(color);
	}

	renderDateSection() {
		var countDownDate = this.state.dateTime.getTime();

		var now = (new Date()).getTime();

		var remainString = "";

		var distance;

		if(countDownDate > now)
		{
      remainString = "Due in: ";

      distance = countDownDate - now;

      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      if(days > 0)
        remainString += days + "d ";

      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      if(hours > 0)
        remainString += hours + "h ";

      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

      remainString += minutes + "m ";
    }
    else if(countDownDate < now)
    {
      remainString = "Overdue by: ";

      distance = now - countDownDate;

      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      if(days > 0)
        remainString += days + "d ";

      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      if(hours > 0)
        remainString += hours + "h ";

      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

      remainString += minutes + "m ";
    }

		return <View style={styles.dateSection}>
			<Text style={{color: this.state.color}}>
				{remainString}
			</Text>
			<View style={styles.dateSectionContent}>
				<TouchableOpacity
					style={styles.dateSectionButton}
					onPress={this.showDatePicker}
				>
					<Text>{this.state.dateTime.toLocaleDateString()}</Text>
				</TouchableOpacity>
				<View style={styles.span} />
				<TouchableOpacity
					style={styles.dateSectionButton}
					onPress={this.showTimePicker}
				>
					<Text>{this.state.dateTime.toLocaleTimeString().replace(/^([^\d]*\d{1,2}:\d{1,2}):\d{1,2}([^\d]*)$/, '$1$2')}</Text>
				</TouchableOpacity>
			</View>

			<DateTimePicker
				mode='date'
				date={this.state.dateTime}
				isVisible={this.state.isDatePickerVisible}
				onConfirm={this.handleDatePicked}
				onCancel={this.hideDatePicker}
			/>
			<DateTimePicker
				mode='time'
				date={this.state.dateTime}
				isVisible={this.state.isTimePickerVisible}
				onConfirm={this.handleTimePicked}
				onCancel={this.hideTimePicker}
			/>
		</View>


	}

	renderCheckboxSection() {
		return <TouchableOpacity
			onPress={this.onClicked}
		>
			<Icon
				name={this.state.isCheck ? 'check-box' : 'check-box-outline-blank'}
				color={this.state.color}
				size={30}
			/>
		</TouchableOpacity>
	}

	render() {
		return (
			<CardWrapper
				ref={(wrapper) => {
					this.wrapper = wrapper;
				}}
				iconName='event'
				iconColor={this.state.color}
				iconSize={30}
				minHeight={0}
				flexStyle={styles.wraperAdditionStyle}
			>
				{this.renderDateSection()}
				{this.renderCheckboxSection()}
			</CardWrapper>
		)
	}

	onClicked() {
		var newValue = !this.state.isCheck;
		this.setState({
			isCheck: newValue,
		});
		this.updateColor(newValue);

		if (this.props.changeDateTimeCallback)
			this.props.changeDateTimeCallback(this.state.dateTime, newValue);
	}


}

const styles = StyleSheet.create({
	wraperAdditionStyle: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	dateSection: {
		flex: 1,
		marginRight: MARGIN
	},
	dateSectionContent: {
		flexDirection: 'row',
		width: '100%',
		marginTop: 4,
	},
	dateSectionButton: {
		width: '45%',
		borderColor: '#555',
		borderRadius: 5,
		borderWidth: 1,
		alignItems: 'center'
	},
	span: {
		width: '10%'
	}
});