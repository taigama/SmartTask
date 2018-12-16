import PropTypes from "prop-types";

import React, {Component} from "react";
import {
    View,
    StyleSheet,
    Text, TouchableOpacity,
} from "react-native";

import {
    Icon
} from "react-native-elements"

const LABEL_BORDER_RADIUS = 5;
const LABEL_MARGIN = 4;


export default class LabelEditable extends React.Component {


    static propTypes = {
        data: PropTypes.object.isRequired,
        checkCallback: PropTypes.func,
        editCallback: PropTypes.func
    };

    constructor(props) {
        super(props);

        const {data, checkCallback, editCallback} = this.props;

        console.warn('data: ' + data);

        let label = realm.objectForPrimaryKey('Label', data.idLabel);

        this.state = {
            backgroundColor: label.color,
            isChecked: !!data.isCheck,
            content: label.content,
        };

        this.checkCallback = checkCallback;
        this.editCallback = editCallback;

        this.onCheck = this.onCheck.bind(this);
        this.onClickEdit = this.onClickEdit.bind(this);
    }

    render() {


        return (
            <View style={styles.wrap}>

                <TouchableOpacity
                    onPress={this.onCheck}
                    style={[styles.checkBox, {backgroundColor: this.state.backgroundColor}]}
                >
                    <Text
                        numberOfLines={1}
                        style={styles.labelText}
                    >
                        {this.state.content}
                    </Text>
                    <Icon
                        opacity={this.state.isChecked ? 1 : 0}
                        name='check'
                        color='black'
                        size={24}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this.onClickEdit}
                    >
                    <Icon
                        name='edit'
                        color='black'
                        size={24}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    onCheck() {
        this.setState({isChecked: !this.state.isChecked});
        realm.write(() => {
            this.props.data.isCheck = !this.state.isChecked;
        });



        if (this.checkCallback) {
            this.checkCallback(state);
        }
    }

    onClickEdit() {
        if (this.editCallback) {
            this.editCallback();
        }
    }

}

const styles = StyleSheet.create({
    wrap: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: LABEL_MARGIN
    },
    checkBox: {
        borderRadius: LABEL_BORDER_RADIUS,
        height: 30,
        marginRight: LABEL_MARGIN,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    labelText: {
        color: 'white',
        margin: 5,
        fontWeight: 'bold',
        flex: 1
    },
});