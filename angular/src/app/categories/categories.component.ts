import { Component, Injector} from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { CategoriesDto, CategoriesDtoPagedResultDto, CategoriesServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { CreateOrEditCategoriesModalComponent } from './create-or-edit-category/create-or-edit-category.component';
//import { UpdateCategoriesComponent } from './create-or-edit-categories-modal/update-categories/update-categories.component';

class PagedCategoriesResultRequestDto extends PagedRequestDto{
  keyword: string;
  isActive : boolean | null;
}
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ["./category.component.css"],
  animations: [appModuleAnimation()],
})
export class CategoriesComponent extends PagedListingComponentBase<CategoriesDto> {
  categories: CategoriesDto[]=[];
  keyword="";
  isActive: boolean|null;
  advancedFiltersVisible=false;
constructor(
  injector:Injector,
  private _categoriesService:CategoriesServiceProxy,
  private _modalService:BsModalService
){
  super (injector);
}


createCategory(): void {
  this.showCreateOrEditCategoriesModal();
}

editCategory(id): void {
  this.showEditCategoriesModal(id);
}

protected list(
  request: PagedCategoriesResultRequestDto,
  pageNumber: number,
  finishedCallback: Function
): void {
  request.keyword = this.keyword;
  request.isActive = this.isActive;

  this._categoriesService
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
    .subscribe((result: CategoriesDtoPagedResultDto) => {
      this.categories = result.items;
      this.showPaging(result, pageNumber);
    });
}

protected delete(categories: CategoriesDto): void {
  abp.message.confirm(
    this.l("Delete Warning Message for"+ " "+ categories.categoryName),
    undefined,
    (result: boolean) => {
      if (result) {
        this._categoriesService.delete(categories.id).subscribe(() => {
          abp.notify.success(this.l("Deleted Successfully"));
          this.refresh();
        });
      }
    }
  );
}
private showCreateOrEditCategoriesModal(id?: number): void{
  let createOrEditCategoriesModal: BsModalRef;
  if(!id){
    createOrEditCategoriesModal=this._modalService.show(
      CreateOrEditCategoriesModalComponent,
      {
        class:'modal-lg',

      }
    )
  }

  createOrEditCategoriesModal.content.onSave.subscribe(() =>{
    this.refresh();
  })
}

private showEditCategoriesModal(id?: number): void{
  let EditCategoriesModal: BsModalRef;
  
    EditCategoriesModal = this._modalService.show(
      CreateOrEditCategoriesModalComponent,
      {
        class: 'modal-lg',
        initialState: {
          id: id,
        },
      }
    );

  EditCategoriesModal.content.onSave.subscribe(() =>{
    this.refresh();
  })
}

}



