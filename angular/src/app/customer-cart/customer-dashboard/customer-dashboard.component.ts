import { Component, Injector, OnInit } from "@angular/core";
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

class SalesData {
  dateTimeOrdered: string;
  totalAmount: number;
}


@Component({
  selector: "customer-dashboard.componentt",
  templateUrl: "customer-dashboard.component.html",
})
export class CustomerDashboardComponent extends PagedListingComponentBase<OrderDto> {
  protected delete(entity: OrderDto): void {
    throw new Error("Method not implemented.");
  }
  orders: OrderDto[] = [];
  keyword = "";
  isActive: boolean | null;
  workingDays: Date[] = [];
  totalSales: number = 0;
  selectedFiltered: "day" | "month" | "year" = "year";
  totalSalesForSelectedDay: number = 0;
  salesData: SalesData[] =[];
  customer: CustomerDto = new CustomerDto();
  customers:CustomerDto[]=[];
  id:number;

  constructor(
    injector: Injector,
    private _orderService: OrderServiceProxy,
    private _customerService:CustomerServiceProxy
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
      .getAll(
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

      this._customerService.getAllCustomer().subscribe((res)=>{
        this.customers=res
      });
  }



  dateFilter() {
    const today = new Date();
    let startDate: Date, endDate: Date;

    switch (this.selectedFiltered) {
      case "day":
        startDate = moment(today).startOf("month").toDate();
        endDate = moment(today).endOf("month").toDate();
      
        break;
      case 'month':
        startDate = moment(today).startOf('year').toDate();
        endDate = today;
       
     
        break;
      case 'year':
        startDate = moment(today).startOf('year').toDate();
        endDate = today;
      
      
        break;
    }
  }
  

}