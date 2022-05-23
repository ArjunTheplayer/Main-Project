import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { CartService } from '../cart.service';
import { HttpinterceptorService } from '../httpinterceptor.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {
user: any;
allProducts:any;

  constructor(private au:AuthenticationService, private userservice:UserService,private cs:CartService, private router:Router) { }

  ngOnInit(): void {
    this.getProducts();
    this.user= this.au.currentUser
  //  this.allProducts=this.userservice.detailsFromAddProductForm
  //  console.log(this.allProducts)

  //  this.cardImage=this.userservice.imageservice
  // console.log(this.cardImage)
  

  }
  public getProducts(){
    this.userservice.getProduct().subscribe({
      next:(products)=>{
         console.log(products);
        // console.log("Products",products['payload']);
        this.allProducts=products['payload'];
        //console.log(this.allProducts[0].productName)
        console.log(this.allProducts)
      },
      error:(err)=>{
        console.log("err",err);
      }
    })
  }
  onbuttonclick(){
    this.userservice.getProtectedData().subscribe({
      next(response){
        alert(response.message)
      }
    })
  }
  public send(user,product){
    // console.log("cart data",user,product)
    let cartObj={

      username:user,

      products:[product]

    }
    console.log(cartObj);
    this.cs.createcart(cartObj).subscribe({
      next:(res)=>{
        console.log("cart object structure is created",res)
      },
      error:(err)=>{
        console.log("cart error",err)
      }
    })
     
  }
  viewcart(username){
       this.router.navigateByUrl(`/userprofile/viewcart/${username}`)
  }
}
