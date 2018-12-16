import realm, { Board } from '../realm/Realm';
import uuid from 'react-native-uuid';

const UPDATE_BOARD = 'WORKSPACE_UPDATE_BOARD';
const SHOW_ADD_GROUP = 'WORKSPACE_SHOW_ADD_GROUP';
const SHOW_ADD_CARD = 'WORKSPACE_SHOW_ADD_CARD';
const ADD_GROUP = 'WORKSPACE_ADD_GROUP';
const ADD_CARD = 'WORKSPACE_ADD_CARD';

const initializedState = {
  board: Board.properties,
  addCardVisible: false,
  addGroupVisible: false,
}

export default function(state = initializedState, action: any) {
  switch (action.type) {
    case UPDATE_BOARD: 
    return {
      ...state,
      board: action.board,
    };
    case SHOW_ADD_CARD:
    return {
      ...state,
      addCardVisible: action.addCardVisible,
    }
    case SHOW_ADD_GROUP:
    return {
      ...state,
      addGroupVisible: action.addGroupVisible,
    }
    default:
    return state;
  }
}

export function updateBoard(board) {
  return {
    type: UPDATE_BOARD,
    board: { ...board },
  }
}

export function addGroup(board, title = 'Default group') {
  realm.write(() => {
    let group = realm.create('CardGroup', { id: uuid.v4(), title: title, cards: [] });
    board.cardGroups.push(group);
  });

  return {
    type: UPDATE_BOARD,
    board: { ...board },
  }
}

export function showAddCardDialog(visible = true) {
  return {
    type: SHOW_ADD_CARD,
    addCardVisible: visible,
  };
}

export function showAddGroupDialog() {
  return {
    type: SHOW_ADD_GROUP,
    addGroupVisible: visible,
  }
}
