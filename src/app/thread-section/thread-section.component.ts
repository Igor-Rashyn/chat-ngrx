import { Component, OnInit } from '@angular/core';
import { ThreadsService } from '../services/threads.service';
import { Store } from '@ngrx/store';
import { ApplicationState } from '../store/application-state';
import { LoadUserThreadAction } from '../store/actions';
import 'rxjs/add/operator/skip';
import { isEmpty } from 'ramda';
import { values, keys, join, last } from 'lodash';
import { Observable } from 'rxjs/Observable';
import { Thread } from '../../../shared/model/thread';
import { ThreadSummaryVM } from './thread-summary.vm';

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
    this.userName$ = store
    .skip(1)
    .map(this.mapStateToUserName);

    this.unreadMessagesCounter$ = store
    .skip(1)
    .map(this.mapStateToUnreadMessagesCounter);

    this.threadSummaries$ = store.select(
      state => {
        const threads = values<Thread>(state.app.threads);

        return threads.map(thread => {
          
          const names = keys(thread.participants).map(participantId => state.app.participants[participantId].name);
          const lastMessageId = last(thread.messageIds);

          return {
            id: thread.id,
            participantNames: join(names, ","),
            lastMessageText: state.app.messages[lastMessageId].text
          }
        });
      }
    );
  }

  mapStateToUnreadMessagesCounter(state: any):number{
    var {app} = state;
    const currentUserId = app.userId;
    return values<Thread>(app.threads)
      .reduce(
        (acc, thread) =>  acc + thread.participants[currentUserId]
         ,0)
  }
  
  mapStateToUserName(state: any):string{
     var {app} = state;
      return app.participants[app.userId].name;
  }

  ngOnInit() {
    this.threadsService.loadUserThreads()
    .subscribe(
      allUserDate => this.store.dispatch(new LoadUserThreadAction(allUserDate))
    );
  }

}
