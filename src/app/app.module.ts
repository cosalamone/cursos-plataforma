import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardModule } from './dashboard/dashboard.module';
import { PageWrapperComponent } from './page-wrapper/page-wrapper.component';

@NgModule({
  declarations: [
    AppComponent,
    PageWrapperComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DashboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
