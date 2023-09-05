import { Component, Injector, OnInit, SimpleChanges} from "@angular/core";
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from "@shared/paged-listing-component-base";
import { CustomerDto, CustomerServiceProxy, OrderDto, OrderDtoPagedResultDto, OrderServiceProxy } from "@shared/service-proxies/service-proxies";
import * as moment from "moment";
import { finalize } from "rxjs/operators";

class PagedOrdersRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}


@Component({
  selector: "customer-dashboard.componentt",
  templateUrl: "customer-dashboard.component.html",
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent extends PagedListingComponentBase<OrderDto> {
  protected delete(entity: OrderDto): void {
    throw new Error("Method not implemented.");
  }
  orders: OrderDto[] = [];
  keyword = "";
  isActive: boolean | null;
  selectedFiltered: "day" | "month" | "year" = "year";
  customer: CustomerDto = new CustomerDto();
  customers:CustomerDto[]=[];
  id:number;

  overallTotalPrice: number = 0;
  total: number;
  shippingCost: number=10;
  overallSub:number=0;
  reminder:string;
  

  constructor(
    injector: Injector,
    private _orderService: OrderServiceProxy,
    private _customerService:CustomerServiceProxy
  ) {
    super(injector);
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
  individualPrice(order: OrderDto): number {
    let updatedPrice = order.food?.price;
    return updatedPrice * order.quantity;
  }

  calculateDiscountedPrice(): number {
    const discountAmount = this.overallTotalPrice * 0.10; // 10% discount  
    // Calculate the discounted price by subtracting the discount amount
    const discountedPrice = this.overallTotalPrice - discountAmount;
    return discountedPrice;
  }
  calculateSavings(): number {
    // Calculate the discount as 10% of the overall total price
    const discountAmount = this.overallTotalPrice * 0.10; // 10% discount
    // Calculate the discounted price by subtracting the discount amount
    const discountedPrice = this.overallTotalPrice - discountAmount;
    // Calculate and return the savings
    const savings = this.overallTotalPrice - discountedPrice;
    return savings;
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
         
         
        })
      )
      .subscribe((result: OrderDtoPagedResultDto) => {
        this.orders = result.items;
        this.showPaging(result, pageNumber);
      });
  }



}