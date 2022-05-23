import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userLoginStatus:boolean=false
  currentUser;

  constructor(private hc: HttpClient) { }
  loginuser(credobj):Observable<any>{
    return this.hc.post('/user/login-user',credobj)
  }
  logoutUser(){
    localStorage.removeItem("token");
    this.userLoginStatus=false;
  }
  loginAdmin(admincredobj):Observable<any>{
    return this.hc.post('/admin/login',admincredobj)

  }
}
