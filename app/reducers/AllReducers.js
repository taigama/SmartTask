import ProjectReducer from "./ProjectReducer";
import { combineReducers } from 'redux';

const allReducers = combineReducers({
  project: ProjectReducer,
});

export default allReducers;