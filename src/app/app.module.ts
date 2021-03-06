import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule } from '@angular/material/dialog';


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


import {DevicetestService} from './services/devicetest.service';
import { AppRoutingModule } from './app-routing.module';
import { CustomertableComponent } from './main-body/customertable/customertable.component';
import { CustomerDetailsComponent } from './main-body/customer-details/customer-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DevicePerformanceComponent } from './main-body/device-performance/device-performance.component';
import { MapComponentComponent } from './main-body/map-component/map-component.component';
import { DeviceDetailsComponent } from './main-body/device-details/device-details.component';
import { DeviceCustomerComponent } from './main-body/device-customer/device-customer.component'


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
    FooterComponent,
    CustomertableComponent,
    CustomerDetailsComponent,
    DevicePerformanceComponent,
    MapComponentComponent,
    DeviceDetailsComponent,
    DeviceCustomerComponent,
   
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule ,

  ],
  
  providers: [DevicetestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
