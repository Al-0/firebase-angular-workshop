import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor() { }

  successAlert(title: string, text: string): Promise<any>{
    return Swal.fire({
      title: title,
      text: text,
      icon: "success",
    })
  }

  errorAlert(title: string, text: string): Promise<any>{
    return Swal.fire({
      icon: 'error',
      title: title,
      text: text
    })
  }
}
