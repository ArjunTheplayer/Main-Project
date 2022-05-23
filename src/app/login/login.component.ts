import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  errordata: string = '';
  errorstatus: boolean;

  userForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private au: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: [],
      password: [],
      radio: [],
    });
  }

  onFormsubmit() {
    console.log(this.userForm.value);

    // if radio is user
    if (this.userForm.value.radio == 'user') {
      this.au.loginuser(this.userForm.value).subscribe({
        next: (response) => {
          console.log('res is ', response);
          if (response.message == 'success') {
            this.errorstatus = false;
            // get tokene from res object
            let token = response.token;
            // store itin browser storage
            localStorage.setItem('token', token);
            // update login status
            this.au.userLoginStatus = true;
            // to get loged in user info
            this.au.currentUser = response.user;
            // navigate to specific dashboard
            this.router.navigateByUrl(`/userprofile/${response.user.username}`);
          } else {
            this.errorstatus = true;
            this.errordata = response.message;
          }
        },
        error: (err) => {
          console.log(err);
          alert(err.message);
          console.log('error details', err);
        },
      });
    }
    // if radio is admin
    if (this.userForm.value.radio == 'admin') {
      this.au.loginAdmin(this.userForm.value).subscribe({
        next: (response) => {
          
          if (response.message == 'success') {
            
            // get tokene from res object
            let token = response.token;
            // store itin browser storage
            localStorage.setItem('token', token);
            // update login status
            this.au.userLoginStatus = true;
            // navigate to specific dashboard
            this.router.navigateByUrl('/adminprofile');
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  // getters
  get username() {
    return this.userForm.get('username');
  }
  get check() {
    return this.userForm.get('password');
  }
}
