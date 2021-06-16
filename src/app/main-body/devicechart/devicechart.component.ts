import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js'
@Component({
  selector: 'app-devicechart',
  templateUrl: './devicechart.component.html',
  styleUrls: ['./devicechart.component.css']
})
export class DevicechartComponent implements OnInit {

  // Chart is declared outside init
  public chart : any
  public chartData = [10,20,30,40]
  public chartLabel = ['A','B','C','D']
  
// **********************************************
//  This function is called when clicked on chart
  chartClick(event){
    let activeEvent = this.chart.getElementAtEvent(event);

    // Index of the element
    var clickIndex = activeEvent[0]._index
    
    // Data and label of the clicked item
    var clickData = this.chartData[clickIndex]
    var clickLabel = this.chartLabel[clickIndex]

    // 
    console.warn(clickIndex)
    console.warn(clickData)
    console.warn(clickLabel)
    
}

// ****************************************************


  constructor() { }

  ngOnInit(): void {
    this.chart= new Chart('deviceChart',{
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
            data :this.chartData,
            
          
        }],
        labels:this.chartLabel
    },
   options:{
    //  ON CLICK EVENT
     onClick: this.chartClick.bind(this),
   }
   
  })  
  
}





}
