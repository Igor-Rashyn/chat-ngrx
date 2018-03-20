import { ApplicationState } from "./application-state";
import { ActionReducerMap, ActionReducer, MetaReducer } from "@ngrx/store";
import { environment } from "../../environments/environment";
import * as fromRouter from '@ngrx/router-store';
import { uiState } from "./reducers/uiStateReducer";
import { storeData } from "./reducers/uiStoreDataReducer";

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
  