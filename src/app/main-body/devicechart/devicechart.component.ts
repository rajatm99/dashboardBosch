import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js'
@Component({
  selector: 'app-devicechart',
  templateUrl: './devicechart.component.html',
  styleUrls: ['./devicechart.component.css']
})
export class DevicechartComponent implements OnInit {

  
  constructor() { }

  ngOnInit(): void {
    var chart= new Chart('deviceChart',{
      type: 'doughnut',
      data: {
        datasets: [{
            type: 'doughnut',
            label: 'Number of Devices',            
            backgroundColor: [
              '#003f5c',
              '#7a5195',
              '#bc5090',
              '#ef5675',
              '#ff764a',
              '#ffa600'
           
            ],
            data :[10,20,30,40],
            
          
        }],
        labels:['A','B','C','D']
    },
   options:{
     
   }
   
  })
  
}



}
