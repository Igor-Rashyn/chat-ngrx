import { Thread } from "../../../../shared/model/thread";
import { values } from 'lodash';

export function unreadMessagesCounterSelector(state: any):number{
  const {app} = state,
    currentUserId = app.userId;

  return values<Thread>(app.threads)
  .reduce(
    (acc, thread) =>  acc + (thread.participants[currentUserId] || 0)
     ,0)
}