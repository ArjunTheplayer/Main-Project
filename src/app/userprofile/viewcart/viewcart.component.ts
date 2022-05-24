import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';
import { CartService } from 'src/app/cart.service';

@Component({
  selector: 'app-viewcart',
  templateUrl: './viewcart.component.html',
  styleUrls: ['./viewcart.component.scss']
})
export class ViewcartComponent implements OnInit {
user:any
cartProduct:any
  constructor(private au:AuthenticationService,private cs:CartService) { }

  ngOnInit(): void {
    this.user=this.au.currentUser
    console.log("cart user",this.user)
    this.viewcart(this.user.username)


  }
  private viewcart(username){
    this.cs.viewCart(username).subscribe({
      next:(response)=>{
        let cartObj=response['payload']
        //console.log(user)
        
        this.cartProduct=cartObj.products;
      },
      error:(err)=>{
        console.log("viewcart err",err)
      }
    })
  }

}
