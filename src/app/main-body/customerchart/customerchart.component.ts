import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../../services/customer.service'
import {Chart} from 'chart.js'

@Component({
  selector: 'app-customerchart',
  templateUrl: './customerchart.component.html',
  styleUrls: ['./customerchart.component.css']
})
export class CustomerchartComponent implements OnInit {
  public customerList:any

  constructor(private customerService:CustomerService) { }
  getAllCustomer(){
    this.customerService.getAllCustomer().subscribe((data:any)=>{
      this.customerList=data
      console.log(this.customerList,);
      
    })
  }
  ngOnInit(): void {
    var chart= new Chart('customerChart',{
      type: 'line',
      data: {
        datasets: [{
            type: 'bar',
            label: 'Number of Devices',            
            backgroundColor:'blue',
            data :[10,20,30,40],
            order: 1
        }],
        labels:['A','B','C','D']
    }
    })
  }

}
