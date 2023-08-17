


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
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { finalize } from "rxjs/operators";
import { AddToCartDetailsComponent } from "@app/orders/food-information/add-to-cart-details/add-to-cart-details.component";

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
  overallTotalAmount: number = 0;
  priceTotal:number;
  foodSize=[fsize.Small,fsize.Medium,fsize.Large];
  sizeSelected:string;
  constructor(
    injector: Injector,
    private _orderService: OrderServiceProxy,
    private _modalService: BsModalService,
    private BsModalRef:BsModalRef
  ) {
    super(injector);
  }

  editFood(id): void {
        this.showEditOrderModal(id);
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

  updateCart(order: OrderDto): void {
 
    this._orderService.update(order).subscribe(() => {
      this.notify.info(this.l("Order Updated Successfully"));
    });
  }

  private showEditOrderModal(id?: number): void{
    let editFood: BsModalRef;

      editFood = this._modalService.show(
        AddToCartDetailsComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id,
          },
        }
      );    
    
    editFood.content.onSave.subscribe(() =>{
      this.refresh();
    })
  }
}

 
 
  
