import { Action } from "@ngrx/store";
import { AllUserData } from "../../../shared/to/all-user-data";

export const LOAD_USER_THREADS_ACTION = 'LOAD_USER_THREADS_ACTION';

export class LoadUserThreadAction implements Action{
    readonly type = LOAD_USER_THREADS_ACTION;

    constructor(public payload?: AllUserData){
        console.log('action type', this.type)
    }
}


export type Actions
    = LoadUserThreadAction;