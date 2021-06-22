import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js'
import * as moment from 'moment';
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
  timeSet = "week"
  pack="All Package"
  week="week"
  month="month"
  year="year"
  packA = "packageA"
  packB = "packageB"
  packC = "packageC"
  items = []
  timeUpper=0
  timeLower=0

  public months=moment.monthsShort()

  public timeSpanLess(){
    console.log("TIME SPAN LESS")

    if(this.timeSet=="week"){ // show 7 weeks
        this.timeUpper=Math.max(this.timeUpper-7,6)
        this.timeLower=Math.max(this.timeLower-7,0)
        if(this.timeLower==0){
          console.warn("DISABLE BUTTON")
        }
        this.setChart()       
        
    }

    
  }

  public timeSpanMore(){
    if(this.timeSet=="week"){ // show 7 weeks
        this.timeUpper=Math.min(this.timeUpper+7,(this.chartData.length-1))
        this.timeLower=Math.min(this.timeLower+7,(this.chartData.length-8))
        if(this.timeLower==0){
          console.warn("DISABLE BUTTON")
        }
        this.setChart()
    }
  }

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
        this.timeUpper=data.length
        this.timeLower=Math.max(data.length-4,0)   
        this.chartData=data
        this.chartLable=label
        this.setChart()  
       
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
                      if(parseInt(k)==0){
                        label.push(this.months[parseInt(j)]+" - "+x.sale[i].year)
                      }else{
                        label.push("")
                      }             
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
                    if(parseInt(k)==0){
                      label.push(this.months[parseInt(j)]+" - "+x.sale[i].year)
                    }else{
                      label.push("")
                    }             
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
      
      // label=Object.keys(dict)
      data=Object.values(dict)   
      this.timeUpper=data.length-1
      this.timeLower=Math.max(data.length-8,0)
      this.chartData=data
      console.warn(this.chartData)
      
      this.chartLable=label
      console.warn(data.length)
      console.warn(label.length)
      this.setChart() 
     
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
                   
                    label.push(this.months[parseInt(j)]+" - "+x.sale[i].year)
                   

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
                
                    label.push(this.months[parseInt(j)]+" - "+x.sale[i].year)
               
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
      

      data=Object.values(dict)    
      this.timeUpper=data.length
      this.timeLower=Math.max(data.length-4,0)
      this.chartData=data
      this.chartLable=label
      this.setChart()
     
    }
  
  )
  }

  public setChart(){
    var data : Array<any>
    var label : Array<any>
    data=this.chartData
    label=this.chartLable
    data=data.slice(this.timeLower,this.timeUpper)
    label=label.slice(this.timeLower,this.timeUpper)
    console.log("SET CHART")
    console.log(data)
    if(this.chart){
      this.chart.destroy()
    }
      this.chart = new Chart('salesChart', {
      type: 'line',
        options:{
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false
         },
         title: {
          display: false,
          text: 'Customer and Sales'
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
  this.setWeeklyChart()

  }

}
