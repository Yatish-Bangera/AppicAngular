import { Component, OnInit, Input } from '@angular/core';
import { HttpServiceService } from '../service/http-service.service';
import { FormBuilder } from '@angular/forms';
import { EmployeeResponseInterFace, AGE } from '../employee.interface'


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  @Input() employeeData;
  public dynamicKeys;
  public age: AGE[];
  public selectedAge: AGE;
  public searchForm;
  public searchNameFilter: string = '';
  public sortedObject: any;
  public dummyData;

  constructor(private httpService: HttpServiceService, private formBuilder: FormBuilder) {
    this.employeeData = [];
    this.dummyData = [];
    // this.dynamicKeys = [];
    this.searchForm = this.formBuilder.group({
      search: '',
    });
  }

  ngOnInit() {
    this.mapDynamicColoumnNames();
    this.AgeFilterDropDown();
    this.dummyData = this.employeeData;

  }
  // Function To get Dynamic keys for the table
  public mapDynamicColoumnNames() {
    console.log(this.employeeData);
    this.dynamicKeys = Object.keys(this.employeeData[0]);
  }

  // Function to get dynamic the range for Dropdown
  public AgeFilterDropDown() {
    const ids = this.employeeData.map(object => {
      return object.employee_age;
    });
    const max = Math.max(...ids);
    if (max > 60) {
      this.age = [
        { range: '', code: [] },
        { range: '0-20', code: [0, 20] },
        { range: '21-40', code: [21, 40] },
        { range: '41-60', code: [41, 60] },
        { range: '61-80', code: [61, 80] },
      ];
    }
    else {
      this.age = [
        { range: '', code: [] },
        { range: '0-20', code: [0, 20] },
        { range: '21-40', code: [21, 40] },
        { range: '41-60', code: [41, 60] },
      ];
    }
  }

  // Function to change the range of age from dropdown
  public onAgeChange(AgeCode) {
    this.filterAccordingToAge(AgeCode)
  }

  // Function to get the filtered results according to the range selected in dropdown
  public filterAccordingToAge(AgeCode) {
    // this.employeeData = this.dummyData
    this.employeeData = this.dummyData.filter((ageFilter) => {
      return ageFilter.employee_age >= AgeCode[0] && ageFilter.employee_age <= AgeCode[1]
    })
  }
  public salarySort(orderBy) {
    // this.employeeData = this.dummyData
    if (orderBy === 'desc') {
      this.employeeData = [...this.employeeData.sort(
        (e1, e2) =>
          (e2.employee_salary - e1.employee_salary)
      )];
      console.log(this.employeeData);

    }
    else {
      this.employeeData = [...this.employeeData.sort(
        (e1, e2) =>
          (e1.employee_salary - e2.employee_salary)
      )]
    }
  }
  public clear() {
    this.httpService.getEmployeeData().subscribe((res) => {
      this.employeeData = res
    })
  }
}
