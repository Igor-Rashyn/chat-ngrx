import { UiState, INITIAL_UI_STATE } from "../ui-state";
import { THREAD_SELECTED_ACTION, SELECT_USER_ACTION } from "../actions";

export function uiState(state: UiState = INITIAL_UI_STATE, action: any) : UiState {

    switch (action.type)  {
        case THREAD_SELECTED_ACTION:
            return {...state, currentThreadId: action.payload};
        case SELECT_USER_ACTION:
            return {...state, userId: action.payload};
        default:
            return state;

    }

}