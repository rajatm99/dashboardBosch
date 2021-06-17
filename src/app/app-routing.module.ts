import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDetailsComponent } from './main-body/customer-details/customer-details.component';
import {CustomertableComponent}from './main-body/customertable/customertable.component'
import { DeviceDetailsComponent } from './main-body/device-details/device-details.component';
import { MainBodyComponent } from './main-body/main-body.component';


const routes: Routes = [
  { path: '', component:MainBodyComponent },
  { path: 'customers', component:CustomertableComponent  },
  { path: 'customers/:id', component:CustomerDetailsComponent },
  {path:'devicedetails/:id', component:DeviceDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }