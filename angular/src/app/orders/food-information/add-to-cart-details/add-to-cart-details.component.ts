import {
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
  CreateOrderDto,
  CustomerDto,
  FoodDto,
  FoodServiceProxy,
  OrderDto,
  OrderServiceProxy,
  UserDto,
} from "@shared/service-proxies/service-proxies";
import * as moment from "moment";
import { BsModalRef } from "ngx-bootstrap/modal";

enum fsize{
  Small='Small',
  Medium='Medium',
  Large='Large'
}
@Component({
  selector: "food-details",
  templateUrl: "add-to-cart-details.component.html",
  styleUrls: ['./add-to-cart-details.component.css']

})
export class AddToCartDetailsComponent extends AppComponentBase implements OnInit {
  // foods: FoodDto[] = [];
   food = new FoodDto;
  //order: OrderDto = new OrderDto();
  orderDto : OrderDto[] = [];
  ordering =new CreateOrderDto();
  keyword = "";
  isActive: boolean | null;
  id: number;
  foodQty: number = 1;
  typeName: string;
  saving = false;
  today = new Date();
  foodSize=[fsize.Small,fsize.Medium,fsize.Large];
  sizeSelected: string;
  foodPrice : number;

  @Output() onSave = new EventEmitter<any>();
  @Input() formDisabled: boolean;

  constructor(
    injector: Injector,
    public bsModalRef: BsModalRef,
    private _foodService: FoodServiceProxy,
    private _orderService: OrderServiceProxy,
  ) {
    super(injector);
  }

  ngOnInit(): void {
  //  this.order.food = this.food;
    if (this.id) {
      this._foodService.get(this.id).subscribe((res) => {
        this.food = res;
        this.food.foodType = res.foodType;
        this.food.category = res.category;
        this.sizeSelected = res.size;
      });
    }   
  }

 formatDate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${("0" + (d.getMonth() + 1)).slice(-2)}-${("0" + d.getDate()).slice(-2)}`;
  };


  save(id? : number): void {
    this.saving = true;   
    this.ordering.foodId = this.food.id;
    this.ordering.quantity = this.foodQty;
    this.ordering.totalFoodAmount = this.foodQty * this.food.price;
    this.ordering.dateTimeOrdered = moment(this.today);
    this.ordering.size = this.sizeSelected;

    
    
      this._orderService.create(this.ordering).subscribe(
        () => {
          this.notify.info(this.l("SavedSuccessfully"));
          this.bsModalRef.hide();
          this.onSave.emit();
  
        },
        () => {
          this.saving = false;
        }
      );
  }
}