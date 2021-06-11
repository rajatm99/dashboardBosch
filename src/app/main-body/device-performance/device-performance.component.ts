import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Chart } from 'chart.js'

@Component({
  selector: 'app-device-performance',
  templateUrl: './device-performance.component.html',
  styleUrls: ['./device-performance.component.css']
})
export class DevicePerformanceComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DevicePerformanceComponent>) { }

  ngOnInit(): void {
    var chart = new Chart('newchart', {
      type: 'line',
      data: {
        labels:['jan', 'feb', 'mar', 'apr', 'may', 'jun'],
        datasets: [
          {

            label: 'My First Dataset',
            data: [65, 59, 80, 81, 56, 55],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
           lineTension:0.3
          }
        ]
      }
    })
  }

}
