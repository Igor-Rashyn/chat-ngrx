import { Component, OnInit } from '@angular/core';
import { ThreadsService } from '../services/threads.service';
import { Store } from '@ngrx/store';
import { ApplicationState } from '../store/application-state';
import { LoadUserThreadAction } from '../store/actions';
import { isEmpty } from 'ramda';

@Component({
  selector: 'thread-section',
  templateUrl: './thread-section.component.html',
  styleUrls: ['./thread-section.component.css']
})
export class ThreadSectionComponent implements OnInit {

  userName: string;

  constructor(private threadsService: ThreadsService, private store: Store<any>) { 
    store.subscribe(
      state => {
        var {app} = state;
        if(!isEmpty(app.participants)){
          this.userName = app.participants[app.userId].name;
        }
      }
    );
  }
  

  ngOnInit() {
    this.threadsService.loadUserThreads()
    .subscribe(
      allUserDate => this.store.dispatch(new LoadUserThreadAction(allUserDate))
    );
  }

}
