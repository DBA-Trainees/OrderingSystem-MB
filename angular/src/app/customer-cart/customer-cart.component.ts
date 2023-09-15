


import { ChangeDetectorRef, Component, Injector, OnInit, SimpleChanges } from "@angular/core";
import { Router, Routes } from "@angular/router";
import { appModuleAnimation } from "@shared/animations/routerTransition";
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from "@shared/paged-listing-component-base";
import {
  CategoriesDto,
  FoodDto,
  OrderDto,
  OrderDtoPagedResultDto,
  OrderServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { finalize } from "rxjs/operators";
import * as moment from "moment";

class PagedOrdersRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}
enum fsize{
  Small='Small',
  Medium='Medium',
  Large='Large'
}
@Component({
  // selector: "add-to-cart",
  templateUrl: "customer-cart.component.html",
  styleUrls: ["./customer-cart.component.css"],
  animations: [appModuleAnimation()],
})
export class CustomerCartComponent extends PagedListingComponentBase<OrderDto> {

  orders: OrderDto[] = [];
  keyword = "";
  isActive: boolean | null;
  foodQty: number = 1;
  order: OrderDto = new OrderDto();
  selectedFoodOrder: number;
  selected: boolean;
  overallTotalPrice: number = 0;
  total: number;
  shippingCost: number=10;
  overallSub:number=0;
 food=new FoodDto();

  constructor(
    injector: Injector,
    private _orderService: OrderServiceProxy,
    private _modalService: BsModalService,
    private BsModalRef:BsModalRef,
    private router:Router,
    private cdRef: ChangeDetectorRef
  ) {
    super(injector);
  }

  incrementQuantity(order: OrderDto): void {
    if (order.quantity < order.food.quantity) {
      order.quantity++;
      this.updateCart(order); // Update the cart after incrementing
    }
  }
  
  decrementQuantity(order: OrderDto): void {
    if (order.quantity > 1) {
      order.quantity--;
      this.updateCart(order); // Update the cart after decrementing
    }
  }

  calculateTotalPrice(): void {
    const subtotal = this.orders.reduce((total, order) => {
      return total + this.individualPrice(order);
    }, 0);

    this.overallTotalPrice = subtotal + this.shippingCost;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.orders) {
      this.calculateTotalPrice();
    }
  }

  calculateSubtotal(): void {
    this.overallSub= this.orders.reduce((total, order) => {
      return total + this.individualPrice(order);
    }, 0);
  }
  ngOnChangesSubtotal(changes: SimpleChanges): void {
    if (changes.orders) {
      this.calculateSubtotal();
    }
  }
  protected list(
    request: PagedOrdersRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;
    request.isActive = this.isActive;

    this._orderService
      .getAllOrderWithFoodAndCustomers(
        request.keyword,
        request.isActive,
        request.skipCount,
        request.maxResultCount
      )
      .pipe(
        finalize(() => {
          finishedCallback();
          this.calculateTotalPrice();
          this.calculateSubtotal();
  
        })
      )
      .subscribe((result: OrderDtoPagedResultDto) => {
        this.orders = result.items;
        this.showPaging(result, pageNumber);
        

      });
  }
 
  protected delete(order: OrderDto): void {
    abp.message.confirm(
      this.l("You want to delete " + order.food.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._orderService.delete(order.id).subscribe(() => {
            abp.notify.success(this.l(order.food.name +" Successfully Deleted"));
            this.refresh();
          });
        }
      }
    );
  }

  
  updateCart(order: OrderDto): void {
    this.calculateTotalPrice();
    this.calculateSubtotal();
    this.calculateTotalPrice();
    this._orderService.update(order).subscribe(() => {
      abp.notify.success(this.l("Details Are Successfully Updated"));
     
    });
  }

  individualPrice(order: OrderDto): number {
    let updatedPrice = order.food?.price;
    return updatedPrice * order.quantity;
  }

  proceedOrder() {
    if (this.orders.length === 0) {
      abp.notify.error(this.l("No Order To Proceed"));
      return;
    }
    this.router.navigate(['/app/dashboard'])
  }
   
}