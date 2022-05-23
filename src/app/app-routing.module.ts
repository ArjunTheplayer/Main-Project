import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddproductformComponent } from './adminprofile/addproductform/addproductform.component';
import { AddviewproductComponent } from './adminprofile/addviewproduct/addviewproduct.component';
import { ContactusComponent } from './contactus/contactus.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ViewcartComponent } from './userprofile/viewcart/viewcart.component';

const routes: Routes = [
  {path:"home",component:HomeComponent},
  {path:"contactus",component:ContactusComponent},
  {path:"login",component:LoginComponent},
  {path:"signup",component:SignupComponent},
  {path:"",redirectTo:"home",pathMatch:"full"},
  { path: 'userprofile/:username', loadChildren: () => import('./userprofile/userprofile.module').then(m => m.UserprofileModule) },
  { path: 'adminprofile', loadChildren: () => import('./adminprofile/adminprofile.module').then(m => m.AdminprofileModule)},
  {path: 'userprofile/viewcart/:username', component:ViewcartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
