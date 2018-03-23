import { Injectable } from '@angular/core';
import { ThreadsService } from '../../services/threads.service';
import { Actions, Effect } from '@ngrx/effects';
import { LOAD_USER_THREADS_ACTION, UserThreadsLoadedAction, SELECT_USER_ACTION, LoadUserThreadsAction } from '../actions';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';

@Injectable()
export class LoadThreadsEffect {

  constructor(
    private actions$: Actions,
     private threadsService: ThreadsService
    ) { }

   @Effect() userThreads$: Observable<Action> = this.actions$
   .ofType(LOAD_USER_THREADS_ACTION)
   .switchMap(() => this.threadsService.loadUserThreads())
   .debug('data received')
   .map(allUserData => new UserThreadsLoadedAction(allUserData));


   @Effect() userSelected$: Observable<Action> = this.actions$
   .ofType(SELECT_USER_ACTION)
   .debug('new user selected')
   .map(() => new LoadUserThreadsAction());

}
