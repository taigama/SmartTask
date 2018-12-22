import PropTypes from "prop-types";

import React, {Component} from "react";
import {
    TouchableOpacity
} from "react-native";

import {
    Icon
} from "react-native-elements";


export default class Checkbox extends Component {

    static propTypes = {
        size: PropTypes.number,
        isCheck: PropTypes.bool,
        callback: PropTypes.func,
        color: PropTypes.string,
    };

    constructor(props) {
        super(props);
        const {size, isCheck, callback, color} = this.props;


        this.state = {
            size: size || 24,
            color: color || '#333',
            isCheck: isCheck || false,
        };

        this.onClicked = this.onClicked.bind(this);
    }

    setColor(color) {
        this.setState({
            color: color
        });
    }

    setCheck(isCheck)
    {
        this.setState({
            isCheck: isCheck
        });
    }

    render() {
        return (
            <TouchableOpacity
                onPress={this.onClicked}
            >
                <Icon
                    name={this.state.isCheck ? 'check-box' : 'check-box-outline-blank'}
                    color={this.state.color}
                    size={this.state.size}
                />
            </TouchableOpacity>
        )
    }

    onClicked() {
        var newValue = !this.state.isCheck;
        this.setState({
            isCheck: newValue,
        });

        if (this.props.callback)
            this.props.callback(newValue);
    }
}