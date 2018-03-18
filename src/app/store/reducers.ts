import { ApplicationState, INITIAL_APPLICATION_STATE } from "./application-state";
import { Action, ActionReducerMap, ActionReducer, MetaReducer } from "@ngrx/store";
import * as app from "./actions";
import { keyBy } from 'lodash';
import { environment } from "../../environments/environment";
import * as fromRouter from '@ngrx/router-store';

/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
// import { storeFreeze } from 'ngrx-store-freeze';

export const initialState: ApplicationState = INITIAL_APPLICATION_STATE;

export function reducer(state = initialState, action:app.Actions) : ApplicationState{
   switch(action.type){
    case app.LOAD_USER_THREADS_ACTION:
       
        return handleLoadUserThreadsAction(state, action);

    default:
        return state;
    }
}
    

function handleLoadUserThreadsAction(state: ApplicationState, action: app.Actions): ApplicationState {
    const userData = action.payload;

    const newState: ApplicationState = Object.assign({}, state);

    newState.participants = keyBy(action.payload.participants, 'id');
    newState.messages = keyBy(action.payload.messages, 'id');
    newState.threads = keyBy(action.payload.threads, 'id')

    return newState;
}


export const reducers: ActionReducerMap<any> = {
    reducer
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
  