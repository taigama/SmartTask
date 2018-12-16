import PropTypes from "prop-types";

import React, {Component} from "react";
import {
    View,
    StyleSheet,
} from "react-native";
import {
    Icon,
} from "react-native-elements";


export default class CardWrapper extends React.PureComponent {

    static propTypes = {

        iconName: PropTypes.string.isRequired,
        iconSize: PropTypes.number,
        iconColor: PropTypes.string,
        flexStyle: PropTypes.object,
        minHeight: PropTypes.number.isRequired,
    };

    constructor(props) {
        super(props);


        const {iconName, iconSize, iconColor, flexStyle, minHeight} = this.props;

        var sizeIcon = iconSize ? iconSize : 24;

        this.state = {
            iconName: iconName,
            iconSize: sizeIcon,
            iconColor: iconColor ? iconColor : 'black',
            margin: 30 - sizeIcon,
            flexStyle: flexStyle ? flexStyle : {flexDirection: 'row', flexWrap: 'wrap'},
            minHeight: minHeight
        };
    }


    render() {

        return (
            <View style={[styles.wrapCard, {minHeight: this.state.minHeight}]}>
                <View style={{
                    width: 30 - this.state.margin,
                    margin: 20 + this.state.margin,
                }}>
                    <Icon
                        name={this.state.iconName}
                        size={this.state.iconSize}
                        color={this.state.iconColor}
                    />
                </View>
                <View style={[styles.wrapContent, this.state.flexStyle]}>
                    {this.props.children}
                </View>
            </View>
        )
    }


}

const styles = StyleSheet.create({
    wrapCard: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#eee'
    },
    wrapContent: {
        flex: 1,
        marginTop: 20,
        marginRight: 20
    }
});