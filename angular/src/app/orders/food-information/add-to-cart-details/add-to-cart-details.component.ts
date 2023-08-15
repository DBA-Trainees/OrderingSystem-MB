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
  FoodDto,
  FoodServiceProxy,
  OrderDto,
  OrderServiceProxy,
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
   food = new FoodDto;
  orderDto : OrderDto[] = [];
  order= new OrderDto();
  ordering =new CreateOrderDto();
  keyword = "";
  isActive: boolean | null;
  id: number;
  foodQty: number = 1;
  foodName: string;
  saving = false;
  today = new Date();
  foodSize=[fsize.Small,fsize.Medium,fsize.Large];
  sizeSelected: string;
  foodPrice : number;
  foodNotes:string;

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
    if (this.id) {
      this._orderService.get(this.id).subscribe((res) => {
        this.order = res;
        this.sizeSelected = res.size;
        this.order.foodId=res.foodId;
        this.foodNotes=res.notes;
      });
    }   
  }


  save(order:OrderDto): void {
    this.saving = true;   
    this.ordering.foodId = this.food.id;
    this.ordering.quantity = this.foodQty;
    this.ordering.totalFoodAmount = this.foodQty * this.food.price;
    this.ordering.dateTimeOrdered = moment(this.today);
    this.ordering.size = this.sizeSelected;
    this.food.quantity=this.foodQty;
    this.ordering.notes=this.foodNotes;
   
    

    
    if (this.id!=0){
      this._orderService.update(this.order).subscribe(
        () => {
          this.notify.info(this.l(this.food.name+" "+ 'Saved Successfully'));
          this.bsModalRef.hide();
          this.onSave.emit();
        },
        () => {
          this.saving = false;
        }
      );
    }
  }
  }
