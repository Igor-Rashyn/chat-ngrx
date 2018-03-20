import { UiState, INITIAL_UI_STATE } from "../ui-state";
import { THREAD_SELECTED_ACTION } from "../actions";

export function uiState(state: UiState = INITIAL_UI_STATE, action: any) : UiState {

    switch (action.type)  {
        case THREAD_SELECTED_ACTION:
            return {...state, currentThreadId:action.payload};
        default:
            return state;

    }

}