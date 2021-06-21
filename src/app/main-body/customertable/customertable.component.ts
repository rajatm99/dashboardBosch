import { Component, OnInit } from '@angular/core';
import { DevicetestService } from '../../services/devicetest.service'
import {Router} from '@angular/router'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customertable',
  templateUrl: './customertable.component.html',
  styleUrls: ['./customertable.component.css']
})
export class CustomertableComponent implements OnInit {
  dataset: any
  constructor(
    private deviceTestService: DevicetestService,
    private router:Router,
    private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.createTableData()
  }
createTableData(){
  this.deviceTestService.getTestData().subscribe((data:any)=>{
    this.dataset=this.deviceTestService.createChartData(data)
   
  })
 
  
}
showCustomer(customerId){
this.router.navigate(['customers',customerId],);
}
}
