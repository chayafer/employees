import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseUrl = 'https://localhost:7280/';

  constructor(private http: HttpClient) { }

  getEmployees(roleId: string | null): Observable<Employee[]> {
    let url = `${this.baseUrl}api/Employees`;
    // if (roleId) {
    //   url += `/${roleId}`;
    // }
    this.http.get<Employee[]>(url).pipe(
      catchError(this.handleError)).subscribe(newValue => {
        this.employeesSubject.next(newValue);
      });;
    if (roleId) {
      return this.getfilteredEmployees(roleId);
    }
    return this.employees$;
  }
}
