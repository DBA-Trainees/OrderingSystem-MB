import { Component, Injector } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { OrderDto, OrderDtoPagedResultDto, OrderServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';


class PagedOrderRequestDto extends PagedRequestDto{
  keyword: string;
  isActive: boolean;
}

@Component({
  selector: 'app-customer-cart',
  templateUrl: './customer-cart.component.html',
  styleUrls: ['./customer-cart.component.css'],
  animations: [appModuleAnimation()]
})
export class CustomerCartComponent extends PagedListingComponentBase<OrderDto>{
  
  orders:OrderDto[]=[];
  keyword="";
  isActive:boolean | null;
  foodQty:number=1;
  order:OrderDto= new OrderDto();

  constructor(
    injector:Injector,
    private _orderService:OrderServiceProxy,
    private _modalService:BsModalService
  ){
    super(injector);
  }
  protected list(request: PagedOrderRequestDto, pageNumber: number, finishedCallback: Function)
  : void {
    request.keyword=this.keyword;
    request.isActive=this.isActive;

    this._orderService.getAllOrderWithFoodAndCustomers(
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
  updateOrder(order: OrderDto): void {
    this._orderService.update(order).subscribe(() => {
      this.notify.info(this.l('OrderUpdatedSuccessfully'));
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


}
