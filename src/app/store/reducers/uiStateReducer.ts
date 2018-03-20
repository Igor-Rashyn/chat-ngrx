import { UiState, INITIAL_UI_STATE } from "../ui-state";

export function uiState(state: UiState = INITIAL_UI_STATE, action: any) : UiState {

    switch (action.type)  {

        default:
            return state;

    }

}