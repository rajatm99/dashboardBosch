import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-device-customer',
  templateUrl: './device-customer.component.html',
  styleUrls: ['./device-customer.component.css']
})
export class DeviceCustomerComponent implements OnInit {
  public customerId;
  public deviceName:string

  constructor(private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.paramMap.get("id");
    console.log(this.route);
    
    
  }

}
