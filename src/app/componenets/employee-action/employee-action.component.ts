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
  constructor(private route: ActivatedRoute, private location: Location, public employeeService: EmployeeService) { }


  ngOnInit() {
    const empID = this.route.snapshot.paramMap.get('empId');
    if (empID) {
      this.formMode = FormMode.Edit;
      this.btnText = 'Update';
      this.sub = this.employeeService.employees$.subscribe((response: Employee[]) => {
        this.EmployeeData = response.find(emp => emp.idNumber === empID) as Employee;
      });
      this.managerName = this.EmployeeData.manager?.name;
    }
    this.roleList = this.employeeService.getRoles();


  }

  updateEmployee(EmpDetails: any) {
    if (this.formMode == FormMode.Edit) {
      this.employeeService.editEmployee(EmpDetails);
    }
    else {
      this.employeeService.addEmployee(EmpDetails);
    }

    this.location.back();
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


