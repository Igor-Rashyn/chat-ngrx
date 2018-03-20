import { ApplicationState } from "../store/application-state";
import { Thread } from "../../../shared/model/thread";
import { keys, join } from 'lodash';

export function buildThreadParticipantsList(state:ApplicationState, thread:Thread):string {

  const names = keys(thread.participants).map(
      participantId => state.storeData.participants[participantId].name);

  return join(names, ",");
}