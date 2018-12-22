import React, {Component} from 'react';
import {
    TextInput,
    Animated,
    ImageBackground,
    Image,
    TouchableOpacity,
    Platform,
    StyleSheet,
    Text,
    View,
    StatusBar,
    FlatList,
    ScrollView
} from 'react-native';
import {
    Icon
} from 'react-native-elements';


import {
    DialogComponent,
    SlideAnimation,
    DialogTitle,
    DialogContent
} from 'react-native-dialog-component';
import ActionButton from "react-native-action-button";


import LabelEditable from "./Detail/Label/LabelEditable";
import CardEditLabel from "./Detail/Label/CardEditLabel";


import realm, {getNewId} from '../realm/Realm';


export default class EditLabelScreen extends Component {
    static navigationOptions = ({navigation}) => {
        const {navigate} = navigation;
        return {


            //navigation.getParam('detail_id',"default param")
            headerTitle: "Edit labels",


            headerStyle: {
                backgroundColor: '#026AA7',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerLeft: (
                <TouchableOpacity onPress={() => {
                    navigation.getParam('onBack')();
                    navigation.goBack();
                }} style={{marginLeft: 20}}>
                    <Icon
                        name='arrow-back'
                        color='white'
                        size={30}
                    />
                </TouchableOpacity>
            )
        };
    };


    constructor(props) {
        super(props);


        this.state = {
            group: this.props.navigation.state.params.groupLabel,
            labels: realm.objects('Label'),
        };

        this.onClickEditLabel = this.onClickEditLabel.bind(this);
        this.onClickAddLabel = this.onClickAddLabel.bind(this);
        this.onEndEditLabel = this.onEndEditLabel.bind(this);

        this.presetData();
        this.isEdit = false;
    }


    /**
     *
     */
    presetData() {
        // Query
        let group = this.state.group;

        if (this.state.labels == null || this.state.labels.length == 0) {
            realm.write(() => {

                // added preset labels
                let labels = [
                    realm.create('Label', {
                        key: 1,
                        color: 'red',
                        content: ''
                    }, true),
                    realm.create('Label', {
                        key: 2,
                        color: 'green',
                        content: ''
                    }, true),
                    realm.create('Label', {
                        key: 3,
                        color: 'cyan',
                        content: ''
                    }, true),
                    realm.create('Label', {
                        key: 4,
                        color: 'gray',
                        content: ''
                    }, true),
                    realm.create('Label', {
                        key: 5,
                        color: 'blue',
                        content: ''
                    }, true)
                ];


                // added preset
                group.links.push({
                    key: 1,
                    idLabel: 1,
                    isCheck: false,
                    labelGroup: group
                });
                group.links.push({
                    key: 2,
                    idLabel: 2,
                    isCheck: false,
                    labelGroup: group
                });
                group.links.push({
                    key: 3,
                    idLabel: 3,
                    isCheck: false,
                    labelGroup: group
                });
                group.links.push({
                    key: 4,
                    idLabel: 4,
                    isCheck: false,
                    labelGroup: group
                });
                group.links.push({
                    key: 5,
                    idLabel: 5,
                    isCheck: false,
                    labelGroup: group
                });

                this.state.labels = labels;
            });
        }
    }


    componentDidMount() {
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }


    componentWillUnmount() {

    }

    componentDidCatch(error, info) {
        logComponentStackToMyService(info.componentStack);
    }

    render() {


        return (

            <View style={{flex: 1}}>

                <ScrollView
                    contentContainerStyle={styles.contentContainer}
                >
                    {
                        this.state.group.links.map((link) =>
                            <LabelEditable
                                key={link.idLabel}
                                data={link}
                                editCallback={this.onClickEditLabel}
                            />
                        )
                    }
                </ScrollView>



                <ActionButton
                    renderIcon={() => <Icon size={54} name='add-circle' color='#d0d'/>}
                    buttonColor='#fff' onPress={this.onClickAddLabel}
                >
                </ActionButton>

                <DialogComponent
                    ref={(dialogComponent) => {
                        this.dialog = dialogComponent;
                    }}
                    dialogAnimation={new SlideAnimation({slideFrom: 'bottom'})}
                    width={1}
                    height={1}
                >
                    <DialogTitle
                        title="Edit label..."
                    />
                    <DialogContent>
                        <CardEditLabel
                            editComplete={this.onEndEditLabel}

                            ref={(cardEdit) => {
                                this.cardEdit = cardEdit;
                            }}
                        />
                    </DialogContent>
                </DialogComponent>
            </View>

        );
    }

    onClickEditLabel(labelComponent, labelData) {

        this.isEdit = true;

        this.currentLabel = {
            component: labelComponent,
            data: labelData
        };

        this.dialog.show();

        setTimeout(() => {
                this.cardEdit.preEdit(labelData.content, labelData.color);
            }, 16
        );
    }

    onClickAddLabel() {
        this.isEdit = false;
        this.currentLabel = null;

        this.dialog.show();

        setTimeout(() => {
                this.cardEdit.preEdit();
            }, 16
        );
    }

    /**
     *
     * @param {string|boolean}textOrDelete
     * @param {string}color
     */
    onEndEditLabel(textOrDelete, color) {
        this.dialog.dismiss();

        if (textOrDelete === undefined) {
            this.currentLabel = null;
            return;
        }

        if (typeof(textOrDelete) === "string") {

            if (this.isEdit) {
                this.editLabel(textOrDelete, color);
            }
            else {
                this.createLabel(textOrDelete, color);
            }
        }
        else//typeof(textOrDelete) === "boolean"
        {
            var isDelete = textOrDelete;
            if (isDelete === false)
                return;

            this.deleteLabel();
        }
        this.currentLabel = null;
    }

    editLabel(text, color) {
        realm.write(() => {
            this.currentLabel.data.content = (text || "");
            this.currentLabel.data.color = color;
        });

        this.currentLabel.component.setState({
            label: this.currentLabel.data
        });
    }

    createLabel(text, color) {
        var labels = realm.objects("Label");

        var newLabelId = 1;
        if(labels != null)
        {
            newLabelId = getNewId(labels, 'id');
        }


        let groups = realm.objects("LabelGroup");
        let links = realm.objects("LabelLink");

        realm.write(() => {

            // added preset labels
            let label = realm.create('Label', {
                key: newLabelId,
                color: color,
                content: text
            }, false);

            groups.forEach((group) => {
                var newLinkId = getNewId(links, 'id');
                group.links.push({
                    key: newLinkId,
                    idLabel: newLabelId,
                    isCheck: false,
                    labelGroup: group
                });
            });
        });
        this.setState({
            labels: realm.objects("Label")
        });
    }

    deleteLabel() {
        var id = this.currentLabel.data.id;

        realm.write(() => {
            var links = realm.objects("LabelLink").filtered("idLabel == " + id.toString());
            realm.delete(this.currentLabel.data);
            realm.delete(links);
        });

        this.setState({
            labels: realm.objects("Label")
        });
    }


}

const styles = StyleSheet.create({
    contentContainer: {
        padding: 20,
        paddingBottom: 100,
    },
    editLabelContent: {
        width: '100%'
    },
    sliderRow: {
        alignSelf: 'stretch',
        marginLeft: 12,
        marginTop: 12
    },
    floatingView: {
        position: 'absolute',
        bottom: 20,
        right: 20
    }
});