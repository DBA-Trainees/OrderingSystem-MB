


import { Component, Injector, OnInit, SimpleChanges } from "@angular/core";
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

  constructor(
    injector: Injector,
    private _orderService: OrderServiceProxy,
    private _modalService: BsModalService,
    private BsModalRef:BsModalRef,
    private router:Router
  ) {
    super(injector);
  }

  calculateTotalPrice(): void {
    // Calculate the subtotal (sum of individual prices)
    const subtotal = this.orders.reduce((total, order) => {
      return total + this.individualPrice(order);
    }, 0);

    // Add the shipping cost to the subtotal to get the total price
    this.overallTotalPrice = subtotal + this.shippingCost;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.orders) {
      // Calculate the total price whenever orders change
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
      // Calculate the total price whenever orders change
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
          this.calculateSubtotal()
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
    this._orderService.update(order).subscribe(() => {
      abp.notify.warn(this.l("Details Are Successfully Updated"));
     
    });
  }

  individualPrice(order: OrderDto): number {
    let updatedPrice = order.food?.price;
    return updatedPrice * order.quantity;
  }

  proceedOrder() {
    // Check if there are orders to proceed
    if (this.orders.length === 0) {
      // Handle the case where there are no orders
      abp.notify.error(this.l("No Order To Proceed"));
      return;
    }
    this.router.navigate(['/app/dashboard'])
  }
   
}