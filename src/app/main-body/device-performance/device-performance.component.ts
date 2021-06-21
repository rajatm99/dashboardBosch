import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Chart } from 'chart.js'
import { DevicetestService } from 'src/app/services/devicetest.service';

@Component({
  selector: 'app-device-performance',
  templateUrl: './device-performance.component.html',
  styleUrls: ['./device-performance.component.css']
})
export class DevicePerformanceComponent implements OnInit {
  public deviceId;
  public deviceData;
  public chart: any
  public deviceInfo;

  constructor(
    public dialogRef: MatDialogRef<DevicePerformanceComponent>,
    public deviceTestService: DevicetestService) { }

  ngOnInit(): void {
    this.deviceId = this.dialogRef.id
    this.initializeChart()


  }


  close() {
    this.dialogRef.close();
  }

  initializeChart() {
    this.deviceTestService.getDeviceData(this.deviceId).subscribe((data: any) => {
      console.log(data);
      this.deviceInfo=data
      this.deviceData = this.deviceTestService.createTestChartData(data)
      console.log(this.deviceData);
      this.chart = new Chart('testChart', {
        type: 'line',
        data: {
          labels: this.deviceData.labels.slice(-12),
          datasets: [{
            label: 'Test Conducted',
            data: this.deviceData.testData.slice(-12),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            lineTension: 0
          }]
        
        },
        options:{
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false
          }
        }
      })



    })
  }

}
