import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/interfaces/interfaces';
import { AlertsService } from 'src/app/services/alerts.service';
import { EmployeeService } from 'src/app/services/employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  createEmployeeForm: FormGroup;
  submitted: boolean = false;
  idDocument: string | null;
  dynamicTitle: string = 'New Employee';
  dynamicButton: string = 'Create';

  constructor(private formBuilder: FormBuilder, 
              private employeeService: EmployeeService,
              private firestore: AngularFirestore,
              private router: Router,
              private customAlert: AlertsService,
              private activatedRoute: ActivatedRoute) { 
    this.createEmployeeForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      document: ['', Validators.required],
      salary: ['', Validators.required],
    });

    this.idDocument = activatedRoute.snapshot.paramMap.get('id');
  }
  
  ngOnInit(): void {
    this.getEmployeeData();
  }

  addEmployee(){
    this.submitted = true;
    if (this.createEmployeeForm.invalid){
      return;
    }

    let idDocument = this.firestore.createId();
    const employeeFormData: Employee = {
      idDocument: idDocument, 
      name: this.createEmployeeForm.value.name,
      lastname: this.createEmployeeForm.value.lastname,
      document: this.createEmployeeForm.value.document,
      salary: this.createEmployeeForm.value.salary,
      createdEmployee: new Date(),
      updatedEmployee: new Date()
    }

    this.employeeService.addEmployee(idDocument, employeeFormData).then(()=>{
      this.customAlert.successAlert('Sucess', 'User has been added.')
      .then(() => {
        this.router.navigate(["/"]);
      });
    })
    .catch((error) =>{
      this.customAlert.errorAlert(`Error`, `An error has ocurred: ${error}.`);
    })
  }

  getEmployeeData(){
    if (this.idDocument !== null){
      this.dynamicTitle = 'Edit Employee';
      this.dynamicButton = 'Edit';
      this.employeeService.getEmployeeEdit(this.idDocument).subscribe((data) =>{
        this.createEmployeeForm.setValue({
          name: data.payload.data()['name'],
          lastname: data.payload.data()['lastname'],
          document: data.payload.data()['document'],
          salary: data.payload.data()['salary'],
        })
      })
    }
  }

}
