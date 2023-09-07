import { Component, EventEmitter, Injector, OnInit, Output } from "@angular/core";
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

  constructor(
    injector: Injector,
    private _orderService: OrderServiceProxy
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