import PropTypes from "prop-types";

import React, {Component} from "react";
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity
} from "react-native";


import CardWrapper from './CardWrapper';
import LabelEditable from './LabelEditable';

export default class CardEditLabel extends React.PureComponent {

    static propTypes = {
        idGroupLabel: PropTypes.number
    };

    constructor(props) {
        super(props);
        const {idGroupLabel, clickLabelCallback} = this.props;


        if (idGroupLabel) {
            this.labels = null;// TODO: labels list from idGroupLabel
            this.labels = [
                {key: 1, data: 3},
                {key: 2, data: 3},
                {key: 3, data: null},
                {key: 4, data: 3},
                {key: 5, data: 3},
                {key: 9, data: 3333},
                {key: 19, data: 3},
                {key: 12, data: 3},
                {key: 11, data: null},
                {key: 15, data: 3},
                {key: 16, data: 3},
            ];
            this.viewSub = () => (
                this.labels.map((label) => <LabelEditable  idLabel={label.data}/>)
            );
        }
        else {
            this.viewSub = () => (
                <TouchableOpacity
                    onPress={this.onClickLabel}
                    style={styles.backgroundText}
                >
                    <Text style={styles.emptyText}>
                        Labels...
                    </Text>
                </TouchableOpacity>

            );
        }
        this.onClickLabel = clickLabelCallback;

        this.state = {
            idGroupLabel: idGroupLabel,
            height: this.labels.length * 34 + 36,
        };

    }

    render() {
        return (
            <CardWrapper
                iconName='dns'
                iconColor='#555'
                iconSize={24}
                flexStyle={{}}
                minHeight={this.state.height}
            >
                {this.viewSub()}
            </CardWrapper>
        )
    }


}

const styles = StyleSheet.create({
    backgroundText: {
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 4
    },
    emptyText: {
        color: '#555'
    }
});