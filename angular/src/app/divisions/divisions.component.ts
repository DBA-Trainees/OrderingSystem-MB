import {Component,Injector,} from '@angular/core';
import { appModuleAnimation } from "@shared/animations/routerTransition";
import { finalize } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PagedListingComponentBase,PagedRequestDto,} from "@shared/paged-listing-component-base";
import {DivisionDto,DivisionDtoPagedResultDto,DivisionServiceProxy,} from "@shared/service-proxies/service-proxies";
import { CreateOrEditDivisionModalComponent } from './create-or-edit/create-or-edit.component';

class PagedDivisionsRequestDto extends PagedRequestDto {

  keyword: string;
  isActive: boolean | null;
}
//@ ->class decorator ----components are the one who build the page 
@Component({ 
  //angular components
  selector: "divisions-component",
  templateUrl: "divisions.component.html",// context of the page 
  styleUrls: ["./divisions.component.css"],
  animations: [appModuleAnimation()],
  
})
export class DivisionsComponent extends PagedListingComponentBase<DivisionDto> {
  divisions: DivisionDto[] = [];
  keyword = "";
  isActive: boolean | null;
  advancedFiltersVisible = false;

  //injecting proxies and http cliemt to the compomemt
  //constructior when class is initiated 
  constructor(
    injector: Injector,
    private _divisionService: DivisionServiceProxy,
    private _modalService: BsModalService,
  ) {
    super(injector);
  }

  createDiv(): void { this.showCreateOrEditDivisionModal(); }

  editDiv(id): void { this.showEditDivisionModal(id); }

  protected list(
     request: PagedDivisionsRequestDto, 
     pageNumber: number, 
     finishedCallback: Function): 
  void { 
    request.keyword = this.keyword; request.isActive = this.isActive;
    this._divisionService
      .getAll( request.keyword, 
      request.isActive,
       request.skipCount,
        request.maxResultCount )
      .pipe( finalize(() => { finishedCallback();}) )
      .subscribe((result: DivisionDtoPagedResultDto) => {
        this.divisions = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  protected delete(division: DivisionDto): void {
    abp.message.confirm(
      this.l("Delete Warning Message for " + " "+ division.divisionName),
      undefined,
      (result: boolean) => {
        if (result) {
          this._divisionService.delete(division.id).subscribe(() => {
            abp.notify.success(this.l("Deleted Successfully"));
            this.refresh();
          });
        }
      }
    );
  }

  private showCreateOrEditDivisionModal(id?: number): void{
    let createOrEditDivisionModal: BsModalRef;
    if(!id){
      createOrEditDivisionModal = this._modalService.show(
        CreateOrEditDivisionModalComponent,
        {
          class: 'modal-lg',
        }
      );
    }

    createOrEditDivisionModal.content.onSave.subscribe(() =>{
     
      this.refresh();
    
    })

  }


  private showEditDivisionModal(id?: number): void{
    let editDivisionModal: BsModalRef;
    editDivisionModal = this._modalService.show(
      CreateOrEditDivisionModalComponent,
      {
        class: 'modal-lg',
        initialState: {
          id: id,
        },
      }
    );
    
      editDivisionModal.content.onSave.subscribe(() =>{
        this.refresh();
      })
   
  }
}