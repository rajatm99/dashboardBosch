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
  public chart : any
  packageList = []
  timeSet = "year"
  pack="All Package"
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
    console.warn(this.pack)
    if(this.timeSet=="year"){
      this.setYearlyChart()
    }else if(this.timeSet=="month"){
      this.setMonthlyChart()
    }else if(this.timeSet=="week"){
      this.setWeeklyChart()
    }
  }

  public setYearlyChart(){   
    var dict={}
  
    this.saleService.getData("/saleinfo").subscribe(res => {
        var label = []
        var data = []
        for(let key in res){              
              var temp = 0
              var x = res[key]
              this.items.push(res[key])     
              if(this.pack!="All Package"){                  
                if(x.packageName == this.pack){
                  for(var i in x.sale){       
                    label.push(x.sale[i].year)
                    for(var j in x.sale[i].data){
                      for(var k in x.sale[i].data[j]){       
                        temp+=x.sale[i].data[j][k]
                      }
                    }   
                    if(!dict[x.sale[i].year]){               
                      dict[x.sale[i].year]=temp
                    }else{
                      dict[x.sale[i].year]+=temp
                    }
                    temp=0
                  }
                  break 
                }  
              }else if(this.pack=="All Package"){ 
                  for(var i in x.sale){          
                    label.push(x.sale[i].year)
                    for(var j in x.sale[i].data){          
                      for(var k in x.sale[i].data[j]){    
                        temp+=x.sale[i].data[j][k]
                      }
                    }
                    if(!dict[x.sale[i].year]){               
                      dict[x.sale[i].year]=temp
                    }else{
                      dict[x.sale[i].year]+=temp
                    }
                    temp=0
                  }  
                        

              }      
               
        }
        label=Object.keys(dict)
        data=Object.values(dict)    
        this.setChart(data,label)  
       
      }
    
    )
       
  }

  public setWeeklyChart(){
    var dict={}
    this.saleService.getData("/saleinfo").subscribe(res => {
      var label = []
      var data = []
      var week=0
      // console.log(res.valueOf)
      for(let key in res){              
            var temp = 0
            var x = res[key]
            this.items.push(res[key])     
            if(this.pack!="All Package"){         
              if(x.packageName == this.pack){
                for(var i in x.sale){
                  // label.push(x.sale[i].year)
                  for(var j in x.sale[i].data){
                    // console.log(j)
                    for(var k in x.sale[i].data[j]){
                      // console.log(x.sale[i].data[j][k])
                      temp=x.sale[i].data[j][k]                
                      if(!dict[x.sale[i].year]){               
                        dict[x.sale[i].year+week]=temp
                      }else{
                        dict[x.sale[i].year+week]+=temp
                      }
                      temp=0
                      week++
                    }
                  
                  }
          
                }
                break 
              }  
            }else if(this.pack=="All Package"){
              for(var i in x.sale){        
                for(var j in x.sale[i].data){
                  for(var k in x.sale[i].data[j]){       
                    temp=x.sale[i].data[j][k]                
                    if(!dict[x.sale[i].year]){               
                      dict[x.sale[i].year+week]=temp
                    }else{
                      dict[x.sale[i].year+week]+=temp
                    }
                    temp=0
                    week++
                  }
                
                }
        
              }

            } 
            week=0 
             
      }
      console.log(dict)
      label=Object.keys(dict)
      data=Object.values(dict)   
      this.setChart(data,label)  
     
    }
  
  )

  }

  public setMonthlyChart(){
    var dict = {}
    this.saleService.getData("/saleinfo").subscribe(res => {
      var label = []
      var data = []
      // console.log(res.valueOf)
      for(let key in res){              
            var temp = 0
            var x = res[key]
            this.items.push(res[key])   
            if(this.pack!="All Package"){           
              if(x.packageName == this.pack){
                for(var i in x.sale){

                  for(var j in x.sale[i].data){
 
                    for(var k in x.sale[i].data[j]){

                      temp+=x.sale[i].data[j][k]
                    }

                    if(!dict[x.sale[i].year+j]){               
                      dict[x.sale[i].year+j]=temp
                    }else{
                      dict[x.sale[i].year+j]+=temp
                    }
                    temp=0
                  }          
                }
                break 
              }
            }else if(this.pack=="All Package"){
              for(var i in x.sale){
                for(var j in x.sale[i].data){
                  for(var k in x.sale[i].data[j]){
                    temp+=x.sale[i].data[j][k]
                  }
                  if(!dict[x.sale[i].year+j]){               
                    dict[x.sale[i].year+j]=temp
                  }else{
                    dict[x.sale[i].year+j]+=temp
                  }
                  temp=0
                }          
              }

            }               
      }
      label=Object.keys(dict)
      data=Object.values(dict)    
      this.setChart(data,label)
     
    }
  
  )
  }

  public setChart(data,label){
    if(this.chart){
      this.chart.destroy()
    }
      this.chart = new Chart('salesChart', {
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
        // console.log(res[key].name)
        this.packageList.push(res[key].name)
      }
    })

  }

 
ngOnInit(): void {

  // this.saleService.getData("/device").subscribe(res => {console.log(res)})
  // console.log("ONNUM VANNILLE??") 
  // this.setChart()
  this.getPackageList()
  // console.log(this.packageList)
  this.setYearlyChart()

  }

}
