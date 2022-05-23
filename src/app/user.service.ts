import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {



  //  storing the appproduct data so that it can be acceesed by other components 


  constructor(private hc:HttpClient) { }
  createUser(userobj):Observable<any>{

    return this.hc.post("/user/create-user",userobj)
  }
  createProduct(prodobj):Observable<any>{

    return this.hc.post("/admin/create-product",prodobj)
  }
  // make request to protect route
  getProtectedData():Observable<any>{
    return this.hc.get("/user/get-protected-data")
  }
  // get product data
  getProduct():Observable<any[]>{
    return this.hc.get<any[]>("/admin/view-products");
  }
}
