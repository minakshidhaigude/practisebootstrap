import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiservice: ApiService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  login() {
    this.apiservice.getLogin().subscribe(
      (res) => {
        const user = res.find((a: any) => {
          return (
            a.email === this.loginForm.value.email &&
            a.password === this.loginForm.value.password
          );
        });
        if (user) {
          // alert('login successful');
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'login successful',
            showConfirmButton: false,
            timer: 1500,
          });
          // this.toast.success({
          //   detail: 'Success Message',
          //   summary: res,
          //   duration: 5000,
          // });
          this.loginForm.reset();
          //this.router.navigate(['empdashboard']);
          this.router.navigate(['welcome']);
        } else {
          //alert('user not found');
          Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'user not found',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      },
      (err) => {
        // alert('something went wrong');
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      }
    );
  }
}
