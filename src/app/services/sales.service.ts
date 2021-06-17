import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.dev'

@Injectable({
  providedIn: 'root'
})

export class SalesService {
  

  constructor(private http: HttpClient) { }

  getData(item){
    var url = "http://localhost:9000"+item
    return this.http.get(url)
  }
  
  getDeviceSalesData(){
    var url=environment.BASE_URL+environment.SALES.GET_DEVICE_SALES_DATA
    return this.http.get(url)
  }
  getDeviceInfo(deviceName){
    var url=environment.BASE_URL+environment.DEVICE.GET_SINGLE_DEVICE_INFO+'?device='+deviceName
    return this.http.get(url)
  }
  
}
