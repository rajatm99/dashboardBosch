import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment.dev'

@Injectable({
  providedIn: 'root'
})
export class DevicetestService {

  constructor(private http: HttpClient) { }

  getTestData() {
    var url = environment.BASE_URL + environment.testdata.GET_TEST_DATA
    return this.http.get(url)
  }
  createChartData(data) {
    var dataset = []
    data.forEach(customer => {

      let devicecount = 0
      let testcount = 0
      customer.data.forEach(device => {
        devicecount += 1
        device.data.forEach(year => {
          testcount += year.testconducted
        });
      });

      dataset.push({ customerId: customer.customerId, customer: customer.customer, deviceNum: devicecount, testNum: testcount })
    });
    return dataset
  }

  getCustomerTestData(id) {
    var url = environment.BASE_URL + environment.testdata.GET_TEST_DATA + "?customerId=" + id
    return this.http.get(url)
  }

  createDeviceChartData(customer) {
    var dataset = []


    customer[0].data.forEach(device => {
      var deviceId = device.id
      var deviceName = device.device
      var test = 0
      device.data.forEach(element => {
        

        test += element.testconducted
      });
      dataset.push({ deviceId: deviceId, deviceName: deviceName, testNum: test })

    });
    console.log(dataset);
    
    return dataset
  }
}
