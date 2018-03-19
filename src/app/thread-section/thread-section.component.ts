import { Component, OnInit } from '@angular/core';
import { ThreadsService } from '../services/threads.service';
import { Store } from '@ngrx/store';
import { ApplicationState } from '../store/application-state';
import { LoadUserThreadAction } from '../store/actions';
import 'rxjs/add/operator/skip';
import { isEmpty } from 'ramda';
import { values } from 'lodash';
import { Observable } from 'rxjs/Observable';
import { Thread } from '../../../shared/model/thread';

@Component({
  selector: 'thread-section',
  templateUrl: './thread-section.component.html',
  styleUrls: ['./thread-section.component.css']
})
export class ThreadSectionComponent implements OnInit {

  userName$: Observable<string>;
  unreadMessagesCounter$: Observable<number>;

  constructor(private threadsService: ThreadsService, private store: Store<any>) { 
    this.userName$ = store
    .skip(1)
    .map(this.mapStateToUserName);

    this.unreadMessagesCounter$ = store.skip(1).map(this.mapStateToUnreadMessagesCounter);
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
    // if(!isEmpty(app.participants)){
      return app.participants[app.userId].name;
    // }
  }

  ngOnInit() {
    this.threadsService.loadUserThreads()
    .subscribe(
      allUserDate => this.store.dispatch(new LoadUserThreadAction(allUserDate))
    );
  }

}
