import { ApplicationState } from "../../store/application-state";

export function currentThreadIdSelector(state: ApplicationState):number{
  return state.uiState.currentThreadId;
}