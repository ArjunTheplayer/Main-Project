import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private hc:HttpClient) { }

  createcart(prodObj):Observable<any>{

    return this.hc.post("/cart/create-cart",prodObj)
  }
  viewCart(username):Observable<any[]>{
    // return this.hc.get<any[]>("/cart/view-cart")
    return this.hc.get<any[]>(`/cart/view-cart/${username}`)

  }
}
