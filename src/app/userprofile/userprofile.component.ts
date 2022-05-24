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
cartCount:any
cartProduct:any


  constructor(private au:AuthenticationService, private userservice:UserService,private cs:CartService, private router:Router) { }

  ngOnInit(): void {
    this.getProducts();
    this.user= this.au.currentUser
   //cart count

   this.cs.viewCart(this.user?.username).subscribe({

    //update BahaviourSubject in UserService

    next:(res)=>{

      console.log("CP",res)

      let userObj=res['payload']
      if (res['payload']==null){
        this.cartCount=0;
      }
      else{

      this.cartProduct=userObj?.products;
      this.cs.updateCartCount(this.cartProduct.length)

      //get latest cartCount

        this.cs.cartCountObsrvable.subscribe(product=>{

        this.cartCount=product;
        

      })}

    },

    error:(error)=>{

      console.log(error)

      alert("there is no user name matching")

    }

  })
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
        //update count

        this.cs.updateCartCount(this.cs.getCurrentCartCount()+1)
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
