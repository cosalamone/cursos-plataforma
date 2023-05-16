import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AuthComponent } from './components/auth/auth.component';
import { LogInComponent } from './components/auth/log-in/log-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { actionReducerMap } from './store';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LogInComponent,
    DashboardComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    StoreModule.forRoot(actionReducerMap, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
