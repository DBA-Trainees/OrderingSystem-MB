/*import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { Router } from "@angular/router";
import { AppComponentBase } from "@shared/app-component-base";
import {
  PagedRequestDto,
} from "@shared/paged-listing-component-base";
import {
  CategoriesDto,
  CategoriesServiceProxy,
  CreateOrderDto,
  CustomerDto,
  FoodDto,
  FoodServiceProxy,
  OrderDto,
  OrderServiceProxy,
  
  FoodTypeDto,
  FoodTypeServiceProxy,
  UserDto,
} from "@shared/service-proxies/service-proxies";
import * as moment from "moment";
import { BsModalRef } from "ngx-bootstrap/modal";
@Component({
  selector: 'app-add-to-cart-details',
  templateUrl: './add-to-cart-details.component.html',
  styleUrls: ['./add-to-cart-details.component.css']
})
export class AddToCartDetailsComponent extends AppComponentBase implements OnInit {
  foods: FoodDto[] = [];
  food: FoodDto = new FoodDto();
  order: OrderDto = new OrderDto();
  customer: CustomerDto = new CustomerDto();
  user: UserDto = new UserDto();
  keyword = "";
  isActive: boolean | null;
  id: number = 0;
  foodQty: number = 1;
  typeName: string;
  saving: boolean;
  today = new Date();
  selectedFoodSize: string;
  @Output() onSave = new EventEmitter<any>();
  @Input() formDisabled: boolean;

  constructor(
    injector: Injector,
    public bsModalRef: BsModalRef,
    private _foodService: FoodServiceProxy,
    private _orderService: OrderServiceProxy,
    private router: Router
  ) {
    super(injector);
  }

  ngOnInit(): void {
   this.order.food = this.food;
   this.order.user = this.user;
    if (this.id != 0) {
      this._foodService.get(this.id).subscribe((res) => {
        this.food = res;
        this.food.foodType = res.foodType;
        this.food.category = res.category;
        /* this.selectedFoodSize = res.size.split(','); 
      });
    }
    this.setDefaultFoodSize();
  }
  private setDefaultFoodSize(): void {
    if (this.food.size) {
      const sizeArray = this.food.size.split(',');
      this.selectedFoodSize = sizeArray[0].trim();
    }
  }

  formatDate(date) {
    var d = new Date(date);
    date = [
      d.getFullYear(),
      ("0" + (d.getMonth() + 1)).slice(-2),
      ("0" + d.getDate()).slice(-2),
    ].join("-");

    return date;
  }

  save(): void {
    this.saving = true;

    const orderDto = new OrderDto();   
    orderDto.foodId = this.food.id;
    orderDto.quantity = this.foodQty;
    orderDto.totalAmount = this.foodQty * this.food.price;
    orderDto.dateTimeOrdered = moment(this.today);
    orderDto.size = this.selectedFoodSize;

    this._orderService.update(orderDto).subscribe(
      (res) => {
        this.notify.info(this.l("SavedSuccessfully"));
        this.bsModalRef.hide();
        this.onSave.emit(res);

        this.router.navigate(["./app/customer/carts"]);
      },
      () => {
        this.saving = false;
      }
    );
  }

}
*/


import { Component, EventEmitter, Injector, Input, OnInit, Output} from '@angular/core';
import { AppComponentBase } from "@shared/app-component-base";
import { FoodDto,FoodServiceProxy,CategoriesDto,CategoriesServiceProxy,FoodTypeDto,FoodTypeServiceProxy, OrderDto, CustomerDto, CustomerServiceProxy, OrderServiceProxy } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';
import { BsModalRef } from "ngx-bootstrap/modal";
import { Router } from '@angular/router';
enum fsize{
  Small='Small',
  Medium='Medium',
  Large='Large'
}
@Component({
  selector: 'app-add-to-cart-detail',
  templateUrl: './add-to-cart-details.component.html',
})
export class AddToCartDetailsComponent extends AppComponentBase implements OnInit {
  saving= false;
  food= new FoodDto();
  foodType:FoodTypeDto[]=[];
  categories:CategoriesDto[]=[];
  order: OrderDto = new OrderDto();
  customer: CustomerDto = new CustomerDto();
  id: number= 0;
  availability: boolean= true;
  foodSize=[fsize.Small,fsize.Medium,fsize.Large];
  sizeSelected:string;
  fileName:string;
  fileType:string;
  base64String:any;
  foodQty: number = 1;
  DateAndTime= new Date();
  totalCharge:number;
  date= new Date();

  
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public bsModalRef: BsModalRef,
    private _foodService: FoodServiceProxy,
   private _categoryService: CategoriesServiceProxy,
   private _typeService: FoodTypeServiceProxy,
    private _customerService:CustomerServiceProxy,
    private _orderService:OrderServiceProxy,
    private router:Router


  ) {
    super(injector);
  }
  ngOnInit() {
    
    if (this.id) {
      this._foodService.get(this.id).subscribe((res) => {
        this.food = res;
        this.sizeSelected=res.size;
        this.totalCharge=res.price;
        
      
      });
    }

  }
  formatDate(date) {
    var d = new Date(date);
    date = [
      d.getFullYear(),
      ("0" + (d.getMonth() + 1)).slice(-2),
      ("0" + d.getDate()).slice(-2),
    ].join("-");

    return date;
  }
  
  
  createAvailable(event: any): void{
    this.food.availability = event.target.checked;
  }
 
  selectedImage(event: any): void{
    var files:File = event.target.files[0];
    var reader = new FileReader();
    reader.onload = (e: any) => {
      this. base64String = e.target.result.split(',')[1];
      this.food.image = this.base64String;
      this.food.imageName=this.fileName;
      this.food.imageFileType=this.fileType;
    };
    reader.readAsDataURL(files);
  }
  
  save(): void {
    this.saving = true;
   // this.food.categoryId = this.optCategories;
   // this.food.foodTypeId = this.optFoodType;
    
   var orderDto = new OrderDto();   
   orderDto.foodId = this.food.id;
   orderDto.quantity = this.foodQty;
   orderDto.dateTimeOrdered = moment(this.date);

   this._orderService.update(orderDto).subscribe(
     (res) => {
       this.notify.info(this.l("SavedSuccessfully"));
       this.bsModalRef.hide();
       this.onSave.emit(res);

       this.router.navigate(["./app/carts"]);
     },
     () => {
       this.saving = false;
     }
   );
  }
  }



