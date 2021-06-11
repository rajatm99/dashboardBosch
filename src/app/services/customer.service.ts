import { Injectable } from '@angular/core';
import{HttpClient, HttpClientModule} from '@angular/common/http'
import {environment} from '../../environments/environment.dev'

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }
  getAllCustomer(){
     return this.http.get('http://localhost:8000/customers')
  }
  getcustomer(id){
    var url=environment.BASE_URL+environment.CUSTOMER.GET_CUSTOMER+id
    return this.http.get(url)
  }
}
