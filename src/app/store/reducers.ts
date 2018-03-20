import { ApplicationState, INITIAL_APPLICATION_STATE } from "./application-state";
import { Action, ActionReducerMap, ActionReducer, MetaReducer } from "@ngrx/store";
import * as app from "./actions";
import { environment } from "../../environments/environment";
import * as fromRouter from '@ngrx/router-store';
import { uiState } from "./reducers/uiStateReducer";
import { storeData } from "./reducers/uiStoreDataReducer";


export const initialState: ApplicationState = INITIAL_APPLICATION_STATE;

export function reducer(state = initialState, action:app.Actions) : ApplicationState{

    return {
        uiState: uiState(state.uiState, action),
        storeData: storeData(state.storeData, action),
    }

}



export const reducers: ActionReducerMap<any> = {
    uiState: uiState,
    storeData: storeData,
};


export function logger(reducer: ActionReducer<ApplicationState>): ActionReducer<ApplicationState> {
    return function(state: ApplicationState, action: any): ApplicationState {
      console.log('state', state);
      console.log('action', action);
      return reducer(state, action);
    };
  }

  export const metaReducers: MetaReducer<ApplicationState>[] = !environment.production
  ? [logger]
  : []; 
  