import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js'
@Component({
  selector: 'app-saleschart',
  templateUrl: './saleschart.component.html',
  styleUrls: ['./saleschart.component.css']
})
export class SaleschartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var chart= new Chart('salesChart',{
      type: 'line',
      data: {
        datasets: [{
            type: 'line',
            fill:false,
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
