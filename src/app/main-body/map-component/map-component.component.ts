import { Component, Inject, OnInit , PLATFORM_ID, NgZone} from '@angular/core';
import {isPlatformBrowser} from '@angular/common'
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';


import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4themes_dataviz from "@amcharts/amcharts4/themes/dataviz";
import { title } from 'process';

import { SalesService } from '../../services/sales.service'
import {Router,ActivatedRoute} from '@angular/router'

/* Chart code */
// Themes begin
am4core.useTheme(am4themes_dataviz);
am4core.useTheme(am4themes_animated);
// Themes end

@Component({
  selector: 'app-map-component',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.css']
})

// MAP OBJECT 


export class MapComponentComponent {
  private chart: am4charts.XYChart;  

  x:any[]

  constructor(@Inject(PLATFORM_ID)  private platformId,
                                    private router : Router, 
                                    private zone: NgZone,
                                    private saleService: SalesService,
                                    private route : ActivatedRoute) {}

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }




setMap(mapDataArray : any[]){

  console.log("WORKINGGGGGG")
    this.browserOnly(() => {
      am4core.useTheme(am4themes_animated);

      let chart = am4core.create("chartdiv", am4maps.MapChart);

// Set map definition
chart.geodata = am4geodata_worldLow;

// Set projection
chart.projection = new am4maps.projections.Miller();

// Create map polygon series
let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

// Exclude Antartica
polygonSeries.exclude = ["AQ"];

// Make map load polygon (like country names) data from GeoJSON
polygonSeries.useGeodata = true;

// Configure series
let polygonTemplate = polygonSeries.mapPolygons.template;
polygonTemplate.tooltipText = "{name}";
polygonTemplate.polygon.fillOpacity = 0.6;


// Create hover state and set alternative fill color
// let hs = polygonTemplate.states.create("hover");
// hs.properties.fill = chart.colors.getIndex(0);

// Add image series
let imageSeries = chart.series.push(new am4maps.MapImageSeries());
imageSeries.mapImages.template.propertyFields.longitude = "longitude";
imageSeries.mapImages.template.propertyFields.latitude = "latitude";
imageSeries.mapImages.template.tooltipText = "{title}";
imageSeries.mapImages.template.propertyFields.url = "url";

let circle = imageSeries.mapImages.template.createChild(am4core.Circle);
circle.radius = 3;
circle.propertyFields.fill = "color";
circle.nonScaling = true;

let circle2 = imageSeries.mapImages.template.createChild(am4core.Circle);
circle2.radius = 3;
circle2.propertyFields.fill = "color";

class mapData {
  latitude: string;
  title: string;
  longitude: string;
  id: any;

  constructor(obj : any){
      this.latitude=obj.latitude
      this.title=obj.title
      this.longitude=obj.longitude
      this.id=obj.id
  }
}

// CLICK EVENT
imageSeries.mapImages.template.events.on("hit", (ev)=>{
  // console.log(ev.target.dataItem.dataContext)
  var dataMap = new mapData(ev.target.dataItem.dataContext);
  console.log(dataMap.title)
  var customerId =  dataMap.id
  this.router.navigate(['/customers',customerId])

  
  // alert(dataMap.id+" "+dataMap.title+" "+dataMap.latitude+" "+dataMap.longitude)

  // ****************************
  // ADD ROUTIMG TO CUSTOMER TABLE HERE
  // dataMap.id --> id of the customer
  // dataMap.title --> name of the customer

  





})



circle2.events.on("inited", function(event){
  animateBullet(event.target);
})


function animateBullet(circle) {
    let animation = circle.animate([{ property: "scale", from: 3 / chart.zoomLevel, to: 3 / chart.zoomLevel }, { property: "opacity", from: 1, to: 0 }], 1000, am4core.ease.circleOut);
    animation.events.on("animationended", function(event){
      animateBullet(event.target.object);
    })
}

let colorSet = new am4core.ColorSet();

// Lati and longi
// this.getMapData()





imageSeries.data=mapDataArray



});
  }

  ngAfterViewInit() {

    console.log("MAP COMPONENT")
    

    
    
    this.saleService.getData("/customers").subscribe(res =>{
      var mapData = []
      console.warn(res)

      for(let key in res){
        var x = res[key]
        var data = {}
        console.warn(x.latitude)
        data["title"]=x.name
        data["latitude"]=parseFloat(x.latitude)
        data["longitude"]=parseFloat(x.longitude)
        data["id"]=x.id
       
        // mapData.push({
        //   "latitude":x.latitude,
        //   "longitude":x.longitude,
        //   "title":x.name
        // })

        mapData.push(data)
    
      }
      console.log("WHY NOT?")
     
      this.setMap(mapData)

      
    })

    // Chart code goes in here
    


}}

