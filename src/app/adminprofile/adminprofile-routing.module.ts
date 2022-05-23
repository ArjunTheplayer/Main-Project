import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddproductformComponent } from './addproductform/addproductform.component';
import { AddviewproductComponent } from './addviewproduct/addviewproduct.component';
import { AdminprofileComponent } from './adminprofile.component';

const routes: Routes = [{ path: '', component: AdminprofileComponent, },
{path:"addproductform",component:AddproductformComponent},
{path:"addviewproduct",component:AddviewproductComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminprofileRoutingModule { }
