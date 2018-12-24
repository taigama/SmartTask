import uuid from 'react-native-uuid';
import realm from '../../Realm/Realm';

const SHOW_DIALOG = 'PROJECT_SHOW_DIALOG';
const UPDATE_BOARDS = 'PROJECT_UPDATE_BOARDS';
const REFRESH = 'PROJECT_REFRESH';

const initializedState = {
  title: 'Boards',
  boards: [],
  dialogVisible: false,
  refresh: false,
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
    case REFRESH:
    return { 
      ...state, 
      refresh: !state.refresh,
    };

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

export function removeBoard(board?: any) {
  realm.write(() => {
    board.cascadeDelete();
  });

  return {
    type: UPDATE_BOARDS,
    boards: realm.objects('Board').filtered('archived = false'),
  }
} 

export function archiveBoard(board?: any) {
  realm.write(() => {
    board.archived = true;
  });

  return {
    type: UPDATE_BOARDS,
    boards: realm.objects('Board').filtered('archived = false'),
  }
}

export function bookmarkBoard(board?: any) {
  realm.write(() => {
    board.bookmarked = !board.bookmarked;
  });

  return {
    type: REFRESH
  }
}

export function renameBoard(board?: any, newTitle?: string) {
  realm.write(() => {
    board.title = newTitle;
  });

  return {
    type: REFRESH
  }
}
