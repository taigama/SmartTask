import PropTypes from "prop-types";

import React, {Component} from "react";
import {
    View,
    StyleSheet,
    Text,
    ScrollView
} from "react-native";

import {
    DialogComponent,
    SlideAnimation,
    DialogTitle,
    DialogContent
} from 'react-native-dialog-component';

import CardEditLabel from "./CardEditLabel";
import realm from '../../realm/Realm';
import LabelEditable from "./LabelEditable";

export default class DialogEditLabel extends React.Component {

    static propTypes = {
        idGroupLabel: PropTypes.number
    };

    constructor(props) {
        super(props);
        const {idGroupLabel} = this.props;

        this.state = {
            idGroupLabel: idGroupLabel,
            group: {
                links: []
            },
            labels: null
        };

        this.renderChildren = this.renderChildren.bind(this);
        this.renderChild = this.renderChild.bind(this);
    }

    renderChildren()
    {
        this.state.group.links.map(this.renderChild);
    }

    renderChild(link)
    {
        return <LabelEditable
            key={link.idLabel}
            data={this.state.labels[link.idLabel]}
            isChecked={link.isCheck}
        />;
    }


    /**
     *
     * @param {function}callback
     */
    queryData(callback) {
        // Query
        let group = realm.objectForPrimaryKey('LabelGroup', this.state.idGroupLabel);
        if (group == null) {
            realm.write(() => {

                // added preset labels
                let labels = {};

                labels[1] = realm.create('Label', {
                    idLabel: 1,
                    color: 'red',
                    content: ''
                }, true);
                labels[2] = realm.create('Label', {
                    idLabel: 2,
                    color: 'green',
                    content: ''
                }, true);
                labels[3] = realm.create('Label', {
                    idLabel: 3,
                    color: 'cyan',
                    content: ''
                }, true);
                labels[4] = realm.create('Label', {
                    idLabel: 4,
                    color: 'gray',
                    content: ''
                }, true);
                labels[5] = realm.create('Label', {
                    idLabel: 5,
                    color: 'blue',
                    content: ''
                }, true);

                // create group
                group = realm.create('LabelGroup', {
                    idGroup: this.state.idGroupLabel,
                    links: [],
                }, true);

                // added preset
                group.links.push({
                    idLabel: 1,
                    isCheck: false,
                    labelGroup: group
                });
                group.links.push({
                    idLabel: 2,
                    isCheck: false,
                    labelGroup: group
                });
                group.links.push({
                    idLabel: 3,
                    isCheck: false,
                    labelGroup: group
                });
                group.links.push({
                    idLabel: 4,
                    isCheck: false,
                    labelGroup: group
                });
                group.links.push({
                    idLabel: 5,
                    isCheck: false,
                    labelGroup: group
                });

                // callback
                this.onQueryCompleted(group, labels, callback);
            });
        }
        else {
            let labels = realm.objects('Label');
            this.onQueryCompleted(group, labels, callback);
        }
    }

    /**
     *
     * @param group: this group
     * @param labels: the label in database
     * @param {function}callback
     */
    onQueryCompleted(group, labels, callback) {
        this.setState({
            group: group,
            labels: labels
        });

        if (callback != null)
            callback();
    }

    onShow() {
        this.dialog.show();
    }

    render() {

        console.log(this.state.group.links);

        return (
            <DialogComponent
                title={<DialogTitle title="Edit labels"/>}
                ref={(dialog) => {
                    this.dialog = dialog;
                }}
                dialogAnimation={new SlideAnimation({slideFrom: 'bottom'})}

                height={1}
                haveOverlay={false}

            >

                <DialogContent>
                    <ScrollView
                        contentContainerStyle={styles.contentContainer}
                    >
                        {this.renderChildren()}
                    </ScrollView>
                </DialogContent>

            </DialogComponent>
        )
    }


}

const styles = StyleSheet.create({
    contentContainer: {}
});