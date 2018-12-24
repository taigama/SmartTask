import { StyleSheet } from 'react-native';
import { Window } from '../../_Commons/Utils';

export const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    // justifyContent:"center",
  },
  group: {
    backgroundColor: '#DFE3E6',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000000',
    paddingLeft: '8.5%',
    paddingRight: '8.5%',
  },
  groupHeader: {
    height: 60,
    fontWeight: 'bold',
    justifyContent: "center",
  },
  groupContainer: {
    maxHeight: Window.height - 240,
    width: '100%',
    justifyContent: "center"
  },
  modal: {
    backgroundColor: '#DFE3E6',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000000',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  modalHeader: {
    height: 60,
    fontWeight: 'bold',
    justifyContent: "center",
    // backgroundColor: 'steelblue',
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
  },
  modalHeadline: {
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 0,
  },
  modalContainer: {
    width: '100%',
    justifyContent: "center"
  },
  modalButtonGroup: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  modalTextInput: {
    textAlignVertical: 'top',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: 150,
    backgroundColor: 'white',
    padding: 10,
    fontSize: 18
  },
  modalButton: {
    backgroundColor: 'green',
    width: '50%',
    height: 40
  }
});