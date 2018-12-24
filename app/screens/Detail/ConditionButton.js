import PropTypes from "prop-types";
import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";


export default class ConditionButton extends Component {

	static propTypes = {
		size: PropTypes.number,
		iconName: PropTypes.string,
		isShow: PropTypes.bool,
		color: PropTypes.string,
		callback: PropTypes.func,
	};

	constructor(props) {
		super(props);
		const { size, iconName, isShow, color, callback } = this.props;


		this.state = {
			size: size || 24,
			icon: iconName || 'launch',
			color: color || '#555',
			isShow: isShow || true,
		};

		this.onClicked = this.onClicked.bind(this);
	}

	setShow(isShow) {
		this.setState({
			isShow: isShow
		});
	}

	render() {
		return (
			<TouchableOpacity
				onPress={this.onClicked}
			>
				<Icon
					style={{ opacity: this.state.isShow ? 1 : 0 }}
					name={this.state.icon}
					color={this.state.color}
					size={this.state.size}
				/>
			</TouchableOpacity>
		)
	}

	onClicked() {
		if (this.state.isShow && this.props.callback)
			this.props.callback();
	}
}