import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';


@Component({
  selector: 'app-addproductform',
  templateUrl: './addproductform.component.html',
  styleUrls: ['./addproductform.component.scss']
})
export class AddproductformComponent implements OnInit {

  constructor(private fb:FormBuilder ,private router:Router,private us:UserService) { }
  userForm:FormGroup
  errordata:string=''
errorstatus:boolean;
  image:File;
  
  ngOnInit(): void {
    // sending the productdetails to  user service
    
    this.userForm=this.fb.group({
      productname:'',
      productid:'',
      price:'',
      Date:'',
      profilepic:'',
    })
  }
  onFormsubmit(){
    // grt userobj from form
    let prodObj=this.userForm.value
    // create formdata Object
    let formData=new FormData();
    // append userobj to formData
    formData.append('prodObj', JSON.stringify(prodObj))
    // append profile pic to formdata
    formData.append('profilepic',this.image)

    // console.log(formData)
    console.log("doutbt data",prodObj)
    
    
    this.us.createProduct(formData).subscribe({
      next:(response)=>{
        console.log("main data",response)
        this.errorstatus=false;
        if(response.message=="productcreated"){
        // navigate to logn page
        this.router.navigateByUrl("/adminprofile/addproductform")}
        else{
          this.errorstatus=true
      this.errordata=response.message
      

        }
      },
      error:(err)=>{
      console.log('product error', err)
      }
    })
   
  }
  onFileSelect(event){
    // console.log(event.target.files[0])
    this.image=event.target.files[0]
  }

}
