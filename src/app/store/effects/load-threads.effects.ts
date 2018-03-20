import { Injectable } from '@angular/core';
import { ThreadsService } from '../../services/threads.service';
import { Actions, Effect } from '@ngrx/effects';
import { LOAD_USER_THREADS_ACTION, UserThreadsLoadedAction } from '../actions';
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
   .do(val => console.log('action received', val))
   .switchMap(() => this.threadsService.loadUserThreads())
   .map(allUserData => new UserThreadsLoadedAction(allUserData))

}
