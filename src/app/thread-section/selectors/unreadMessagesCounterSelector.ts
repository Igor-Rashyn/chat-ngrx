import { Thread } from "../../../../shared/model/thread";
import { values } from 'lodash';
import { ApplicationState } from "../../store/application-state";

export function unreadMessagesCounterSelector(state: ApplicationState):number{
  const currentUserId = state.uiState.userId;

  return values<Thread>(state.storeData.threads)
  .reduce(
    (acc, thread) =>  acc + (thread.participants[currentUserId] || 0)
     ,0)
}