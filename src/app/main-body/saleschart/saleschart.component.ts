import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js'
import { SalesService } from '../../services/sales.service'
@Component({
  selector: 'app-saleschart',
  templateUrl: './saleschart.component.html',
  styleUrls: ['./saleschart.component.css']
})
export class SaleschartComponent implements OnInit {
 constructor(private saleService: SalesService) { }
 
 ngOnInit(): void {
   

   
    var chart = new Chart('salesChart', {
      type: 'line',
      options:{
        legend: {
          display: false
       }
      },
      data: {
        datasets: [{
          lineTension:0,
          fill: false,
          backgroundColor: 'blue',
          data:[10,20,30,40],
          borderColor:'blue',
          borderWidth:1,
          
        }],
        labels: ['A','B','C','D']
      }
    })
  }

}
