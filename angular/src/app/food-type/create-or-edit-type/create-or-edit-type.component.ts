import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { FoodTypeDto, FoodTypeServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-create-or-edit-food-types-modal',
  templateUrl: './create-or-edit-type.component.html',

})
export class CreateOrEditTypeComponent extends AppComponentBase implements OnInit  {
  saving = false;
  foodType: FoodTypeDto = new FoodTypeDto();
  id: number = 0;
  
  @Output() onSave = new EventEmitter<any>();
  notify: any;

  constructor(
    injector:Injector,
    private _foodTypeService:FoodTypeServiceProxy,
    public bsModalRef: BsModalRef
  ){
    super(injector);
  }
  ngOnInit() {
    if (this.id) {
      this._foodTypeService.get(this.id).subscribe((res) => {
        this.foodType = res;
      });
    }
  }
  save(): void {
    if(this.id!= 0){
      this._foodTypeService.update(this.foodType).subscribe(
        () => {
          this.notify.info(this.l(this.foodType.foodTypeName+ " "+ "Saved Successfully"));
          this.bsModalRef.hide();
          this.onSave.emit();
        },
        () => {
          this.saving = false;
        }
      );
    }else{
    this.saving = true;
      this._foodTypeService.create(this.foodType).subscribe(
        () => {
          this.notify.info(this.l(this.foodType.foodTypeName+ " "+"Saved Successfully"));
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
