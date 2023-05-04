import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent {
  sub!: Subscription;
  employees!: Observable<Employee[]>;
  searchText!:string
  constructor(private activatedroute: ActivatedRoute, private router: Router, private employeeService: EmployeeService) {

  }

  ngOnInit() {
    this.sub = this.activatedroute.paramMap.subscribe((params) => {

      
        this.employees = this.employeeService.getEmployees();


      //this.product = products.find((p) => p.productID == this.id);
    });

    //You can also use this
    //this.sub=this._Activatedroute.params.subscribe(params => {
    //    this.id = params['id'];
    //    let products=this._productService.getProducts();
    //    this.product=products.find(p => p.productID==this.id);
    //});
  }

  editEmployee(empId:string){
    this.router.navigate(['employee-actions/' +empId]);
  }

  addEmployee(){
    this.router.navigate(['employee-actions/']);
  }

  deleteEmployee(empId:string){
    this.employees = this.employeeService.deleteEmployee(empId);
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }
}
