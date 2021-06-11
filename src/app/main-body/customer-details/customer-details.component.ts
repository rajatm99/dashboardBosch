import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { DevicetestService } from '../../services/devicetest.service'
import { CustomerService } from '../../services/customer.service'
import { Chart } from 'chart.js'


@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  public customerId;
  public customerDetails: any
  public dataset;
  public labels = []
  public testNum = []
  public chart: any

  constructor(
    private route: ActivatedRoute,
    private deviceTestService: DevicetestService,
    private customerServcie: CustomerService) { }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.paramMap.get("id");
    console.log(this.customerId);
    this.deviceTestService.getCustomerTestData(this.customerId).subscribe((data: any) => {


    })
    this.customerServcie.getcustomer(this.customerId).subscribe((data: any) => {
      this.customerDetails = data

    })
    this.initializeChart()

  }



  initializeChart() {
    this.deviceTestService.getCustomerTestData(this.customerId).subscribe((data: any) => {


      this.dataset = this.deviceTestService.createDeviceChartData(data)



      this.dataset.forEach(element => {


        this.labels.push(element.deviceId)

        this.testNum.push(element.testNum)
        console.log(this.labels, this.testNum);

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
              barPercentage:0.5, 
              
             
            }

          ]
        },
        options: {
         
          
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
                  stepSize: 50
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
}
