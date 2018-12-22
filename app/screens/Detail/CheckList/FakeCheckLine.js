import React, {Component} from "react";
import {
    View,
    StyleSheet,
    TextInput,
} from "react-native";

import PropTypes from "prop-types";


const CHECK_LINE_MARGIN = 20;


export default class FakeCheckLine extends React.Component {

    static propTypes = {
        callback: PropTypes.func
    };

    constructor(props) {
        super(props);
        const {callback} = this.props;
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
                    style={styles.center}
                    placeholder='Add a specific task...'
                    onSubmitEditing={this.onChangeText}
                />

                <View style={styles.right}>
                </View>
            </View>
        )
    }


    onChangeText(txt) {
        if(this.props.callback)
            this.props.callback(txt);
        this.input.clear();
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