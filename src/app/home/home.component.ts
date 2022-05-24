import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
count:any
  constructor(private cs:CartService) { }

  ngOnInit(): void {
    this.cs.cartCountObsrvable.subscribe(next=>{
      this.count=next;
    })
  }

}
