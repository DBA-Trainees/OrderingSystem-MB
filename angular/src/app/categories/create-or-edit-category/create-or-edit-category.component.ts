import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CategoriesDto, CategoriesServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-create-or-edit-categories-modal',
  templateUrl: './create-or-edit-category.component.html',
})
export class CreateOrEditCategoriesModalComponent extends AppComponentBase implements OnInit {

  saving = false;
  category: CategoriesDto = new CategoriesDto();
  id: number = 0;
  
  @Output() onSave = new EventEmitter<any>();
  notify: any;

  constructor(
    injector: Injector,
    public bsModalRef: BsModalRef,
    private _categoriesService: CategoriesServiceProxy
  ) {
    super(injector);
  }

  ngOnInit() {
    if (this.id) {
      this._categoriesService.get(this.id).subscribe((res) => {
        this.category = res;
      });
    }
  }
  save(): void {
    this.saving = true;
    if(this.id!=0){
      this._categoriesService.update(this.category).subscribe(
        ()=>{
          this.notify.info(this.l(this.category.categoryName+" "+"Saved Sucessfully"))
          this.bsModalRef.hide();
          this.onSave.emit();
        },
        () => {
          this.saving = false;
        }
      );
    }else{
      this._categoriesService.create(this.category).subscribe(
        () => {
          this.notify.info(this.l(this.category.categoryName+" "+"Created Successfully"));
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