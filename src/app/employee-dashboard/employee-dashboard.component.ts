import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './empmodel';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],
})
export class EmployeeDashboardComponent implements OnInit {
  showAdd!: boolean;
  showUpdate!: boolean;
  employeeData: any;
  formValue!: FormGroup;
  employeeModelObj: EmployeeModel = new EmployeeModel(); //for posting data
  //create an object of EmployeeModel
  constructor(private fb: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      salary: [''],
    });
    //on initial load showing employee details
    this.getEmployeeDetails();
  }
  clickAddEmployee() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postEmployeeDetails() {
    //all form data(value) appened to employeemodelobj
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;
    this.api.postEmployee(this.employeeModelObj).subscribe(
      (res) => {
        console.log('epmdetails', res);
        //alert('employee added successfully');
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'employee added successfully',
          showConfirmButton: false,
          timer: 1500,
        });
        //after succesfully adding data popup will close the  automatically
        let ref = document.getElementById('cancel');
        ref?.click();
        // reset the form
        this.formValue.reset();
        // recently posted data should be displayed for that puepose called getEmployeeDetails()
        //i.e no need to refresh the url
        this.getEmployeeDetails();
      },
      (err) => {
        console.log('something went wrong');
      }
    );
  }
  getEmployeeDetails() {
    this.api.getEmployee().subscribe((res) => {
      this.employeeData = res;
      console.log(this.employeeData, 'emp...');
    });
  }
  deleteEmployee(empdata: any) {
    // for deleting emp id will be coming from empdata(i.e inside empdata have id,fname,lname,...all properties)
    this.api.deleteEmployee(empdata.id).subscribe((res) => {
      //alert('Employee deleted');
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Employee deleted',
        showConfirmButton: false,
        timer: 1500,
      });
      //showing deleted data or  not need to refresh the page
      this.getEmployeeDetails();
    });
  }
  onEdit(empdata: any) {
    this.showAdd = false;
    this.showUpdate = true;
    //when click on edit that time id will be stored
    this.employeeModelObj.id = empdata.id;
    this.formValue.controls['firstName'].setValue(empdata.firstName);
    this.formValue.controls['lastName'].setValue(empdata.lastName);
    this.formValue.controls['email'].setValue(empdata.email);
    this.formValue.controls['mobile'].setValue(empdata.mobile);
    this.formValue.controls['salary'].setValue(empdata.salary);
  }
  updateEmployeeDetails() {
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;
    this.api
      .updateEmployee(this.employeeModelObj, this.employeeModelObj.id)
      .subscribe((res) => {
        //alert('updated successfully');
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'updated successfully',
          showConfirmButton: false,
          timer: 1500,
        });
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getEmployeeDetails();
      });
  }
}
