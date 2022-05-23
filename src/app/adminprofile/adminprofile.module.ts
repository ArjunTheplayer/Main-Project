import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminprofileRoutingModule } from './adminprofile-routing.module';
import { AdminprofileComponent } from './adminprofile.component';
import { AddproductformComponent } from './addproductform/addproductform.component';
import { AddviewproductComponent } from './addviewproduct/addviewproduct.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminprofileComponent,
    AddproductformComponent,
    AddviewproductComponent
  ],
  imports: [
    CommonModule,
    AdminprofileRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminprofileModule { }
