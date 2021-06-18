import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js'
import { ServiceCountService } from 'src/app/services/service-count.service';

@Component({
  selector: 'app-servicechart',
  templateUrl: './servicechart.component.html',
  styleUrls: ['./servicechart.component.css']
})
export class ServicechartComponent implements OnInit {
  public chart:any
  constructor(public serviceCount:ServiceCountService) { }

  ngOnInit(): void {
    
   this.serviceCount.getServiceData().subscribe((data:any)=>{
     console.log(data);
     var label=[]
     var count=[]
     data.forEach(element => {
       label.push(element.device)
       count.push(element.servicecount)
     });
     this.chart = new Chart ('serviceChart',{
       type:'bar',
       data:{
         labels:label,
         datasets:[
           {
             data:count,
             backgroundColor: [
              // '#003f5c',
              // '#7a5195',
              // '#bc5090',
              // '#ef5675',
              // '#ff764a',
              // '#ffa600'

              '#004c6d',
              // '#006083',
              '#007599',
              // '#008bad',
              '#00a1c1',
              // '#00b8d3',
              '#00cfe3',
              // '#00e7f2',
              '#00ffff'
           
            ]
           }
         ]
       },
       options:{
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          yAxes: [
            {
              id: 'Service Request',
              type: 'linear',
              position: 'left',
              scaleLabel: {
                labelString: 'Service Request',
                display: true,
                fontColor: 'blue',


              },
              
              ticks: {
                beginAtZero: true,
                stepSize: 10
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
