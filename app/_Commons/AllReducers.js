import { combineReducers } from 'redux';
import ProjectReducer from '../Screens/Project/ProjectReducer';
import WorkspaceReducer from "../Screens/Workspace/WorkspaceReducer";

const allReducers = combineReducers({
  project: ProjectReducer,
  workspace: WorkspaceReducer,
});

export default allReducers;