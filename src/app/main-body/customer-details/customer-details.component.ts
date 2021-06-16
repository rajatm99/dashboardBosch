import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { DevicetestService } from '../../services/devicetest.service'
import { CustomerService } from '../../services/customer.service'
import { Chart } from 'chart.js'
import {MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { DevicePerformanceComponent } from '../device-performance/device-performance.component';


@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  public customerId;
  public customerDetails: any
  public dataset:any
  public labels = []
  public testNum = []
  public chart: any

  constructor(
    private route: ActivatedRoute,
    private deviceTestService: DevicetestService,
    private customerServcie: CustomerService,
    public matDialog:MatDialog) { }

  ngOnInit(): void {
    
    this.customerId = this.route.snapshot.paramMap.get("id");
    
    this.initializeChart()
    this.customerServcie.getcustomer(this.customerId).subscribe((data: any) => {
      this.customerDetails = data

    })
   
    
  }



  initializeChart() {
    this.deviceTestService.getCustomerTestData(this.customerId).subscribe((data: any) => {


      this.dataset = this.deviceTestService.createDeviceChartData(data)

      console.log(this.dataset);
      

      this.dataset.forEach(element => {


        this.labels.push(element.deviceId)

        this.testNum.push(element.testNum)
       

      });




      // chart configuration setup

      this.chart = new Chart('deviceChart', {
        type: 'bar',
        data: {
          labels: this.labels,
          datasets: [
            
            {
              data: this.testNum,
              yAxisID: 'devicenumber',
              backgroundColor: '#0040ff',
               
            }

          ]
        },
        options: {
         
          layout:{
            padding:70
          },
          maintainAspectRatio: false,
          legend: {
            display: false
          },
          scales: {
            yAxes: [
              {
                id: 'devicenumber',
                type: 'linear',
                position: 'left',
                scaleLabel: {
                  labelString: 'Test Conducted',
                  display: true,
                  fontColor: 'blue',


                },
                gridLines: {

                  
                },
                ticks: {
                  beginAtZero: true,
                  stepSize: 100
                }
              }

            ],
            xAxes: [{ 
              gridLines:{
                display:false
              }
             }]
          }
        }
      })
    })


  }
 deviceDialog(deviceId){
   
   
  const dialogConfig = new MatDialogConfig();
  

  dialogConfig.disableClose = true;
  dialogConfig.id = deviceId;
  dialogConfig.height = "500px";
  dialogConfig.width = "700px";
  
  // https://material.angular.io/components/dialog/overview
  const modalDialog = this.matDialog.open(DevicePerformanceComponent, dialogConfig);
 }
}
