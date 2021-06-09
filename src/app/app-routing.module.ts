import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomertableComponent } from './main-body/customertable/customertable.component';
import { MainBodyComponent } from './main-body/main-body.component';


const routes: Routes = [
  { path: '', component:MainBodyComponent },
  { path: 'customers', component:CustomertableComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }