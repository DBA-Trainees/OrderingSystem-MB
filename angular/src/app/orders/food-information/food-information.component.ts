import { Component, Injector, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { CreateOrderDto, FoodDto, FoodDtoPagedResultDto, FoodServiceProxy, OrderDto, OrderServiceProxy,} from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Moment } from 'moment';
import * as moment from 'moment';
import { AddToCartDetailsComponent } from './add-to-cart-details/add-to-cart-details.component';
import { CustomerCartComponent } from '@app/customer-cart/customer-cart.component';

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
export class FoodListInformationComponent extends PagedListingComponentBase<OrderDto> {

  saving =false;
  orders: OrderDto[]=[];
  orderCreate= new CreateOrderDto();
  foods: FoodDto[]=[];
  keyword='';
  isActive:boolean|null;

  // id:number;
  //orders: OrderDto[]=[];
  // orderCreate= new CreateOrderDto();  
  //order= new OrderDto();  
  // food= new FoodDto;  
  // qty:number;
  // availability:boolean|null;
  // foodSize:string[];
  // selectedSize:{[key:string]:string[]}={};
  // date=new Date(); 
  // foodSizes=[fsize.Small,fsize.Medium,fsize.Large];
  // sizeSelected:string;

  @Output() onSave = new EventEmitter<any>();

constructor(
  injector:Injector,
  private _foodService: FoodServiceProxy,  
  private _orderService:OrderServiceProxy,  
  private router:Router
){
  super(injector)
}

  protected list(request: PagedFoodRequestDto, pageNumber: number, finishedCallback: Function): void {
    request.keyword = this.keyword;
    request.isActive = this.isActive;

    this._foodService
      .getAllFoodWithCategoryAndFoodType(
        request.keyword,
        request.isActive,
        request.skipCount,
        request.maxResultCount
      )
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: FoodDtoPagedResultDto) => {
        this.foods = result.items;
        this.showPaging(result, pageNumber);

      });    
    }
    
    protected delete(order: OrderDto): void {
      abp.message.confirm(
        this.l("OrdernDeleteWarningMessage", order.foodId),
        undefined,
        (result: boolean) => {
          if (result) {
            this._orderService.delete(order.id).subscribe(() => {
              abp.notify.success(this.l("SuccessfullyDeleted"));
              this.refresh();
            });
          }
        }
      );
    }

    showModalDetails(foodId : number) : void {
      this.saving= true;
      this.orderCreate.foodId = foodId;

      this._orderService.create(this.orderCreate).subscribe(()=> {
        this.notify.info(this.l('Saved Successfully'));
        this.onSave.emit();
        this.router.navigate(["./app/customer-cart"]);
       })
     
     }
    
  
}


// TimeAndDateFormat = (TimeAndDate: Date): string => {
//     var currentTime = new Date();
//     var difference = Math.round((currentTime.getTime() - new Date(TimeAndDate).getTime()) / 60000);
//     return difference < 1 ? 'just now' : difference === 1 ? 'a minute ago' : `${difference} ago`;
//   };
  
  


