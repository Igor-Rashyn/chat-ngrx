import { ThreadSummaryVM } from "../thread-summary.vm";
import { Thread } from "../../../../shared/model/thread";
import { values, keys, join, last} from 'lodash';
import { ApplicationState } from "../../store/application-state";
import { buildThreadParticipantsList } from "../../utils/buildThreadParticipantsList";

export function treadSummariesSelector(state: ApplicationState): ThreadSummaryVM[] {
    const threads = values<Thread>(state.storeData.threads);

    return threads.map(thread => {
      const lastMessageId = last(thread.messageIds),
            lastMessage = state.storeData.messages[lastMessageId];
  
      return {
        id: thread.id,
        participantNames: buildThreadParticipantsList(state, thread),
        lastMessageText: lastMessage.text,
        timestamp: lastMessage.timestamp
      }
    });
  }
