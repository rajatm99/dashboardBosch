import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule } from 'angularfire2';              //Importing firebase module
import {AngularFireDatabaseModule} from 'angularfire2/database';

import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainBodyComponent } from './main-body/main-body.component';
import { KpiComponent } from './kpi/kpi.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainBodyComponent,
    KpiComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
