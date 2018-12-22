import React, {Component} from "react";
import {
    View,
    StyleSheet,
    Text, TouchableOpacity
} from "react-native";

import PropTypes from "prop-types";

import CardWrapper from '../CardWrapper';
import Label from './Label';


import realm from '../../../realm/Realm';


export default class CardLabel extends Component {

    static propTypes = {
        groupLabel: PropTypes.object.isRequired,
        clickLabelCallback: PropTypes.func,
    };

    constructor(props) {
        super(props);
        const {groupLabel, clickLabelCallback} = this.props;

        this.state = {
            groupLabel: groupLabel,
            id: groupLabel.id
        };

        if (groupLabel.links == null || groupLabel.links.length === 0) {
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
        else {
            this.state.labels = [];
            var links = groupLabel.links,
                length = groupLabel.links.length,
                link;
            for(let i = 0; i < length; ++i)
            {
                if((link = links[i]).isCheck)
                {
                    this.state.labels.push(realm.objectForPrimaryKey('Label', link.idLabel));
                }
            }
            this.viewSub = () => (
                this.state.labels.map((label) => <Label clickCallback={this.onClickLabel} data={label}/>)
            );
        }
        this.onClickLabel = clickLabelCallback;
    }

    refresh()
    {
        let groupLabel = realm.objectForPrimaryKey('LabelGroup', this.state.id);
        let labels = [];


        if (groupLabel.links && groupLabel.links.length !== 0) {

            var links = groupLabel.links,
                length = groupLabel.links.length,
                link;
            for(let i = 0; i < length; ++i)
            {
                if((link = links[i]).isCheck)
                {
                    labels.push(realm.objectForPrimaryKey('Label', link.idLabel));
                }
            }

            // this.state.groupLabel = groupLabel;
            // this.state.labels = labels;

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
        if(this.state.labels && this.state.labels.length !== 0)
        {
            return this.state.labels.map((label) => <Label key={label.id} clickCallback={this.onClickLabel} data={label}/>);
        }
        else
        {
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
                iconSize={24}
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
    },
    dialogContent: {
        flex: 1,
        backgroundColor: '#0ff',
    }
});