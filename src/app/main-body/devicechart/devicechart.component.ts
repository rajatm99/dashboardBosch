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
            backgroundColor:'blue',
            data :[10,20,30,40],
            order: 1
        }],
        labels:['A','B','C','D']
    },
   options:{
     
   }
   
  })
  
}



}
