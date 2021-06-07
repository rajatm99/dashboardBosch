import { Component, OnInit } from '@angular/core';
import {KpiService}from '../../services/kpi.service'
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-kpi',
  templateUrl: './kpi.component.html',
  styleUrls: ['./kpi.component.css']
})
export class KpiComponent implements OnInit {
  public kpiObj:any
  
  constructor(private kpiService:KpiService) { }
  
  getKpi(){
    this.kpiService.getKpi().subscribe((data:any)=>{
      this.kpiObj=data
      console.log(this.kpiObj);
      
    })
  }
  ngOnInit(): void {
    this.getKpi()
  }

}
