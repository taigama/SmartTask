import PropTypes from "prop-types";

import React, {Component} from "react";
import {
    View,
    StyleSheet,
    Text, TouchableOpacity,
} from "react-native";


const LABEL_BORDER_RADIUS = 5;
const LABEL_MARGIN = 4;


export default class Label extends React.PureComponent {


    static propTypes = {
        idLabel: PropTypes.number,
        clickCallback: PropTypes.func
    };

    constructor(props) {
        super(props);


        const {idLabel, clickCallback} = this.props;
        // TODO: ListLabel.get(idLabel) => label string & label color
        var labelString, labelColor;
        if (!idLabel) {
            labelString = 'example looooooooooong llllllllllllllllllllong lllllllllllll';
            labelColor = '#e00';
        }
        else {
            labelString = idLabel.toString();
            labelColor = '#0d0';
        }

        this.state = {
            backgroundColor: labelColor,
            labelString: labelString,
        };

        if (clickCallback) {
            this.state.callback = clickCallback;
        }
    }

    render() {


        return (
            <TouchableOpacity
                onPress={this.state.callback}
                style={{
                    backgroundColor: this.state.backgroundColor,
                    borderRadius: LABEL_BORDER_RADIUS,
                    height: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: LABEL_MARGIN,
                    marginTop: LABEL_MARGIN
                }}
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
    labelText: {
        color: 'white',
        margin: 5,
        fontWeight: 'bold'
    },
});