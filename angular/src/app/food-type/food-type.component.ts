import { Component, Injector } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { finalize } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { FoodTypeDto, FoodTypeDtoPagedResultDto, FoodTypeServiceProxy}from '@shared/service-proxies/service-proxies';
import { CreateOrEditTypeComponent } from './create-or-edit-type/create-or-edit-type.component';

class PagedFoodTypeRequestDto extends PagedRequestDto{
  keyword:string;
  isActive: boolean|null;
}
@Component({
  selector: 'app-food-types',
  templateUrl: './food-type.component.html',
  styleUrls: ["./food-type.component.css"],
  animations:[appModuleAnimation()],
})
export class FoodTypeComponent extends PagedListingComponentBase<FoodTypeDto>{
foodType:FoodTypeDto[]=[];
keyword="";
isActive:boolean|null;
advancedFilterVisible=false;

constructor(
  injector:Injector,
  private _foodTypeService:FoodTypeServiceProxy,
  private _modalService:BsModalService
){
  super(injector);
}
 createType():void {this.showCreateOrEditFoodTypeModal();}
 editType(id):void {this.showEditFoodTypeModal(id);}

 protected list (request:PagedFoodTypeRequestDto, pageNumber:number,finishedCallback:Function):
 void {
  request.keyword=this.keyword;
  request.isActive=this.
  isActive;this._foodTypeService
.getAll(
  request.keyword,
   request.isActive, 
   request.skipCount,
   request.maxResultCount)

.pipe( finalize(() => { finishedCallback();}) )
.subscribe((result: FoodTypeDtoPagedResultDto) => {
  this.foodType = result.items;
  this.showPaging(result, pageNumber);
});
}

protected delete(foodType: FoodTypeDto): void {
  abp.message.confirm(
    this.l("Delete Warning Message for"+ " " + foodType.foodTypeName),
    undefined,
    (result: boolean) => {
      if (result) {
        this._foodTypeService.delete(foodType.id).subscribe(() => {
          abp.notify.success(this.l("SuccessfullyDeleted"));
          this.refresh();
        });
      }
    }
  );
}

private showCreateOrEditFoodTypeModal(id?: number): void{
  let createFoodTypeModal: BsModalRef;
  if(!id){
    createFoodTypeModal = this._modalService.show(
      CreateOrEditTypeComponent,
      {
        class: 'modal-lg',
      }
    );
  }
  createFoodTypeModal.content.onSave.subscribe(() =>{
    this.refresh();
  })
}
private showEditFoodTypeModal(id?: number): void{
  let EditDivisionModal: BsModalRef;
  EditDivisionModal = this._modalService.show(
    CreateOrEditTypeComponent,
    {
      class: 'modal-lg',
      initialState: {
      id: id,
      },
    }
  );

    EditDivisionModal.content.onSave.subscribe(() =>{
    this.refresh();
  })
}


}
