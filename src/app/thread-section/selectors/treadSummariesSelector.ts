import { ThreadSummaryVM } from "../thread-summary.vm";
import { Thread } from "../../../../shared/model/thread";
import { values, keys, join, last} from 'lodash';

export function treadSummariesSelector(state: any): ThreadSummaryVM[] {
    const threads = values<Thread>(state.app.threads);

    return threads.map(thread => {
      const names = keys(thread.participants).map(participantId => state.app.participants[participantId].name);
      const lastMessageId = last(thread.messageIds),
            lastMessage = state.app.messages[lastMessageId];
  
      return {
        id: thread.id,
        participantNames: join(names, ","),
        lastMessageText: lastMessage.text,
        timestamp: lastMessage.timestamp
      }
    });
  }
