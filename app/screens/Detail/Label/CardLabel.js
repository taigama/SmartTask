import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

import CardWrapper from '../CardWrapper';
import Label from './Label';
import realm from '../../../Realm/Realm';


export default class CardLabel extends Component {

	static propTypes = {
    groupLabel: PropTypes.object.isRequired,
    clickLabelCallback: PropTypes.func,
	};

	constructor(props) {
		super(props);
		const { groupLabel, clickLabelCallback } = this.props;

		this.state = {
			groupLabel: groupLabel,
			id: groupLabel.id
		};
		this.onClickLabel = clickLabelCallback;

		this.firstRun();
	}

	firstRun() {
		let groupLabel = this.state.groupLabel;
    let labels = [];


    if (groupLabel.links && groupLabel.links.length !== 0) {

      var links = groupLabel.links,
        length = groupLabel.links.length,
        link;
      for (let i = 0; i < length; ++i) {
        if ((link = links[i]).isCheck) {
          labels.push(realm.objectForPrimaryKey('Label', link.labelId));
        }
      }
    }

    this.state.labels = labels;
	}

	refresh() {
		let groupLabel = realm.objectForPrimaryKey('LabelGroup', this.state.id);
		let labels = [];


		if (groupLabel.links && groupLabel.links.length !== 0) {

			var links = groupLabel.links,
				length = groupLabel.links.length,
				link;
			for (let i = 0; i < length; ++i) {
				if ((link = links[i]).isCheck) {
					labels.push(realm.objectForPrimaryKey('Label', link.labelId));
				}
			}
		}

		this.setState({
			groupLabel: groupLabel,
			labels: []
		});


		setTimeout(() => {
			this.setState({
				labels: labels
			});
		}, 16);
	}

	renderChild() {
		if (this.state.labels && this.state.labels.length !== 0) {
			return this.state.labels.map((label) => <Label key={label.id} clickCallback={this.onClickLabel} data={label} />);
		}
		else {
			return <TouchableOpacity
				onPress={this.onClickLabel}
				style={styles.backgroundText}
			>
				<Text style={styles.emptyText}>
					Labels...
                </Text>
			</TouchableOpacity>;
		}
	}

	render() {
		return (
			<CardWrapper
				iconName='dns'
				iconColor='#555'
				iconSize={30}
				minHeight={0}
			>
				{this.renderChild()}
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