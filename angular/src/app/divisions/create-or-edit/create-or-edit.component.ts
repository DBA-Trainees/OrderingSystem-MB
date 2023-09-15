import { Component, EventEmitter, Injector, OnInit, Output,} from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import { DivisionDto, DivisionServiceProxy,} from "@shared/service-proxies/service-proxies";
import { BsModalRef } from "ngx-bootstrap/modal";


@Component({
  selector: "Create-Or-Edit-Division-Modal-Component",
  templateUrl: "create-or-edit.component.html",
 
 
})

// implements inteface oninit
export class CreateOrEditDivisionModalComponent extends AppComponentBase implements OnInit
{
  saving = false;
  division: DivisionDto = new DivisionDto();
  id: number = 0;
  divisions: DivisionDto[] =[];

  @Output() onSave = new EventEmitter<any>();
  notify: any;

  constructor(
    injector: Injector,
    public bsModalRef: BsModalRef,
    private _divisionService: DivisionServiceProxy,
  ) {
    super(injector);
  }

  ngOnInit() {
    if (this.id) {
      this._divisionService. get(this.id).subscribe((res) => {
        this.division = res;
      });
    }
  }

  save(): void {
    this.saving = true;
    if(this.id!=0){
      this._divisionService.update(this.division).subscribe(
        () => {
          this.notify.info(this.l(this.division.divisionName+" "+" Saved Successully"));
          this.bsModalRef.hide();
          this.onSave.emit();
        },
        () => {
          this.saving = false;
        }
      ); 
    }else{
      this._divisionService.create(this.division).subscribe(
        () => {
          this.notify.info(this.l(this.division.divisionName+" "+" Created Successully"));
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
