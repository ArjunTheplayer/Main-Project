import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
errordata:string=''
errorstatus:boolean;
  userForm:FormGroup

  image:File
  constructor(private fb:FormBuilder, private us:UserService,private router:Router) { }

  ngOnInit(): void {
    this.userForm=this.fb.group({
      username:'',
      password:'',
      email:'',
      city:'',
      profilepic:'',
    })
  }
  onFormsubmit(){
    // grt userobj from form
    let userObj=this.userForm.value
    // create formdata Object
    let formData=new FormData();
    // append userobj to formData
    formData.append('userObj', JSON.stringify(userObj))
    // append profile pic to formdata
    formData.append('profilepic',this.image)

    console.log(userObj)
    this.us.createUser(formData).subscribe({
      next:(response)=>{
        console.log(response)
        this.errorstatus=false;
        if(response.message=="User created"){
        // navigate to logn page
        this.router.navigateByUrl("/login")}
        else{
          this.errorstatus=true
      this.errordata=response.message
      

        }
      },
      error:(err)=>{
      
      }
    })
   
  }
 onFileSelect(event){
      console.log(event)
      console.log(event.target.files[0])
      this.image=event.target.files[0]
    }
}
