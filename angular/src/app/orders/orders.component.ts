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
import { AddToCartDetailsComponent } from "./food-information/add-to-cart-details/add-to-cart-details.component";
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
  keyword = "";
  isActive: boolean | null;
  saving=false;
  order= new OrderDto;
 
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _orderService: OrderServiceProxy,
    private _modalService: BsModalService,
    private router:Router,
    public BsModalRef:BsModalRef,
  ) {
    super(injector);
  }
  editOrder( id): void {
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
  
  TimeAndDateFormat = (TimeAndDate:Date): string => {
    var currentTime = new Date();
    var difference = Math.round((currentTime.getTime() - new Date(TimeAndDate).getTime()) / 60000);
    return difference < 1 ? 'just now' : difference === 1 ? 'a minute ago' : `${difference} ago`;
  };
  

  protected delete(order: OrderDto): void {
    abp.message.confirm(
      this.l("OrdernDeleteWarningMessage"),
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

  private showEditOrderModal(id?: number): void{
    let EditOrderModal: BsModalRef;

    EditOrderModal = this._modalService.show(
      AddToCartDetailsComponent  ,
        {
          class: 'modal-lg',
          initialState: {
            id: id,
          },
        }
      );
    
    
    EditOrderModal.content.onSave.subscribe(() =>{
      this.refresh();
    })
  }



}