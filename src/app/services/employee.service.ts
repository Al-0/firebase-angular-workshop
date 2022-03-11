import { query } from '@angular/animations';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Employee } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private firestore: AngularFirestore) { }

  getEmployees(): Observable<any>{
    return this.firestore.collection('employee', query => query.orderBy('createdEmployee', 'asc')).valueChanges();
  }

  addEmployee(idDocument: string, employeeData: Employee): Promise<any>{
    return this.firestore.collection('employee').doc(idDocument).set(employeeData);
  }

  deleteEmployee(idDocument: string): Promise <any>{
    return this.firestore.collection('employee').doc(idDocument).delete();
  }

  getEmployeeEdit(idDocument: string): Observable<any>{
    return this.firestore.collection('employee').doc(idDocument).snapshotChanges();
  }

  updateEmployee(idDocument: string, employeeData: Employee): Promise<any>{
    return this.firestore.collection('employee').doc(idDocument).update(employeeData);
  }
}
