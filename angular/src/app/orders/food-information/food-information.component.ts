
  

import { Component, Injector, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedRequestDto } from '@shared/paged-listing-component-base';
import { CategoriesDto, CreateOrderDto, FoodDto, FoodDtoPagedResultDto, FoodServiceProxy, OrderDto, OrderDtoPagedResultDto, OrderServiceProxy,} from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import * as moment from 'moment-timezone';
import { DatePipe } from '@angular/common';
import { AddToCartDetailsComponent } from '../add-to-cart-details/add-to-cart-details.component';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize, timer } from 'rxjs';

enum fsize{
  Small='Small',
  Medium='Medium',
  Large='Large'
}
class PagedOrderResultRequestDto extends PagedRequestDto{
  keyword: string;
  isActive: boolean;
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
  order=new OrderDto;
  foods: FoodDto[]=[];
  keyword='';
  isActive:boolean|null;
  foodSizes=[fsize.Small,fsize.Medium,fsize.Large];
  sizeSelected:string;
  dateandtime=new Date();
  food= new FoodDto();
  skipCount: number;
  maxResultCount: number;
  foodQty: number = 1;
  id: number = 0;
  sizes: string[];
  availability:boolean|null;
  optCategories: number = null;
 
  @Output() onSave = new EventEmitter<any>();
  refresh: any;

  constructor(
  injector:Injector,
  private _foodService: FoodServiceProxy,  
  private _orderService:OrderServiceProxy,  
  private router:Router,
  public bsModalRef: BsModalRef,
  private _modalService: BsModalService,

){
  super(injector)
}

ngOnInit(): void {
  this.getAllFoods();
  if (this.id) {
    this._orderService.get(this.id).subscribe((res) => {
      this.order.foodId = res.foodId;
      this.food.category = res.food.category;
      
    });
  }

}

foodDetails(food:FoodDto): void{
  this.viewCartDetails(food.id)
}

getAllFoods(): void {
  this._foodService
    .getAllFoodWithCategoryAndFoodType(
      this.keyword,
      this.isActive,
      this.skipCount,
      this.maxResultCount
    )
    .subscribe((res) => {
      this.foods = res.items;

    });
}

    cartButton(availableFoods: FoodDto): void { 
      
      this.order.foodId = availableFoods.id;
      this.order.quantity = this.foodQty;
      this.order.totalFoodAmount = availableFoods.price * this.foodQty;
      this.order.dateTimeOrdered=moment(this.dateandtime)
      this.order.size = availableFoods.size;
      this.food.categoryId=this.optCategories;
  
      this._orderService.createOrUpdate(this. order).subscribe((res) => {
        this.notify.info(this.l("SavedSuccessfully"));
        this.onSave.emit();
   

        this.router.navigate(["./app/customer-cart"]);
      });
      
    }
    
    private viewCartDetails(id:number):void{
      let cartDetails:BsModalRef;
      cartDetails= this._modalService.show(AddToCartDetailsComponent,{
        class: "modal-lg",
        initialState:{
          id:id,
        }
      })
    }

    


  
}



  


