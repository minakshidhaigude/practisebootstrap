import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private apiservice: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      fullname: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  signUp() {
    this.apiservice.postSignupUsers(this.signupForm.value).subscribe(
      (res) => {
        console.log(res, 'signupdata');
        alert('signup successfull');
        this.signupForm.reset();
        this.router.navigate(['login']);
      },
      (err) => {
        console.log('something went wrong');
      }
    );
  }
}
