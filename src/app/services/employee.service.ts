import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { Employee } from '../models/employee';
import { Role } from '../models/role';
import { RoleID } from '../models/RoleID';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  EmployeeData!: Observable<Employee[]>;

  baseUrl = 'https://localhost:7280/api/';

  private employeesSubject = new BehaviorSubject<Employee[]>([]);

  employees$ = this.employeesSubject.asObservable();

  isDataCalculated!: boolean;

  constructor(private http: HttpClient) { }

  getData(){
    if(!this.isDataCalculated){
      this.getEmployees();
      this.isDataCalculated=true;
    }
    return this.employees$;
  }

  getEmployees(): Observable<Employee[]> {
    let api = 'Employees';

    this.http.get<Employee[]>(`${this.baseUrl}${api}`).pipe().subscribe(newValue => {
        this.employeesSubject.next(newValue);
        localStorage.setItem('employeesData',JSON.stringify(newValue));
      });;

    return this.employees$;
  }

  getfilteredEmployees(roleId: string): Observable<Employee[]> {
    if (roleId == "2" || roleId == "3") {
      return this.getManagers();
    }

    let roleCode = roleId == "4" ? 876 : 5543;
    return this.employees$.pipe(map(projects => projects.filter(proj => proj.role?.code === roleCode)));
  }

  getManagers(): Observable<Employee[]> {
    return this.employees$.pipe(map(projects => projects.filter(proj => proj.role?.code === 6642 || proj.role?.code === 322)));
  }

  getRoles(): Role[] {
    return [{ id: 1, name: "Employee", code: 5543 },
    { id: 2, name: "Manager", code: 664 },
    { id: 3, name: "Senior Manager", code: 322 },
    { id: 4, name: "OS Employee", code: 876 }]
  }

  editEmployee(EmpDetails: Employee) {
    let api = `${this.baseUrl}Employees`;


    return this.http.put<Employee[]>(api, { EmpDetails }).pipe(
      catchError(this.handleError)).subscribe(newValue => {
        this.employeesSubject.next(newValue);
      });
  }

  addEmployee(EmpDetails: Employee): void {
    let api = `${this.baseUrl}Employees`;

    this.http.post<Employee[]>(api, { EmpDetails }).pipe(
      catchError(this.handleError)).subscribe(newValue => {
        this.employeesSubject.next(newValue);
      });
  }

  deleteEmployee(empId: string): Observable<Employee[]> {
    let api = `${this.baseUrl}Employees/${empId}`;
    this.http.delete<Employee[]>(api).pipe(
      catchError(this.handleError)).subscribe(newValue => {
        this.employeesSubject.next(newValue);
      });
      return this.employees$;
  }

  handleError(error: any): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
