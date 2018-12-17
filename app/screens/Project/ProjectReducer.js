import uuid from 'react-native-uuid';
import realm from '../../Realm/Realm';

const SHOW_DIALOG = 'PROJECT_SHOW_DIALOG';
const UPDATE_BOARDS = 'PROJECT_UPDATE_BOARDS';

const initializedState = {
  title: 'Boards',
  dialogVisible: false,
  boards: [],
}

export default function(state = initializedState, action: any) {
  switch (action.type) {
    case SHOW_DIALOG: 
    return {
      ...state,
      dialogVisible: action.dialogVisible,
    };
    case UPDATE_BOARDS:
    return {
      ...state,
      boards: action.boards,
    }
    default:
    return state;
  }
}

export function showDialog(visible = true) {
  return{
    type: SHOW_DIALOG,
    dialogVisible: visible,
  };
}

export function updateBoards() {
  return {
    type: UPDATE_BOARDS,
    boards: realm.objects('Board')
  }
}

export function addBoard(title = 'New board') {
  title = title ? title : 'New board';
  realm.write(() => {
    let board = realm.create('Board', { id: uuid.v4(), title: title });
  });

  return {
    type: UPDATE_BOARDS,
    boards: realm.objects('Board')
  }
}

export function deleteBoard(id = null) {
  realm.write(() => {
    let deleteObject = realm.objectForPrimaryKey('Board', id);
    deleteObject.cascadeDelete();
  });

  return {
    type: UPDATE_BOARDS,
    boards: realm.objects('Board')
  }
} 

