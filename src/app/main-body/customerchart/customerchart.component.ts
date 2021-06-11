import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service'
import { Chart } from 'chart.js'
import { DevicetestService } from '../../services/devicetest.service'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-customerchart',
  templateUrl: './customerchart.component.html',
  styleUrls: ['./customerchart.component.css']
})
export class CustomerchartComponent implements OnInit {
  chart: any
  labels = []
  deviceNum = []
  testNum = []
  dataset :any

  constructor(
    private customerService: CustomerService,
    private devicetestService: DevicetestService
  ) { }

  ngOnInit(): void {
    this.initializeChart()
   
  }



  initialChartConfig() {
    return {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [
          {
            type: 'line',
            yAxisID: 'testnumber',
            data: this.testNum,
            borderColor: 'red',
            fill: false,
            lineTension: 0,
            borderWidth: 1,
            pointBackgroundColor: 'red',
            pointRadius: 2,


          },
          {
            data: this.deviceNum,
            yAxisID: 'devicenumber',
            backgroundColor: '#0040ff',
            barPercentage: .6,

          }

        ]
      },
      options: {
        responsive: true,
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
                labelString: 'Device Number',
                display: true,
                fontColor: 'blue',


              },
              gridLines: {


              },
              ticks: {
                beginAtZero: true,
                stepSize: 1
              }
            },
            {
              id: 'testnumber',
              type: 'linear',
              position: 'right',
              scaleLabel: {
                labelString: 'Test Conducted',
                display: true,
                fontColor: 'red'
              },
              gridLines: {
                display: false
              },
              ticks: {
                beginAtZero: true,
              }
            },

          ],
          xAxes: [
            {
              gridLines: {
                display: false
              }
            }
          ]
        }
      }
    }
  }
 
  initializeChart() {
    this.devicetestService.getTestData().subscribe((data: any) => {
      console.log(data); 
     this.dataset= this.devicetestService.createChartData(data)
     
      
      this.dataset.forEach(element => {
    
        
      this.labels.push(element.customer)
      this.deviceNum.push(element.deviceNum)
      this.testNum.push(element.testNum)
        
      });
     
      
    

      // chart configuration setup

      this.chart = new Chart('customerChart', {
        type: 'bar',
        data: {
          labels: this.labels,
          datasets: [
            {
              type: 'line',
              yAxisID: 'testnumber',
              data: this.testNum,
              borderColor: 'red',
              fill: false,
              lineTension: 0,
              borderWidth: 1,
              pointBackgroundColor: 'red',
              pointRadius: 2,


            },
            {
              data: this.deviceNum,
              yAxisID: 'devicenumber',
              backgroundColor: '#0040ff',
              barPercentage: .6,

            }

          ]
        },
        options: {
          responsive: true,
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
                  labelString: 'Device Number',
                  display: true,
                  fontColor: 'blue',


                },
                gridLines: {


                },
                ticks: {
                  beginAtZero: true,
                  stepSize: 1
                }
              },
              {
                id: 'testnumber',
                type: 'linear',
                position: 'right',
                scaleLabel: {
                  labelString: 'Test Conducted',
                  display: true,
                  fontColor: 'red'
                },
                gridLines: {
                  display: false
                },
                ticks: {
                  beginAtZero: true,
                }
              },

            ],
            xAxes: [
              {
                gridLines: {
                  display: false
                }
              }
            ]
          }
        }
      })
    })


  }
  //function for sort
  sortByDevice() {

    console.log(this.chart.data.labels);

    this.dataset.sort((customer1, customer2) => (customer1.deviceNum > customer2.deviceNum ? -1 : 1))
    let labels = []
    let deviceNum = []
    let testNum = []
    this.dataset.forEach(element => {
      deviceNum.push(element.deviceNum)
      testNum.push(element.testNum)
      labels.push(element.customer)
    });
    console.log(this.labels);

    this.chart.data.labels = labels
    this.chart.data.datasets[0].data = testNum
    this.chart.data.datasets[1].data = deviceNum

    this.chart.update()
  }
  sortByTest() {
    console.log(this.dataset);
    this.dataset.sort((customer1, customer2) => (customer1.testNum > customer2.testNum ? -1 : 1))
    console.log(this.dataset);
    let labels = []
    let deviceNum = []
    let testNum = []
    this.dataset.forEach(element => {
      deviceNum.push(element.deviceNum)
      testNum.push(element.testNum)
      labels.push(element.customer)
    });
    console.log(this.labels);

    this.chart.data.labels = labels
    this.chart.data.datasets[0].data = testNum
    this.chart.data.datasets[1].data = deviceNum
    this.chart.update()

  }
}
