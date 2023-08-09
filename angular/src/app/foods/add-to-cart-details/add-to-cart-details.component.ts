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
  foods: FoodDto[] = [];
  food: FoodDto = new FoodDto();
  order: OrderDto = new OrderDto();
  ordering =new CreateOrderDto();
  customer: CustomerDto = new CustomerDto();
  user: UserDto = new UserDto();
  keyword = "";
  isActive: boolean | null;
  id: number;
  foodQty: number = 1;
  typeName: string;
  saving: boolean;
  today = new Date();
  foodSize=[fsize.Small,fsize.Medium,fsize.Large];
  sizeSelected: string;

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
    if (this.id != 0) {
      this._foodService.get(this.id).subscribe((res) => {
        this.food = res;
        this.food.foodType = res.foodType;
        this.food.category = res.category;
        this.sizeSelected=res.size;
      });
    }
   
  }

 formatDate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${("0" + (d.getMonth() + 1)).slice(-2)}-${("0" + d.getDate()).slice(-2)}`;
  };

  grandTotalPrice(food: FoodDto): number {
    let updatedPrice = food.price;

    if (food.size == "Medium") {
      updatedPrice += 10;
    } else if (food.size == "Large") {
      updatedPrice += 15;
    }

    return updatedPrice * this.foodQty;
  }

  save(id? : number): void {
    this.saving = true;

    var orderDto = new OrderDto();   
    orderDto.foodId = this.food.id;
    // orderDto.foodId = foodIdNum;
    orderDto.quantity = this.foodQty;
    orderDto.price = this.foodQty * this.food.price;
    orderDto.dateTimeOrdered = moment(this.today);
    orderDto.size = this.sizeSelected;

    
    if(!id){
    this._orderService.update(orderDto).subscribe(
      () => {
        this.notify.info(this.l("SavedSuccessfully"));
        this.bsModalRef.hide();
        this.onSave.emit();

       // this.router.navigate(["./app/carts"]);
      }
    )
    } else{
      this._orderService.create(this.ordering).subscribe(
        () => {
          this.notify.info(this.l("SavedSuccessfully"));
          this.bsModalRef.hide();
          this.onSave.emit();
  
          this.foods = this.foods.filter(food => food.id !== this.food.id);
  
         // this.router.navigate(["./app/carts"]);
        }
      );
    }


  }
}