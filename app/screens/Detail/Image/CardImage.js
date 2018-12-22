import React, {Component} from "react";
import {
    View,
    StyleSheet,
    Image
} from "react-native";

import PropTypes from "prop-types";

import CardWrapper from '../CardWrapper';


export default class CardImage extends Component {

    static propTypes = {
        listImage: PropTypes.array
    };

    constructor(props) {
        super(props);
        const {listImage} = this.props;

        this.state = {
            listImage: listImage || []
        };
    }

    renderChildren() {
        return this.state.listImage.map((image) => (
            <Image
                style={styles.image}
                resizeMode='contain'
                source={{uri: image.uri}}
            />
        ));
    }


    render() {
        return (
            <CardWrapper
                iconName='image'
                iconColor='#333'
                iconSize={24}
                minHeight={0}
                flexStyle={{flexDirection: 'column'}}
            >
                {this.renderChildren()}
            </CardWrapper>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 100,
        padding: 2,
        marginBottom: 5,
        borderColor: '#333',
        borderWidth: 1,
    },
});