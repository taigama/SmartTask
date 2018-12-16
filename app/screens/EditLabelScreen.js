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

    Icon
} from 'react-native-elements';


import LabelEditable from "../components/details/LabelEditable";


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
                <TouchableOpacity onPress={() => navigation.goBack()} style={{marginLeft: 20}}>
                    <Icon
                        name='arrow-back'
                        color='white'
                        size={30}
                    />
                </TouchableOpacity>
            ),
            headerRight: (
                <TouchableOpacity
                    onPress={() => alert('This will be a menu')}
                    style={{marginRight: 20}}>
                    <Icon
                        name='check'
                        color='white'
                        size={30}
                    />
                </TouchableOpacity>
            ),
        };
    };


    constructor(props) {
        super(props);


        this.state = {
            idGroupLabel: this.props.navigation.state.params.idGroupLabel,
            group: {
                links: []
            },
            labels: null
        };

        // this.renderChildren = this.renderChildren.bind(this);
        // this.renderChild = this.renderChild.bind(this);

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
        this.state.group = group;
        this.state.labels= labels;


        if (callback != null)
            callback();
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
                            />
                        )
                    }
                </ScrollView>
            </View>

        );
    }


}

const styles = StyleSheet.create({

});