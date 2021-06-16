import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment.dev'
import { element } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class DevicetestService {

  constructor(private http: HttpClient) { }

  getTestData() {
    var url = environment.BASE_URL + environment.TEST_DATA.GET_TEST_DATA
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
    var url = environment.BASE_URL + environment.TEST_DATA.GET_TEST_DATA + "?customerId=" + id
    return this.http.get(url)
  }

  createDeviceChartData(customer) {
    var dataset = []


    customer[0].data.forEach(device => {

      var deviceId = device.id
      var deviceName = device.device
      var currentPackage = device.currentPackage
      var expiry = device.expiry
      var test = 0
      device.data.forEach(element => {


        test += element.testconducted
      });
      dataset.push({ deviceId: deviceId, deviceName: deviceName, testNum: test, currentPackage: currentPackage, expiry: expiry })

    });


    return dataset
  }
  getDeviceData(id) {
    var url = environment.BASE_URL + environment.TEST_DATA.GET_SINGLE_DEVICE_DATA + id
    return this.http.get(url)
  }
  createTestChartData(device) {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var labels = []
    var data = []
    device.data.forEach(yeardata => {
      var year = yeardata.year
      yeardata.test.forEach((element,index) => {
        data.push(element)
        labels.push(months[index]+year.slice(2,4))
        
      });
    });
    return {testData:data,labels:labels}
    
  }
}
