import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";


const MARGIN = 10;

export default class CardWrapper extends React.Component {

	static propTypes = {

		iconName: PropTypes.string.isRequired,
		iconSize: PropTypes.number,
		iconColor: PropTypes.string,
		flexStyle: PropTypes.object,
		minHeight: PropTypes.number.isRequired,
	};

	constructor(props) {
		super(props);


		const { iconName, iconSize, iconColor, flexStyle, minHeight } = this.props;

		var sizeIcon = iconSize ? iconSize : 24;

		this.state = {
			iconName: iconName,
			iconSize: sizeIcon,
			iconColor: iconColor ? iconColor : 'black',
			margin: (30 - sizeIcon) / 2.0,
			flexStyle: flexStyle ? flexStyle : { flexDirection: 'row', flexWrap: 'wrap' },
			minHeight: minHeight
		};
	}

	updateIconColor(color) {
		this.setState({ iconColor: color });
	}


	render() {

		return (
			<View style={[styles.wrapCard, { minHeight: this.state.minHeight }]}>
				<View style={{
					width: this.state.iconSize,
					margin: MARGIN + this.state.margin,
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
		marginTop: MARGIN,
		marginRight: MARGIN,
		marginBottom: MARGIN,
	}
});