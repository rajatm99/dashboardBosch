import { Injectable } from '@angular/core';
import{HttpClient, HttpClientModule} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }
  getAllCustomer(){
     return this.http.get('http://localhost:8000/customers')
  }
}
