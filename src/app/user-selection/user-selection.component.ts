import { Component, OnInit } from '@angular/core';
import { ApplicationState } from '../store/application-state';
import { Store } from '@ngrx/store';
import { SelectUserAction } from '../store/actions';

@Component({
  selector: 'user-selection',
  templateUrl: './user-selection.component.html',
  styleUrls: ['./user-selection.component.css']
})
export class UserSelectionComponent implements OnInit {

  constructor(private store: Store<ApplicationState>) { }

  ngOnInit() {
  }

  onSelectUser(userId: number){
    this.store.dispatch(new SelectUserAction(userId));
  }

}
