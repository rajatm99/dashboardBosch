import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.dev';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceCountService {

  constructor(private http: HttpClient) { }
  getServiceData(){
    var url= environment.BASE_URL+environment.SERVICE.GET_SERVICE_COUNT
    return this.http.get(url)
  }
}
