import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {environment}from '../../environments/environment.dev'

@Injectable({
  providedIn: 'root'
})
export class DevicetestService {

  constructor(private http:HttpClient) { }

  getTestData(){
    var url=environment.BASE_URL+environment.testdata.GET_TEST_DATA
    return this.http.get(url)
  }
  
}
