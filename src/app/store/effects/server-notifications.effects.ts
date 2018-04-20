
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {ThreadsService} from "../../services/threads.service";
import {Effect} from "@ngrx/effects";
import {NewMessagesReceivedAction} from "../actions";
import {ApplicationState} from "../application-state";
import {Store} from "@ngrx/store";
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/filter';

@Injectable()
export class ServerNotificationsEffects {


    constructor(
      private threadsService: ThreadsService,
      private store: Store<ApplicationState>) {}


    @Effect() 
    newMessages$ = Observable.interval(3000)
        .withLatestFrom(this.store.select("uiState"))
        .map(([any,uiState]) => uiState)
        .filter((uiState:any) => uiState.userId)
        .switchMap(uiState => this.threadsService.loadNewMessagesForUser(uiState.userId))
        .debug("new messages received from server")
        .withLatestFrom(this.store.select("uiState"))
        .map(([unreadMessages, uiState]: [any, any]) =>  new NewMessagesReceivedAction({
            unreadMessages,
            currentThreadId: uiState.currentThreadId,
            currentUserId: uiState.userId
        }))





}