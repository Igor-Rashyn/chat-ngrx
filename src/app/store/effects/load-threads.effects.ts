import { Injectable } from '@angular/core';
import {ThreadsService} from "../../services/threads.service";
import {Actions, Effect} from "@ngrx/effects";
import {
    LOAD_USER_THREADS_ACTION, UserThreadsLoadedAction, SELECT_USER_ACTION, LoadUserThreadsAction,
    SelectUserAction
} from "../actions";
import {Observable} from "rxjs/Observable";
import {Action} from "@ngrx/store";
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';


@Injectable()
export class LoadThreadsEffect {

  constructor(
    private actions$: Actions,
     private threadsService: ThreadsService
    ) { }

   @Effect() userThreads$: Observable<Action> = this.actions$
   .ofType(LOAD_USER_THREADS_ACTION)
   .switchMap(action => this.threadsService.loadUserThreads(action.payload))
   .debug('data received')
   .map(allUserData => new UserThreadsLoadedAction(allUserData));


   @Effect() userSelected$: Observable<Action> = this.actions$
   .ofType(SELECT_USER_ACTION)
   .debug('new user selected')
   .map(action => new LoadUserThreadsAction(action.payload));

}
