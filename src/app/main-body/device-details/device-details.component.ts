import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { initializeApp } from 'firebase';
import { SalesService } from 'src/app/services/sales.service';
import { Chart } from 'chart.js';
import { Router } from '@angular/router';


@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.css']
})
export class DeviceDetailsComponent implements OnInit {
  deviceName:string
  deviceId:string
  customerList=[]
  chartData=[]
  chartLabel=[]
  totalDevice=0
  chart :any
  constructor(  private route: ActivatedRoute,
                private salesService:SalesService,
                private router:Router) { }

  ngOnInit(): void {
    this.deviceName = this.route.snapshot.paramMap.get("id");
    this.fetData(this.deviceName)
    
  }

  fetData(deviceName){
    this.salesService.getDeviceInfo(deviceName).subscribe((data:any) =>{
      
      this.deviceId=data[0].deviceId
      
      data[0].customerlist.forEach(customer => {
     
        this.customerList.push({customerId:customer.customerId,customerName:customer.customer})
        this.chartData.push(customer.devicelist.length)
        this.chartLabel.push(customer.customer)
        this.totalDevice+=customer.devicelist.length
      });
      
      this.chart = new Chart ('deviceChart',{
        options:{
          scales:{
           yAxes:[{
            ticks:{
              beginAtZero:true,
              stepSize:1
            }
           }]
          }
        },
        type:'bar',
        data:{
          labels:this.chartLabel,
          datasets:[
            {
              data:this.chartData,
              backgroundColor: '#0040ff',
              barPercentage: .6,
            }
          ]
        }
      })
     
      
    })
  }
  
  getCustomer(id){
  this.router.navigate(['customer/',id],{relativeTo:this.route})
  
}



}
