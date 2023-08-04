import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CustomerDto, CustomerServiceProxy, FoodDto, FoodServiceProxy, OrderDto, OrderServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-create-or-edit-order',
  templateUrl: './create-or-edit-order.component.html',
  styleUrls: ['./create-or-edit-order.component.css']
})
export class CreateOrEditOrderComponent extends AppComponentBase implements OnInit  {

saving=false;

orders: OrderDto = new OrderDto();

customer: CustomerDto[]= [];
food: FoodDto[]=[];
id:number=0;
optCustomer:number=null;
optFoods:number=null;
date:DatePipe=new DatePipe('en-us');



@Output() onSave= new EventEmitter<any>();
constructor(
  injector:Injector,
  private _orderService:OrderServiceProxy,
  private _foodService:FoodServiceProxy,
  private _customerService:CustomerServiceProxy,
  public bsModalRef:BsModalRef
){
  super(injector)
}
  ngOnInit(): void {
    if(this.id){
      this._orderService.get(this.id).subscribe((res)=>{
        this.orders=res;
        this.optCustomer=res.customerId;
        this.optFoods=res.foodId
      });
    }

    this._customerService.getAllCustomer().subscribe((res)=>{
      this.customer=res;
    });

    this._foodService.getAllFoods().subscribe((res)=>{
      this.food=res;
      
    });
  }
  

  save():void{
    this.saving=true;
    this.orders.customerId=this.optCustomer;
    this.orders.foodId=this.optFoods;
  

    if(this.id!=0){
      this._orderService.update(this.orders).subscribe(
        ()=>{
          this.notify.info(this.l("Save Successfully"));
          this.onSave.emit();
        },
        ()=>{
          this.saving=false;
        }
      );
    }
    
  }


}