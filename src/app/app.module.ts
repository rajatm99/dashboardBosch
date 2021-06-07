import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from 'angularfire2';              //Importing firebase module
import {AngularFireDatabaseModule} from 'angularfire2/database';

import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainBodyComponent } from './main-body/main-body.component';
import { KpiComponent } from './main-body/kpi/kpi.component';
import { DevicechartComponent } from './main-body/devicechart/devicechart.component';
import { SaleschartComponent } from './main-body/saleschart/saleschart.component';
import { CustomerchartComponent } from './main-body/customerchart/customerchart.component';
import { ServicechartComponent } from './main-body/servicechart/servicechart.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainBodyComponent,
    KpiComponent,
    DevicechartComponent,
    SaleschartComponent,
    CustomerchartComponent,
    ServicechartComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    HttpClientModule
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
