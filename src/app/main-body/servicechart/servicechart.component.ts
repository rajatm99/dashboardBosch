import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js'

@Component({
  selector: 'app-servicechart',
  templateUrl: './servicechart.component.html',
  styleUrls: ['./servicechart.component.css']
})
export class ServicechartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
    var chart= new Chart('serviceChart',{
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
