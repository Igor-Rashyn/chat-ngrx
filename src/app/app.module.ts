import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';


import { AppComponent } from './app.component';
import { UserSelectionComponent } from './user-selection/user-selection.component';
import { ThreadSectionComponent } from './thread-section/thread-section.component';
import { MessageSectionComponent } from './message-section/message-section.component';
import { ThreadListComponent } from './thread-list/thread-list.component';
import { MessageListComponent } from './message-list/message-list.component';
import { ThreadsService } from './services/threads.service';
import { metaReducers, reducers } from './store/rootReducer';
import { INITIAL_APPLICATION_STATE } from './store/application-state';
import { LoadThreadsEffect } from './store/effects/load-threads.effects';
import { environment } from '../environments/environment';


import './utils/utils';
import { WriteNewMessageEffects } from './store/effects/write-new-message.effects';
import { ServerNotificationsEffects } from './store/effects/server-notifications.effects';




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
    StoreModule.forRoot(reducers, {metaReducers, initialState: INITIAL_APPLICATION_STATE}),
    EffectsModule.forRoot([LoadThreadsEffect, WriteNewMessageEffects, ServerNotificationsEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production // Restrict extension to log-only mode
    })
  ],
  providers: [ThreadsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
