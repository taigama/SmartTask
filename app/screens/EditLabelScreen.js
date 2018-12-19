import Helper from '../components/Helper.js';


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
    DialogComponent,
    SlideAnimation,
    DialogTitle,
    DialogContent
} from 'react-native-dialog-component';

import {
    SlidersColorPicker,
    HueGradient,
    SaturationGradient,
    LightnessGradient,
    HueSlider,
    SaturationSlider,
    LightnessSlider
} from 'react-native-color';

import tinycolor from 'tinycolor2';

import {

    Icon
} from 'react-native-elements';


import LabelEditable from "../components/details/LabelEditable";
import realm, {getNewId} from '../realm/Realm';
import CardEditLabel from "../components/details/CardEditLabel";


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

        this.onEditCallback = this.onEditCallback.bind(this);
        this.onEndEditLabel = this.onEndEditLabel.bind(this);
        this.onDismissDialog = this.onDismissDialog.bind(this);

        this.queryData();

    }


    // renderChildren()
    // {
    //     this.state.group.links.map(this.renderChild);
    // }
    //
    // renderChild(link)
    // {
    //     return <LabelEditable
    //         data={this.state.labels[link.idLabel]}
    //         isChecked={link.isCheck}
    //     />;
    // }

    /**
     *
     * @param {function}callback
     */
    queryData(callback) {
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
                                data={link}
                                editCallback={this.onEditCallback}
                            />
                        )
                    }
                </ScrollView>

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

    onEditCallback(labelComponent, labelData) {

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

    onDismissDialog() {
        this.currentLabel = null;
    }

    /**
     *
     * @param color
     * @param text
     */
    onEndEditLabel(text, color) {
        this.dialog.dismiss();

        if (color === undefined)
            return;

        realm.write(() => {
            this.currentLabel.data.content = (text || "");
            this.currentLabel.data.color = color;
        });

        this.currentLabel.component.setState({
            label: this.currentLabel.data
        });
    }

}

const styles = StyleSheet.create({
    contentContainer: {
        margin: 20
    },
    editLabelContent: {
        width: '100%'
    },
    sliderRow: {
        alignSelf: 'stretch',
        marginLeft: 12,
        marginTop: 12
    }
});