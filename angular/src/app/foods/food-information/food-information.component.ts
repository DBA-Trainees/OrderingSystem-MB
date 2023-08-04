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
export class FoodListInformationComponent extends PagedListingComponentBase<FoodDto> implements OnInit{

  saving =false;
  id:number=1;
  orders: OrderDto[]=[];
  order= new OrderDto();
  orderCreate= new CreateOrderDto();
  foods: FoodDto[]=[];
  food= new FoodDto();
  keyword="";
  isActive:boolean|null;
  skipCount:number;
  maxResultCount:number;
  qty:number=1;
  availability:boolean|null;
  foodSize:string[];
  selectedSize:{[key:string]:string[]}={};
  date=new Date(); 
  foodSizes=[fsize.Small,fsize.Medium,fsize.Large];
  sizeSelected:string;

  @Output() onSave = new EventEmitter<any>();
  @Input() cancelLabel = this.l('Cancel');
  @Input() cancelDisabled: boolean;
  @Input() saveLabel = this.l('Add To Cart');
  @Input() saveDisabled: boolean;

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

ngOnInit(): void {
  this.getFoods();
}
getFoods(): void{
  this._foodService.getAllFoodWithCategoryAndFoodType(
    this.keyword,
    this.isActive,
    this.skipCount,
    this.maxResultCount)
    .subscribe((result) =>
    {
    this.foods = result.items;
    this.foodSizeDefault();
    this.foods.forEach((food)=>(this.qty=1));
  })
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
     
      this.showaddToCartDetailsComponent(id);
    }

    
  TimeAndDateFormat(TimeAndDate: Date): string {
    const currentTime = new Date();
    const difference = Math.round((currentTime.getTime() - new Date(TimeAndDate).getTime()) / 60000);
    if (difference < 1) {
      return 'just now';
    } else if (difference === 1) {
      return '1 min ago';
    } else {
      return `${difference} ago`;
    }
  }


    private showaddToCartDetailsComponent(id?: number): void{
      let addToCartDetails: BsModalRef;

        addToCartDetails = this._modalService.show(AddToCartDetailsComponent,{
          class: 'modal-lg',
          initialState: {
          id: id,
        },
        })
      }

    private foodSizeDefault():void{
      this.foods.forEach( food=> { if(food.size){
        var sizes=food.size.split(',').map((size)=>size.trim());
        food.size = sizes[0];
        this.selectedSize[food.id] = sizes;
      }
        
      });
    }

   Cart(selectedFood: FoodDto): void {
      this.saving = true;
      this.order.foodId = selectedFood.id;
      this.order.quantity = this.qty;
      this.order.dateTimeOrdered = moment.utc(this.date);
      this.order.size = selectedFood.size;

  
      if(this.id >0){
        this._orderService.update(this.order).subscribe(
          (res) => {
            this.notify.info(this.l("SavedSuccessfully"));
            this._modalRef.hide();
            this.onSave.emit(res);
    
            /* this.foods = this.foods.filter(food => food.id !== this.food.id); */
    
            this.router.navigate(["./app/customer/carts"]);
          },
        );
      }else{
        this._orderService.create(this.order).subscribe(
          (res) => {
            this.notify.info(this.l("SavedSuccessfully"));
            this._modalRef.hide();
            this.onSave.emit(res);
    
            this.foods = this.foods.filter(food => food.id !== this.food.id);
    
            this.router.navigate(["./app/customer/carts"]);
          },
        );
      }
    }
      protected delete(entity: FoodDto): void {
        throw new Error('Method not implemented.');
      }
 

}


