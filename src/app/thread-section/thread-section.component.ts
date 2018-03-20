import { Component, OnInit } from '@angular/core';
import { ThreadsService } from '../services/threads.service';
import { Store } from '@ngrx/store';
import { ApplicationState } from '../store/application-state';
import { LoadUserThreadAction } from '../store/actions';
import 'rxjs/add/operator/skip';
import { isEmpty } from 'ramda';
import { Observable } from 'rxjs/Observable';
import { Thread } from '../../../shared/model/thread';
import { ThreadSummaryVM } from './thread-summary.vm';
import { userNameSelector } from './selectors/userNameSelector';
import { unreadMessagesCounterSelector } from './selectors/unreadMessagesCounterSelector';
import { treadSummariesSelector } from './selectors/treadSummariesSelector';

@Component({
  selector: 'thread-section',
  templateUrl: './thread-section.component.html',
  styleUrls: ['./thread-section.component.css']
})
export class ThreadSectionComponent implements OnInit {

  userName$: Observable<string>;
  unreadMessagesCounter$: Observable<number>;
  threadSummaries$: Observable<ThreadSummaryVM[]>;

  constructor(private threadsService: ThreadsService, private store: Store<any>) { 
    this.userName$ = store.select(userNameSelector);
    this.unreadMessagesCounter$ = store.select(unreadMessagesCounterSelector);
    this.threadSummaries$ = store.select(treadSummariesSelector)
  }

  ngOnInit() {
    this.threadsService.loadUserThreads()
    .subscribe(
      allUserDate => this.store.dispatch(new LoadUserThreadAction(allUserDate))
    );
  }

}
