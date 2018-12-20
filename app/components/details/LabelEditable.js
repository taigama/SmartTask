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

        let label = realm.objectForPrimaryKey('Label', data.idLabel);

        this.state = {
            label: label,
            isChecked: !!data.isCheck,
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
                    style={[styles.checkBox, {backgroundColor: this.state.label.color}]}
                >
                    <Text
                        numberOfLines={1}
                        style={styles.labelText}
                    >
                        {this.state.label.content}
                    </Text>
                    <View style={styles.iconBackground}>
                        <Icon
                            opacity={this.state.isChecked ? 1 : 0}
                            name='check'
                            color='black'
                            size={24}
                        />
                    </View>

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
            this.editCallback(this, this.state.label);
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
    iconBackground: {
        backgroundColor: '#fff',
        borderRadius: 4,
        width: 24,
        height: 24,
        marginRight: 3,
    },
    labelText: {
        color: 'white',
        margin: 5,
        fontWeight: 'bold',
        flex: 1
    },
});