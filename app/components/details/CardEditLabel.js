import PropTypes from "prop-types";

import React, {Component} from "react";
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    TextInput,
    Keyboard
} from "react-native";


import tinycolor from "tinycolor2";
import {
    HueSlider,
    SaturationSlider,
    LightnessSlider
} from "react-native-color";

export default class CardEditLabel extends React.PureComponent {

    static propTypes = {
        editComplete: PropTypes.func
    };

    constructor(props) {
        super(props);


        const {editComplete} = this.props;

        this.label = null;
        this.state = {
            text: "",
            color: tinycolor("blue").toHsl(),
            haveLabel: false
        };

        this.updateHue = this.updateHue.bind(this);
        this.updateSaturation = this.updateSaturation.bind(this);
        this.updateLightness = this.updateLightness.bind(this);
        this.onEditText = this.onEditText.bind(this);

        this.onClickOK = this.onClickOK.bind(this);
        this.onClickCancel = this.onClickCancel.bind(this);
    }

    preEdit(text, color)
    {
        this.setState({
            text: text,
            color: tinycolor(color).toHsl(),
            haveLabel: true
        });
        setTimeout(() => {
                this.textInput.focus();
            }, 16
        );
    }




    render() {
        if (this.state.haveLabel === false)
            return <View
                style={styles.main}
            ><Text>Hello World!</Text></View>;

        return <View
                style={styles.main}
        >
            <TextInput

                ref={(textInput) => {
                    this.textInput = textInput;
                }}

                style={[styles.backgroundText, {
                    backgroundColor: tinycolor(this.state.color).toHexString()
                }]}
                placeholder="Label name..."
                placeholderTextColor="#aaa"

                multiline={false}

                onChangeText={this.onEditText}
                defaultValue={this.state.text}
            />

            <HueSlider
                style={styles.sliderRow}
                gradientSteps={40}
                value={this.state.color.h}
                onValueChange={this.updateHue}
            />
            <SaturationSlider
                style={styles.sliderRow}
                gradientSteps={20}
                value={this.state.color.s}
                color={this.state.color}
                onValueChange={this.updateSaturation}
            />
            <LightnessSlider
                style={styles.sliderRow}
                gradientSteps={20}
                value={this.state.color.l}
                color={this.state.color}
                onValueChange={this.updateLightness}
            />

            <View
                style={styles.rowButton}
            >
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.onClickCancel}
                >
                    <Text style={styles.buttonText}>
                        Cancel
                    </Text>
                </TouchableOpacity>
                <View style={styles.span}/>
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.onClickOK}
                >
                    <Text style={styles.buttonText}>
                        OK
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    }

    updateHue(h)
    {
        this.setState({ color: { ...this.state.color, h } });
    }
    updateSaturation(s)
    {
        this.setState({ color: { ...this.state.color, s } });
    }
    updateLightness(l)
    {
        this.setState({ color: { ...this.state.color, l } });
    }

    onEditText(text)
    {
        this.setState({text: text});
    }

    onClickOK()
    {
        this.props.editComplete(this.state.text, tinycolor(this.state.color).toHexString());
        Keyboard.dismiss();
    }

    onClickCancel()
    {
        this.props.editComplete();
        Keyboard.dismiss();
    }

}

const styles = StyleSheet.create({
    main: {
        width: '100%',
        paddingLeft: 20,
        paddingRight: 20
    },
    backgroundText: {
        textAlign: 'center',
        textAlignVertical: 'center',
        borderRadius: 5,
        padding: 5,
        marginBottom: 14,
    },
    sliderRow: {
        alignSelf: 'stretch',
        marginTop: 10
    },
    rowButton: {
        flexDirection: 'row',
        marginTop: 14
    },
    button: {
        width: '45%',
        borderRadius: 5,
        borderColor: '#f00',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    span: {
        width: '10%'
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        padding: 5
    }
});