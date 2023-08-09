import { Component, Injector, OnInit } from "@angular/core";
import { Routes } from "@angular/router";
import { appModuleAnimation } from "@shared/animations/routerTransition";
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
import { BsModalService } from "ngx-bootstrap/modal";
import { finalize } from "rxjs/operators";

class PagedOrdersRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  selector: "add-to-cart",
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
  overallTotalAmount: number = 0;

  constructor(
    injector: Injector,
    private _orderService: OrderServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
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
        })
      )
      .subscribe((result: OrderDtoPagedResultDto) => {
        this.orders = result.items;
        this.showPaging(result, pageNumber);

      });
  }
  updateCart(order: OrderDto): void {
    this._orderService.update(order).subscribe(() => {
      this.notify.info(this.l("OrderUpdatedSuccessfully"));
    });
  }


  onOrderSelection(order: OrderDto, checked:boolean): void{
    if(checked){
      this.overallTotalAmount += order.food.price * order.quantity;
    }else{
      this.overallTotalAmount -= order.food.price * order.quantity;
    }
  }
  totalPrice(food: FoodDto): number {
    let updatedPrice = food.price;

    if (food.size == "Medium") {
      updatedPrice += 10;
    } else if (food.size == "Large") {
      updatedPrice += 15;
    }

    return updatedPrice * this.foodQty;
  }


  protected delete(order: OrderDto): void {
    abp.message.confirm(
      this.l("OrderDeleteWarningMessage", order.food.name),
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