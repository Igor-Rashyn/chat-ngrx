import { ThreadSummaryVM } from "../thread-summary.vm";
import { Thread } from "../../../../shared/model/thread";
import { values, keys, join, last} from 'lodash';
import { ApplicationState } from "../../store/application-state";

export function treadSummariesSelector(state: ApplicationState): ThreadSummaryVM[] {
    const threads = values<Thread>(state.storeData.threads);

    return threads.map(thread => {
      const names = keys(thread.participants).map(participantId => state.storeData.participants[participantId].name);
      const lastMessageId = last(thread.messageIds),
            lastMessage = state.storeData.messages[lastMessageId];
  
      return {
        id: thread.id,
        participantNames: join(names, ","),
        lastMessageText: lastMessage.text,
        timestamp: lastMessage.timestamp
      }
    });
  }
