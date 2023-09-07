import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CustomerDto, CustomerServiceProxy, FoodDto, FoodServiceProxy, OrderDto, OrderServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-vendor-dashboard',
  templateUrl: './vendor-dashboard.component.html',
  styleUrls: ['./vendor-dashboard.component.css']
})
export class VendorDashboardComponent extends AppComponentBase implements OnInit  {

  saving=false;
  
  orders: OrderDto = new OrderDto();
  
  customer: CustomerDto[]= [];
  food: FoodDto[]=[];
  id:number;
  optCustomer:number=null;
  optFoods:number=null;
  date:DatePipe=new DatePipe('ph');
  
  
  
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
          this.optFoods=res.foodId
        });
      }
      this._foodService.getAllFoods().subscribe((res)=>{
        this.food=res;
        
      });
      this._customerService.getAllCustomer().subscribe((res)=>{
        this.customer=res;
      });
    }
    
  
    save():void{
      this.saving=true;
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
  