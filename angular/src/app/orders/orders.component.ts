import { Component, EventEmitter, Injector, OnInit, Output, SimpleChanges } from "@angular/core";
import { appModuleAnimation } from "@shared/animations/routerTransition";
import { AppComponentBase } from "@shared/app-component-base";
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from "@shared/paged-listing-component-base";
import {
  FoodDto,
  OrderDto,
  OrderDtoPagedResultDto,
  OrderServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { finalize } from "rxjs/operators";
import { AddToCartDetailsComponent } from "./add-to-cart-details/add-to-cart-details.component";
import { Router } from "@angular/router";

class PagedOrdersRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  selector:'orders-component',
  styleUrls:['./orders.component.css'],
  templateUrl: "./orders.component.html",
  animations: [appModuleAnimation()],
})
export class OrdersComponent extends PagedListingComponentBase<OrderDto> {
  orders: OrderDto[] = [];
  keyword: string = "";
  isActive: boolean | null;

  overallTotalPrice: number = 0;
  total: number;
  shippingCost: number=10;
  overallSub:number=0;
  // selectedDate: Date;


  constructor(
    injector: Injector,
    private _orderService: OrderServiceProxy
  ) {
    super(injector);
  }
  individualPrice(order: OrderDto): number {
    let updatedPrice = order.food?.price;
    return updatedPrice * order.quantity;
  }
  calculateTotalPrice(): void {
    const subtotal = this.orders.reduce((total, order) => {
      return total + this.individualPrice(order);
    }, 0);
    this.overallTotalPrice = subtotal + this.shippingCost;
  }

  calculateDiscountedPrice(): number {
    const discountAmount = this.overallTotalPrice * 0.10; // 10% discount  
    // Calculate the discounted price by subtracting the discount amount
    const discountedPrice = this.overallTotalPrice - discountAmount;
    return discountedPrice;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.orders) {
      this.calculateTotalPrice();
    }
  }


// // Add this method to your component
// getTotalSalesForSelectedDate(): void {
//   if (this.selectedDate) {
//     const year = this.selectedDate.getFullYear();
//     const month = this.selectedDate.getMonth() + 1; // Note: Month is zero-based
//     const day = this.selectedDate.getDate();
    
//     this.calculateTotalSales(year, month, day);
//   }
// }

// calculateTotalSales(year: number, month: number, day: number): void {
//   // Make an API call to get the total sales for the selected date
//   this._orderService.getTotalSalesByDate(year, month, day)
//     .subscribe((totalSales: number) => {
//       this.overallTotalPrice = totalSales;
//     });
// }



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
        })
      )
      .subscribe((result: OrderDtoPagedResultDto) => {
        this.orders = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  protected delete(order: OrderDto): void {
    abp.message.confirm(
      this.l("OrdernDeleteWarningMessage", order.food?.name),
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
}