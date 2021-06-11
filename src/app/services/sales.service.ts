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

  
}
