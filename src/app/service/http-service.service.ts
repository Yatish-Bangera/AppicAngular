import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { EmployeeResponseInterFace } from '../employee.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private http: HttpClient) {
  }
  public serverUrl = 'https://dummy.restapiexample.com/api/v1/employees';
  public getEmployeeData() {
    return this.http.get<EmployeeResponseInterFace>(this.serverUrl);
  }
}
