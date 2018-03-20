import { ApplicationState } from "../../store/application-state";

export function userNameSelector(state: ApplicationState):string{
  const userId = state.uiState.userId,
    currentParticipant = state.storeData.participants[userId];

  if(!currentParticipant){
    return "";
  }

  return currentParticipant.name;
}