import { Component, Injector } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase,PagedRequestDto } from '@shared/paged-listing-component-base';
import { FoodDto,FoodDtoPagedResultDto,FoodServiceProxy} from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateOrEditFoodComponent } from './create-or-edit-food/create-or-edit-food.component';
import { EditFoodComponent } from './create-or-edit-food/edit-food/edit-food.component';

class PagedFoodRequestDto extends PagedRequestDto{
  keyword:string;
  isActive: boolean|null;
}
@Component({
  selector: 'foods-component',
  templateUrl: './foods.component.html',
  animations: [appModuleAnimation()],
  styleUrls: ['./foods.component.css']

})
export class FoodsComponent extends PagedListingComponentBase<FoodDto>  {
  foods: FoodDto[] = []; //array to be called
  keyword = "";
  isActive: boolean | null;

   
  constructor(
    injector: Injector,
    private _foodService: FoodServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  createFood(): void {
    this.showCreateOrEditFoodModal();
  }

  editFood(id): void {
    this.showEditFoodModal(id);
  }
  protected list(
    request: PagedFoodRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;
    request.isActive = this.isActive;

    
      this._foodService
      .getAllFoodWithCategoryAndFoodType( request.keyword, 
        request.isActive, 
        request.skipCount, 
        request.maxResultCount
      )
      
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: FoodDtoPagedResultDto) => {
        this.foods = result.items;
        this.showPaging(result, pageNumber);
      });
  }

 protected delete(food: FoodDto): void {
    abp.message.confirm(
      this.l("Delete Warning Message for"+ " " + food.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._foodService.delete(food.id).subscribe(() => {
            abp.notify.success(this.l("SuccessfullyDeleted"));
            this.refresh();
          });
        }
      }
    );
  }
  
  private showCreateOrEditFoodModal(id?: number): void{
    let createOrEditFoodModal: BsModalRef;
    if(!id){
        createOrEditFoodModal = this._modalService.show(
          CreateOrEditFoodComponent,
        {
          class: 'modal-lg',
        }
      );
    }
    
    createOrEditFoodModal.content.onSave.subscribe(() =>{
      this.refresh();
    })
  }
   

  private showEditFoodModal(id?: number): void{
    let EditFoodModal: BsModalRef;

      EditFoodModal = this._modalService.show(
        EditFoodComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id,
          },
        }
      );
    
    
    EditFoodModal.content.onSave.subscribe(() =>{
      this.refresh();
    })
  }
 
}



