
import { Component, EventEmitter, Injector, OnInit, Output} from '@angular/core';
import { AppComponentBase } from "@shared/app-component-base";
import { FoodDto,FoodServiceProxy,CategoriesDto,CategoriesServiceProxy,FoodTypeDto,FoodTypeServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from "ngx-bootstrap/modal";
enum fsize{
  Small='Small',
  Medium='Medium',
  Large='Large'
}
@Component({
  selector: 'app-create-or-edit-food-modal',
  templateUrl: './edit-food.component.html',
  styleUrls: ['./edit-food.component.css']
})
export class EditFoodComponent extends AppComponentBase implements OnInit {
  saving= false;
  food= new FoodDto();
  foodType:FoodTypeDto[]=[];
  categories:CategoriesDto[]=[];
  id: number= 0;
  optCategories: number = null;
  optFoodType: number= null;
  availability: boolean= true;
  foodSize=[fsize.Small,fsize.Medium,fsize.Large];
  sizeSelected:string;
  fileName:string;
  fileType:string;
  base64String:any;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public bsModalRef: BsModalRef,
    private _foodService: FoodServiceProxy,
    private _categoryService: CategoriesServiceProxy,
    private _typeService: FoodTypeServiceProxy,

  ) {
    super(injector);
  }
  ngOnInit() {
    

    if (this.id) {
      this._foodService.get(this.id).subscribe((res) => {
        this.food = res;
        this.optCategories = res.categoryId;
        this.optFoodType = res.foodTypeId;
        this.sizeSelected=res.size;
      
      });
    }
    this._categoryService.getAllCategories().subscribe((res) => {
      this.categories = res;
    });

    
    this._typeService.getAllFoodType().subscribe((res) => {
      this.foodType = res;
    });
    
  }
  
  createAvailable(event: any): void{
    this.food.availability = event.target.checked;
  }
 
  selectedImage(event: any): void{
    var files:File = event.target.files[0];
    var reader = new FileReader();
    reader.onload = (e: any) => {
      this. base64String = e.target.result.split(',')[1];
      this.food.image = this.base64String;
      this.food.imageName=this.fileName;
      this.food.imageFileType=this.fileType;
    };
    reader.readAsDataURL(files);
  }
  
  save(): void {
    this.saving = true;
    this.food.categoryId = this.optCategories;
    this.food.foodTypeId = this.optFoodType;
    this.food.size=this.sizeSelected;
   
    if (this.id!=0){
      this._foodService.update(this.food).subscribe(
        () => {
          this.notify.info(this.l(this.food.name+" "+ 'Saved Successfully'));
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


