import { StoreData } from "../store-data";
import { Action } from "@ngrx/store";
import { USER_THREADS_LOADED_ACTION, THREAD_SELECTED_ACTION, UserThreadsLoadedAction } from "../actions";
import { keyBy } from 'lodash';

export function storeData(state: StoreData, action:Action) : StoreData {
    switch (action.type)  {

        case USER_THREADS_LOADED_ACTION:

            return handleLoadUserThreadsAction(state,<any>action);

        // case THREAD_SELECTED_ACTION:

        //     return handleThreadSelectedAction(state, <any>action);

        default:
            return state;
    }
}

function handleLoadUserThreadsAction(state:StoreData, action: UserThreadsLoadedAction): StoreData {
    return {
        participants: keyBy(action.payload.participants, 'id'),
        messages: keyBy(action.payload.messages, 'id'),
        threads: keyBy(action.payload.threads, 'id')
    };
}