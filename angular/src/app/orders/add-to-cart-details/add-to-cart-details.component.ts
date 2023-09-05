import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateOrderDto, FoodDto, FoodServiceProxy, OrderDto, OrderServiceProxy } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';
import { BsModalRef } from 'ngx-bootstrap/modal';

enum fsize{
  Small='Small',
  Medium='Medium',
  Large='Large'
}
@Component({
  selector: 'app-add-to-cart-details',
  templateUrl: './add-to-cart-details.component.html',
  styleUrls: ['./add-to-cart-details.component.css']
})
export class AddToCartDetailsComponent extends AppComponentBase implements OnInit {
// foods: FoodDto[]=[];
food = new FoodDto;
order:OrderDto[]=[];
orders = new OrderDto;
saving=false;
id:number;
foodSizes=[fsize.Small,fsize.Medium,fsize.Large];
// sizeSelected:string;
//orderCreate= new CreateOrderDto();
date=new Date();
foodQty:number=1;
reminder:string;

@Output() onSave = new EventEmitter<any>();


constructor(
  injector:Injector,
  public bsModalRef:BsModalRef,
  private _foodService:FoodServiceProxy,
  private _orderService:OrderServiceProxy,
  private router:Router,
){
  super(injector)
}
ngOnInit(): void {
    if(this.id){
      this._foodService.get(this.id).subscribe((res)=>{
        this.food=res;
      });
    }
    // if (parseInt(sessionStorage.getItem('id'))) {
    //   this._foodService.get(parseInt(sessionStorage.getItem('id'))).subscribe((result) => {
    //     this.food = result;
    //   });
    // }
  
}

updateQuantity(newQuantity: number) {
  // Check if the new quantity is within the allowed range (e.g., minimum of 1)
  if (newQuantity >= 1) {
    this.foodQty = newQuantity;
  } 
}




cartButton(availableFoods: number): void {
  this.orders.foodId = availableFoods;
  this.orders.totalFoodAmount = this.food.price * this.foodQty;
  this.orders.dateTimeOrdered =moment();
  this.orders.size = this.food.size;
  this.orders.notes=this.reminder;
  this.orders.quantity = this.foodQty;
 


  

  this._orderService.create(this. orders).subscribe((res) => {
    this.notify.info(this.l("SavedSuccessfully"));
    this.onSave.emit();

    this.router.navigate(["./app/customer-cart"]);
  });
  
  
}




}
