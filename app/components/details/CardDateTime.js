import PropTypes from "prop-types";

import React, {Component} from "react";
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity
} from "react-native";

import CardWrapper from './CardWrapper';

import realm from '../../realm/Realm';

import DateTimePicker from 'react-native-modal-datetime-picker';
import {Icon} from "react-native-elements";


export default class CardDateTime extends Component {

    static propTypes = {
        dateTime: PropTypes.object.isRequired,
        changeDateTimeCallback: PropTypes.func,
    };

    constructor(props) {
        super(props);
        const {dateTimeModel, changeDateTimeCallback} = this.props;

        let color = dateTimeModel.isCheck ? '#0d0' : (new Date()) > dateTimeModel.time ? '#e00' : '#333';
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
        this.setState({isDatePickerVisible: true});
    }

    hideDatePicker() {
        this.setState({isDatePickerVisible: false});
    }

    showTimePicker() {
        this.setState({isTimePickerVisible: true});
    }

    hideTimePicker() {
        this.setState({isTimePickerVisible: false});
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
        let color = isChecked ? '#0d0' : (new Date()) > this.state.dateTime ? '#e00' : '#333';
        this.setState({
            color: color
        });
        this.wrapper.updateIconColor(color);
    }

    renderDateSection() {
        return <View style={styles.dateSection}>
            <Text>Due:</Text>
            <View style={styles.dateSectionContent}>
                <TouchableOpacity
                    style={styles.dateSectionButton}
                    onPress={this.showDatePicker}
                >
                    <Text>{this.state.dateTime.toLocaleDateString()}</Text>
                </TouchableOpacity>
                <View style={styles.span}/>
                <TouchableOpacity
                    style={styles.dateSectionButton}
                    onPress={this.showTimePicker}
                >
                    <Text>{this.state.dateTime.toLocaleTimeString()}</Text>
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
                size={24}
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
                iconSize={24}
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
        marginRight: 20
    },
    dateSectionContent: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 4,
    },
    dateSectionButton: {
        width: '45%',
        borderColor: '#000',
        borderRadius: 5,
        borderWidth: 2,
        alignItems: 'center'
    },
    span: {
        width: '10%'
    }
});