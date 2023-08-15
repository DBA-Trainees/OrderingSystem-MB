
  

import { Component, Injector, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedRequestDto } from '@shared/paged-listing-component-base';
import { CreateOrderDto, FoodDto, FoodDtoPagedResultDto, FoodServiceProxy, OrderDto, OrderServiceProxy,} from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { AppComponentBase } from '@shared/app-component-base';
import { AddToCartDetailsComponent } from './add-to-cart-details/add-to-cart-details.component';

enum fsize{
  Small='Small',
  Medium='Medium',
  Large='Large'
}

class PagedFoodRequestDto extends PagedRequestDto{
  keyword:string;
  isActive:boolean|null;
}

@Component({
  selector: 'app-food-information',
  templateUrl: './food-information.component.html',
  styleUrls: ['./food-info.css'],
  animations:[appModuleAnimation()]
})
export class FoodListInformationComponent extends AppComponentBase implements OnInit {

  saving =false;
  orders: OrderDto[]=[];
  orderCreate= new CreateOrderDto();
  foods: FoodDto[]=[];

  keyword='';
  isActive:boolean|null;
  foodSizes=[fsize.Small,fsize.Medium,fsize.Large];
  sizeSelected:string;
  date= new Date();
  //
  food= new FoodDto();
  skipCount: number;
  maxResultCount: number;
  foodQty: number = 1;
  id: number = 0;
  sizes: string[];
  availableSizesDict: { [key: number]: string[] } = {};
  availability:boolean|null;


  @Output() onSave = new EventEmitter<any>();

constructor(
  injector:Injector,
  private _foodService: FoodServiceProxy,  
  private _orderService:OrderServiceProxy,  
  private router:Router,
  //

  private _modalService: BsModalService,
  public bsModalRef: BsModalRef,
){
  super(injector)
}

ngOnInit(): void {
  this.getAllFoods();
  if (this.id) {
    this._orderService.get(this.id).subscribe((res) => {
      this.orderCreate.foodId = res.foodId;
 
    });
  }

}

getAllFoods(): void {
  this._foodService
    .getAllFoodWithCategoryAndFoodType(
      this.keyword,
      this.isActive,
      this.skipCount,
      this.maxResultCount
    )
    .subscribe((result) => {
      this.foods = result.items;
      this.setDefaultFoodSizes();
      this.foods.forEach((food) => (this.foodQty = 1));
     
    });
}

private setDefaultFoodSizes(): void {
  this.foods.forEach((food) => {
    if (food.size) {
      var sizeArray = food.size.split(",").map((size) => size.trim());
      food.size = sizeArray[0];
      this.availableSizesDict[food.id] = sizeArray;
    
    }
  });
}
 
    
    cartButton(availableFoods: FoodDto): void {
      this.orderCreate.foodId = availableFoods.id;
      this.orderCreate.quantity = this.foodQty;
      this.orderCreate.totalFoodAmount = availableFoods.price * this.foodQty;
      this.orderCreate.dateTimeOrdered =moment(this.date);
      this.orderCreate.size = availableFoods.size;
  
      this._orderService.create(this. orderCreate).subscribe((res) => {
        this.notify.info(this.l("SavedSuccessfully"));
        this.onSave.emit();

        this.router.navigate(["./app/customer-cart"]);
      });
    }
  
}



  


