import { StoreData } from "../store-data";
import { Action } from "@ngrx/store";
import { USER_THREADS_LOADED_ACTION, THREAD_SELECTED_ACTION, UserThreadsLoadedAction, SEND_NEW_MESSAGE_ACTION } from "../actions";
import { keyBy, cloneDeep } from 'lodash';
import { Message } from "../../../../shared/model/message";

const uuid = require('uuid/V4');

export function storeData(state: StoreData, action:Action) : StoreData {
    switch (action.type)  {

        case USER_THREADS_LOADED_ACTION:

            return handleLoadUserThreadsAction(state,<any>action);

        case SEND_NEW_MESSAGE_ACTION:
            const newStoreState = cloneDeep(state);

            const currentThread = newStoreState.threads[action.payload.threadId];
            const newMessage: Message ={
                text: action.payload.text,
                threadId: action.payload.threadId,
                timestamp: new Date().getTime(),
                participantId: action.payload.participantId,
                id:uuid()
            }
            
            currentThread.messageIds.push(newMessage.id);
            newStoreState.messages[newMessage.id] = newMessage;


            return newStoreState;

        default:
            return state;
    }
}

function handleLoadUserThreadsAction(state:StoreData, action: UserThreadsLoadedAction): StoreData {
    return { ...state,
        participants: keyBy(action.payload.participants, 'id'),
        messages: keyBy(action.payload.messages, 'id'),
        threads: keyBy(action.payload.threads, 'id')
    };
}