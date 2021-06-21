import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js'
import { SalesService } from 'src/app/services/sales.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-devicechart',
  templateUrl: './devicechart.component.html',
  styleUrls: ['./devicechart.component.css']
})
export class DevicechartComponent implements OnInit {

  // Chart is declared outside init
  public chart: any
  public chartData =[]
  public chartLabel = []




  constructor(
    public salesService: SalesService,
    public router:Router) { }

  ngOnInit(): void {

    this.intializeChart()



  }

  intializeChart() {
    this.salesService.getDeviceSalesData().subscribe((data: any) => {
      console.log("hi", data);
     
      data.forEach(element => {
        this.chartLabel.push(element.device)
        this.chartData.push(element.sale)
      });



      this.chart = new Chart('deviceChart', {
        
        type: 'doughnut',
        data: {
          datasets: [{
            type: 'doughnut',
            label: 'Number of Devices',
            backgroundColor: [
              '#004c6d',
              // '#006083',
              '#007599',
              // '#008bad',
              '#00a1c1',
              // '#00b8d3',
              '#00cfe3',
              // '#00e7f2',
              '#00ffff'
              

            ],
            data: this.chartData

          }],
          labels: this.chartLabel
        },
        options: {
          responsive: true,
          // maintainAspectRatio: false,
          //  ON CLICK EVENT
          onClick: this.chartClick.bind(this),
        }

      })

    })
  }
  // **********************************************
  //  This function is called when clicked on chart
  chartClick(event) {
    let activeEvent = this.chart.getElementAtEvent(event);

    // Index of the element
    var clickIndex = activeEvent[0]._index

    // Data and label of the clicked item
    var clickData = this.chartData[clickIndex]
    var clickLabel = this.chartLabel[clickIndex]
    console.log(clickLabel);
    this.router.navigate(['/devicedetails',clickLabel])


  }

  // ****************************************************


}
