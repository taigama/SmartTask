import React, { Component } from 'react';
import { TextInput, Animated, ImageBackground, Image, TouchableOpacity, Platform, StyleSheet, Text, View, StatusBar, FlatList, Button, ScrollView, Dimensions, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { Header } from 'native-base';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import ImagePicker from 'react-native-image-picker';
import ActionButton from "react-native-action-button";

import CardLabel from "./Label/CardLabel";
import CardDateTime from "./DateTime/CardDateTime";
import CardImage from "./Image/CardImage";
import Helper from '../../_Commons/Helper';
import realm from '../../Realm/Realm';
import CheckList from "./CheckList/CheckList";

const optionsImg = {
	title: 'Select a photo',
	storageOptions: {
		skipBackup: true,
		path: 'images',
	},
};

/** ------------------------------------------------------------------------------
 * ================================================================================
 * this.props.
 *
 * @param data : TaskChema
 * @param deleteCallback: function(task) (when this task be deleted)
 *
 * ------------------------------------------------------------------------------ */
export default class TaskDetailScreen extends Component {
	constructor(props) {
		super(props);
		var data = this.props.data; // Card

		this.state = {
			title: data.title,
			description: data.description,
			groupLabel: data.labelGroup,
			dueTime: data.dueTime,
			checkList: data.checkList,
			images: data.images || [],


			// TODO: ============= update project variable here (data.project)
			project: {
				name: 'Example project',
				workspace: {
					name: 'Sample workspace'
				}
			}
		};

		if (data.lastImageId) {
			var img = realm.objectForPrimaryKey('ImageObject', data.lastImageId);

			var width = Dimensions.get('window').width;
			var height = width / img.width;// this is scale
			height = img.height * height;

			this.state.cover = {
				width: width,
				height: height,
				uri: data.uri,
			}
		}
		else {
			this.state.cover = {
				width: Dimensions.get('window').width,
				height: 200,
				uri: ""
			}
		}

		this.initData();
	}

	initData() {

		this.renderStickyHeader = this.renderStickyHeader.bind(this);
		this.renderForeground = this.renderForeground.bind(this);


		this.onChangeTitle = this.onChangeTitle.bind(this);
		this.onChangeDescription = this.onChangeDescription.bind(this);

		this.onClickLabel = this.onClickLabel.bind(this);

		this.onClickAddImage = this.onClickAddImage.bind(this);
		this.onClickDeleteTask = this.onClickDeleteTask.bind(this);
		this.onTrulyDeleteTask = this.onTrulyDeleteTask.bind(this);
	}

	renderHeader() {
		return (
			<Header transparent>
				<Left>
					<TouchableOpacity onPress={() => { Actions.pop(); setTimeout(() => Actions.refresh(), 10) }} style={{ marginLeft: 10 }}>
						<Icon
							name='arrow-back'
							type="MaterialIcons"
							style={{ fontSize: 25, color: 'white' }}
						/>
					</TouchableOpacity>
				</Left>
				<Body>
					<Title>{this.props.data.titie}</Title>
				</Body>
				<Right>
					<TouchableOpacity onPress={() => this.drawer._root.open()} style={{ marginRight: 10 }}>
						<Icon
							name="dots-vertical"
							type="MaterialCommunityIcons"
							style={{ fontSize: 25, color: "black" }}
						/>
					</TouchableOpacity>
				</Right>
			</Header>
		);
	}

	renderStickyHeader() {
		return <View style={styles.stickyHeader}>
			<Text style={styles.title}>
				{Helper.ellipsis(this.state.title, 30)}
			</Text>
		</View>
	}

	renderForeground() {
		if (this.state.cover.uri)
			return (
				<Image
					defaultSource={require('../../_Resources/moon.jpg')}
					resizeMode='cover'
					style={{
						width: this.state.cover.width,
						height: this.state.cover.height,
					}}
					source={{ uri: this.state.cover.uri }}
				/>
			);
		else
			return (
				<Image
					resizeMode='cover'
					style={{
						width: this.state.cover.width,
						height: this.state.cover.height,
					}}
					source={require('../../_Resources/moon.jpg')}
				/>
			);
	}

	renderTitleSection() {
		return <View style={styles.titleView}>

			<TextInput
				style={styles.titleBellowImg}
				placeholder="Name of this task..."
				placeholderTextColor="#aaa"

				defaultValue={this.state.title}
				onChangeText={this.onChangeTitle}
			/>

			<View style={{ flexDirection: 'row' }}>
				<Text style={styles.subTitleBellowImg}>
					{this.state.project.name}
				</Text>

				<Text style={styles.subTitleSeparate}>
					in list
                </Text>

				<Text style={styles.subTitleBellowImg}>
					{this.state.project.workspace.name}
				</Text>
			</View>

		</View>
	}

	renderDescription() {
		return <View style={styles.container}>
			<TextInput
				placeholder="Edit card description..."
				placeholderTextColor="#aaa"

				defaultValue={this.state.description}
				onChangeText={this.onChangeDescription}
			/>
		</View>
	}

	renderLabel() {
		return <CardLabel
			ref={(cardLabel) => {
				this.cardLabel = cardLabel;
			}}
			clickLabelCallback={this.onClickLabel}
			groupLabel={this.state.groupLabel}
		/>
	}

	renderDateTime() {
		return <CardDateTime
			dateTimeModel={this.state.dueTime}
		/>
	}


	renderCheckList() {
		return <CheckList
			data={this.state.checkLists}

		/>
	}


	renderImages() {
		return <CardImage
			listImage={this.state.listImage}
		/>
	}

	renderActionButton() {
		return <ActionButton buttonColor="rgba(231,76,60,1)">
			<ActionButton.Item buttonColor='#9b59b6' title="Add image" onPress={this.onClickAddImage}>
				<Icon name='add' color='white' />
			</ActionButton.Item>
			<ActionButton.Item buttonColor='#3498db' title="Delete task" onPress={this.onClickDeleteTask}>
				<Icon name='remove' color='white' />
			</ActionButton.Item>
		</ActionButton>
	}


	render() {
		return (

			<View style={{ flex: 1 }}>

				<ParallaxScrollView
					renderStickyHeader={this.renderStickyHeader}
					stickyHeaderHeight={56}
					fadeOutForeground={false}

					backgroundColor="#026AA7"
					contentBackgroundColor="#fff"

					parallaxHeaderHeight={this.state.cover.height}
					fadeOutForeground={true}

					renderForeground={this.renderForeground}
				>

					{this.renderTitleSection()}

					{this.renderDescription()}
					{this.renderLabel()}
					{this.renderDateTime()}
					{this.renderCheckList()}
					{this.renderImages()}

				</ParallaxScrollView>
				{this.renderActionButton()}
			</View>

		);
	}

	onClickAddImage() {
		/**
		 * The first arg is the options object for customization (it can also be null or omitted for default options),
		 * The second arg is the callback which sends object: response (more info in the API Reference)
		 */
		ImagePicker.showImagePicker(optionsImg, (response) => {
			console.log('Response = ', response);

			if (response.didCancel) {
				console.log('User cancelled image picker');
			} else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
			} else if (response.customButton) {
				console.log('User tapped custom button: ', response.customButton);
			} else {

				// You can also display the image using data:
				// const source = { uri: 'data:image/jpeg;base64,' + response.data };


				var width = Dimensions.get('window').width;
				var height = width / response.width;
				height = response.height * height;

				this.setState({
					cover: {
						width: width,
						height: height,
						uri: response.uri,
					},
				});
			}
		});


	};

	onChangeTitle(txt) {
		var data = this.props.data;// TaskSchema
		realm.write(() => {
			data.title = txt;
		});

		this.setState({ title: txt });
	}

	onChangeDescription(txt) {
		var data = this.props.data;// TaskSchema
		realm.write(() => {
			data.description = txt;
		});
	}

	onClickLabel() {
		this.props.navigation.navigate('EditLabel',
			{
				groupLabel: this.state.groupLabel,
				onBack: () => {
					this.cardLabel.refresh();
					this.forceUpdate();
				}
			});
	}


	onClickDeleteTask() {
		Alert.alert(
			'Deleting task',
			'Do you really want to delete this task?',
			[
				{ text: 'Cancel' },
				{ text: 'OK', onPress: this.onTrulyDeleteTask },
			]
		);
	}

	onTrulyDeleteTask() {
		this.props.deleteCallback(
			this.props.data
		);
		this.props.navigation.goBack();
	}
}

const styles = StyleSheet.create({
	title: {
		fontSize: 20,
		color: '#fff',
	},
	stickyHeader: {
		height: 56,
		backgroundColor: '#026AA7',
		alignItems: 'flex-start',
		justifyContent: 'center',
		paddingLeft: 70
	},
	titleView: {
		backgroundColor: '#026AA7',
		alignItems: 'flex-start',
		justifyContent: 'center',
		padding: 20,
	},
	titleBellowImg: {
		width: '100%',
		textAlign: 'left',
		fontSize: 20,
		color: '#fff',
		fontWeight: 'bold',
		marginLeft: -4,
		marginRight: -4,
	},
	subTitleBellowImg: {
		color: '#ddd',
		fontStyle: 'italic'
	},
	subTitleSeparate: {
		color: '#aaa',
		marginLeft: 5,
		marginRight: 5
	},
	container: {
		flex: 1
	},
	item: {
		marginTop: -2,
		padding: 10,
		fontSize: 18,
		height: 200,
		borderRadius: 10,
		borderColor: '#f00',
		borderWidth: 2,
	},
});