import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import realm from '../../../Realm/Realm';


export default class SubCardLabel extends Component {

	static propTypes = {
    groupLabel: PropTypes.object.isRequired
	};

	constructor(props) {
		super(props);
		const { groupLabel } = this.props;

		this.state = {
			groupLabel: groupLabel,
			id: groupLabel.id
		};

		this.firstRun(groupLabel);
	}

  componentWillReceiveProps({groupLabel}) {
    this.firstRun(groupLabel);
    this.setState({
      groupLabel: groupLabel,
      id: groupLabel.id
    });
  }

	firstRun(groupLabel) {
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
    this.forceUpdate();
  }

	render() {
		return this.state.labels.map((label) => <View style={[styles.item, {backgroundColor: label.color}]} key={label.id}/>)
	}
}

const styles = StyleSheet.create({
	item: {
		width: 20,
		height: 6,
		marginRight: 4,
		marginBottom: 3
	},
});