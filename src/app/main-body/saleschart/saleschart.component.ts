import { ThisReceiver } from '@angular/compiler';
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
  public chartData : any[]
  public chartLable : any[]
  packageList = []
  timeSet = "year"
  pack="packageA"
  week="week"
  month="month"
  year="year"
  packA = "packageA"
  packB = "packageB"
  packC = "packageC"
  items = []

  public setTime(time){
    this.timeSet=time
    if(this.timeSet=="year"){
      this.setYearlyChart()
    }else if(this.timeSet=="week"){
      this.setWeeklyChart()
    }else if(this.timeSet=="month"){
      this.setMonthlyChart()    
    }
  }

  public packageClick(packg){
    this.pack=packg
    if(this.timeSet=="year"){
      this.setYearlyChart()
    }else if(this.timeSet="month"){
      this.setMonthlyChart()
    }else if(this.timeSet="week"){
      this.setWeeklyChart()
    }
  }

  public setYearlyChart(){   
  
    this.saleService.getData("/saleinfo").subscribe(res => {
        var label = []
        var data = []
        console.log(res.valueOf)
        for(let key in res){              
              var temp = 0
              var x = res[key]
              this.items.push(res[key])              
              if(x.packageName == this.pack){
                for(var i in x.sale){
                  // console.log("in")
                  // console.log(x.sale[i])
                  label.push(x.sale[i].year)
                  for(var j in x.sale[i].data){
                    // console.log(j)
                    for(var k in x.sale[i].data[j]){
                      // console.log(x.sale[i].data[j][k])
                      temp+=x.sale[i].data[j][k]
                    }
                  }
                  data.push(temp)
                }
                break 
              }  
              // }else if(pack = "all"){
              //   for(var i in x.sale){          
              //     label.push(x.sale[i].year)
              //     for(var j in x.sale[i].data){          
              //       for(var k in x.sale[i].data[j]){    
              //         temp+=x.sale[i].data[j][k]
              //       }
              //     }
              //     data.push(temp)
              //   }
              // }
               
        }
        console.log(data)
        console.log(label)
        this.setChart(data,label)  
       
      }
    
    )
       
  }

  public setWeeklyChart(){
    this.saleService.getData("/saleinfo").subscribe(res => {
      var label = []
      var data = []
      var week=0
      console.log(res.valueOf)
      for(let key in res){              
            var temp = 0
            var x = res[key]
            this.items.push(res[key])              
            if(x.packageName == this.pack){
              for(var i in x.sale){
                // label.push(x.sale[i].year)
                for(var j in x.sale[i].data){
                  // console.log(j)
                  for(var k in x.sale[i].data[j]){
                    // console.log(x.sale[i].data[j][k])
                    data.push(x.sale[i].data[j][k])
                    label.push(week)
                    week++
                  }
                }
        
              }
              break 
            }  
            // }else if(pack = "all"){
            //   for(var i in x.sale){          
            //     label.push(x.sale[i].year)
            //     for(var j in x.sale[i].data){          
            //       for(var k in x.sale[i].data[j]){    
            //         temp+=x.sale[i].data[j][k]
            //       }
            //     }
            //     data.push(temp)
            //   }
            // }
             
      }
      console.log(data)
      console.log(label)
      this.setChart(data,label)  
     
    }
  
  )

  }

  public setMonthlyChart(){
    this.saleService.getData("/saleinfo").subscribe(res => {
      var label = []
      var data = []
      console.log(res.valueOf)
      for(let key in res){              
            var temp = 0
            var x = res[key]
            this.items.push(res[key])              
            if(x.packageName == this.pack){
              for(var i in x.sale){
                // console.log("in")
                // console.log(x.sale[i])
                
                for(var j in x.sale[i].data){
                  // console.log(j)
                  for(var k in x.sale[i].data[j]){
                    // console.log(x.sale[i].data[j][k])
                    temp+=x.sale[i].data[j][k]
                  }
                  data.push(temp)
                  temp=0
                  label.push(j)
                }          
              }
              break 
            }               
      }
      console.log(data)
      console.log(label)
      this.setChart(data,label)  
     
    }
  
  )
  }

  public setChart(data,label){
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
            data:data,
            borderColor:'blue',
            borderWidth:1,
            
          }],
          labels:label
        }
      })
    
  }

  public getPackageList(){
    this.saleService.getData("/package").subscribe(res =>{
      for(let key in res){
        console.log(res[key].name)
        this.packageList.push(res[key].name)
      }
    })

  }

 
ngOnInit(): void {

  this.saleService.getData("/device").subscribe(res => {console.log(res)})
  console.log("ONNUM VANNILLE??") 
  // this.setChart()
  this.getPackageList()
  console.log(this.packageList)
  this.setMonthlyChart()

  }

}
