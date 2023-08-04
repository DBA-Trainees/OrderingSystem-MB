import { Component, EventEmitter, Injector, OnInit, Output } from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import { 
  CustomerDto,
  CustomerServiceProxy,
  DivisionDto,
  DivisionServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: "create-edit-cx-modal",
  templateUrl: "create-or-edit-customers.component.html",
})
export class CreateOrEditCustomersComponent
  extends AppComponentBase
  implements OnInit
{
  saving = false;
  customer: CustomerDto = new CustomerDto();
  id: number = 0;
  divisions: DivisionDto[] =[];
  optionDivision: number = null;
  size:string=null;
 

  @Output() onSave = new EventEmitter<any>();
  
  constructor(
    injector: Injector,
    public bsModalRef: BsModalRef,
    private _customerService: CustomerServiceProxy,
    private _divisionService : DivisionServiceProxy
  ) {
    super(injector);
  }

  ngOnInit() {
    if (this.id) {
      this._customerService.get(this.id).subscribe((res) => {
        this.customer = res;
        this.optionDivision = this.customer.divisionId;
      });
    }
    this._divisionService.getAllDivisions().subscribe((res) =>{
        this.divisions = res;
    })
  }

  save(): void {
    this.saving = true;
    if(this.id!=0){
      this.customer.divisionId = this.optionDivision;
    
      this._customerService.update(this.customer).subscribe(
        () => {
          this.notify.info(this.l(this.customer.customerName+" "+"Saved Successfully"));
          this.bsModalRef.hide();
          this.onSave.emit();
        },
        () => {
          this.saving = false;
        }
      );
    }else{
    this.customer.divisionId = this.optionDivision;
    
      this._customerService.create(this.customer).subscribe(
        () => {
          this.notify.info(this.l(this.customer.customerName+" "+"Created Successfully"));
          this.bsModalRef.hide();
          this.onSave.emit();
        },
        () => {
          this.saving = false;
        }
      );
      }
  }
}
