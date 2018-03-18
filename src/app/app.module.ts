import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';


import { AppComponent } from './app.component';
import { UserSelectionComponent } from './user-selection/user-selection.component';
import { ThreadSectionComponent } from './thread-section/thread-section.component';
import { MessageSectionComponent } from './message-section/message-section.component';
import { ThreadListComponent } from './thread-list/thread-list.component';
import { MessageListComponent } from './message-list/message-list.component';
import { ThreadsService } from './services/threads.service';
import { reducer, metaReducers, reducers } from './store/reducers';
import { INITIAL_APPLICATION_STATE } from './store/application-state';



@NgModule({
  declarations: [
    AppComponent,
    UserSelectionComponent,
    ThreadSectionComponent,
    MessageSectionComponent,
    ThreadListComponent,
    MessageListComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    StoreModule.forRoot({app: reducer})
  ],
  providers: [ThreadsService],
  bootstrap: [AppComponent]
})
export class AppModule { }


//https://coursehunters.net/course/udemy-angular-ngrx