import { Component, Injector, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { CreateOrderDto, FoodDto, FoodDtoPagedResultDto, FoodServiceProxy, OrderDto, OrderServiceProxy,} from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Moment } from 'moment';
import * as moment from 'moment';
import { AddToCartDetailsComponent } from '../add-to-cart-details/add-to-cart-details.component';
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
export class FoodListInformationComponent extends PagedListingComponentBase<FoodDto> {

  saving =false;
  id:number;
  orders: OrderDto[]=[];
  order= new OrderDto();
  orderCreate= new CreateOrderDto();
  foods: FoodDto[]=[];
  food= new FoodDto();
  keyword="";
  isActive:boolean|null;
  skipCount:number;
  maxResultCount:number;
  qty:number;
  availability:boolean|null;
  foodSize:string[];
  selectedSize:{[key:string]:string[]}={};
  date=new Date(); 
  foodSizes=[fsize.Small,fsize.Medium,fsize.Large];
  sizeSelected:string;
  public totalItems: number;

  @Output() onSave = new EventEmitter<any>();

constructor(
  private _foodService: FoodServiceProxy,
  private _modalService: BsModalService,
  private _orderService:OrderServiceProxy,
  public _modalRef: BsModalRef,
  injector:Injector,
 public router:Router
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
    addToCartDetails(id): void{
     
      this.showCustomerCartComponent(id);
    }

TimeAndDateFormat = (TimeAndDate: Date): string => {
    const currentTime = new Date();
    const difference = Math.round((currentTime.getTime() - new Date(TimeAndDate).getTime()) / 60000);
    return difference < 1 ? 'just now' : difference === 1 ? 'a minute ago' : `${difference} ago`;
  };
  

    private showCustomerCartComponent(id?: number): void{
      let addToCartDetails: BsModalRef;

        addToCartDetails = this._modalService.show(AddToCartDetailsComponent,{
          class: 'modal-lg',
          initialState: {
          id:id
        },
        })
      }

    price(food: FoodDto): number {
      let updatedPrice = food.price;
  
      if (food.size == "Medium") {
        updatedPrice += 10;
      } else if (food.size == "Large") {
        updatedPrice += 15;
      }
  
      return updatedPrice * this.qty;
    }

   Cart(selectedFood: FoodDto): void {
      this.saving = true;
      this.order.foodId = selectedFood.id;
      this.order.quantity = this.qty;
      this.order.dateTimeOrdered = moment.utc(this.date);
      this.order.size = selectedFood.size;

  
      if(this.id > 0){
        this._orderService.update(this.order).subscribe(
          () => {
            this.notify.info(this.l("SavedSuccessfully"));
            this._modalRef.hide();
            this.onSave.emit();
        
            this.router.navigate(["./app/carts"]);
          },
        );
      }else{
        this._orderService.create(this.orderCreate).subscribe(
          () => {
            this.notify.info(this.l("SavedSuccessfully"));
            this._modalRef.hide();
            this.onSave.emit();
    
          
    
           this.router.navigate(["./app/carts"]);
          },
        );
      }
    }
      protected delete(entity: FoodDto): void {
        throw new Error('Method not implemented.');
      }
 

}


