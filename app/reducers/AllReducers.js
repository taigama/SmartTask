import { combineReducers } from 'redux';
import ProjectReducer from "./ProjectReducer";
import WorkspaceReducer from "./WorkspaceReducer";

const allReducers = combineReducers({
  project: ProjectReducer,
  workspace: WorkspaceReducer,
});

export default allReducers;