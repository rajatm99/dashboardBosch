import { Injectable } from '@angular/core';
import{HttpClient, HttpClientModule} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class KpiService {

  constructor(private http:HttpClient) { }
  getKpi(){
    return this.http.get('http://localhost:8000/kpi')
  }
}
