import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { Location } from '@angular/common';
import { Role } from 'src/app/models/role';
import { RoleID } from 'src/app/models/RoleID';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-employee-action',
  templateUrl: './employee-action.component.html',
  styleUrls: ['./employee-action.component.scss']
})
export class EmployeeActionComponent {
  EmpID!: string;
  EmployeeData: Employee = {} as Employee;
  roleList!: Role[];
  managerList: any;
  sub!: Subscription;
  managerName: string | undefined;
  formMode: FormMode = FormMode.Add;
  mode!: FormMode;
  btnText: string = 'Add';
  Employees!: Employee[];
  currentEmployee!: Employee;
  idErrorMsg!: string | null
  constructor(private route: ActivatedRoute, private location: Location, public employeeService: EmployeeService) { }


  ngOnInit() {
    const empID = this.route.snapshot.paramMap.get('empId');
    if (empID) {
      this.formMode = FormMode.Edit;
      this.btnText = 'Update';
      if (localStorage.getItem('employeesData') != null) {
        this.Employees = JSON.parse(localStorage.getItem('employeesData') as string);
      }
      else {
        this.sub = this.employeeService.getData().subscribe((response: Employee[]) => {
          this.Employees = response;
        });
      }

      this.managerName = this.EmployeeData.manager?.name;
    }
    this.roleList = this.employeeService.getRoles();


  }

  checkId(): void {

    if (!this.checkValidId()) {
      this.idErrorMsg = 'Id number is not valid';
      return;
    }

    let user = this.getUser()
    if (!user) {
      this.idErrorMsg = 'user not found';
      return;
    }
    this.idErrorMsg = null;
    this.currentEmployee = user;

  }
  checkValidId(): boolean {
    {
      var id = this.currentEmployee.idNumber.trim();
      if (!id || id.length > 9 || id.length < 5) return false;

      // Pad string with zeros up to 9 digits
      id = id.length < 9 ? ("00000000" + id).slice(-9) : id;

      return Array
        .from(id, Number)
        .reduce((counter, digit, i) => {
          const step = digit * ((i % 2) + 1);
          return counter + (step > 9 ? step - 9 : step);
        }) % 10 === 0;

    }
  }
  getUser(): Employee | undefined {
    return this.Employees.find(emp => emp.idNumber === this.currentEmployee.idNumber);

  }

  updateEmployee(EmpDetails: any) {

      this.employeeService.editEmployee(EmpDetails);

  }

  Cancel() {
    this.location.back();
  }
  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }


}

enum FormMode {
  Add = 1,
  Edit = 2
}


