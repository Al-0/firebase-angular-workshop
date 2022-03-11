import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/interfaces/interfaces';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {

  employees: Employee[] = [];
  constructor(private employeeService: EmployeeService,
              private customAlert: AlertsService) {
   }

  ngOnInit(): void {
    this.getEmployee();
  }

  getEmployee(){
    this.employeeService.getEmployees().subscribe((data) =>{
      this.employees = [];
      data.forEach((dataEmployee: Employee) => {
        this.employees.push(dataEmployee);
      });
    })
  }

  deleteEmployee(idDocument: string){
    this.employeeService.deleteEmployee(idDocument).then(()=>{
      this.customAlert.successAlert('Deleted', 'This employee has been removed.');
    })
    .catch((error)=>{
      this.customAlert.errorAlert('Error', `An error ocurred ${error}`);
    })
  }
}
