import { Component, OnInit } from '@angular/core';
import { ThreadsService } from '../services/threads.service';
import { Store } from '@ngrx/store';
import { ApplicationState } from '../store/application-state';
import { Observable } from 'rxjs/Observable';
import { ThreadSummaryVM } from './thread-summary.vm';
import { userNameSelector } from './selectors/userNameSelector';
import { unreadMessagesCounterSelector } from './selectors/unreadMessagesCounterSelector';
import { treadSummariesSelector } from './selectors/treadSummariesSelector';
import { LoadUserThreadsAction, ThreadSelectedAction } from '../store/actions';
import { currentThreadIdSelector } from './selectors/currentThreadIdSelector';

@Component({
  selector: 'thread-section',
  templateUrl: './thread-section.component.html',
  styleUrls: ['./thread-section.component.css']
})
export class ThreadSectionComponent {

  userName$: Observable<string>;
  unreadMessagesCounter$: Observable<number>;
  threadSummaries$: Observable<ThreadSummaryVM[]>;
  currentSelectedThreadId$:Observable<number>;

  constructor(private store: Store<any>) { 
    this.userName$ = store.select(userNameSelector);
    this.unreadMessagesCounter$ = store.select(unreadMessagesCounterSelector);
    this.threadSummaries$ = store.select(treadSummariesSelector)
    this.currentSelectedThreadId$ = store.select(currentThreadIdSelector);
  }

  onThreadSelected(selectedThreadId:number){
    this.store.dispatch(new ThreadSelectedAction(selectedThreadId))
  }

}
