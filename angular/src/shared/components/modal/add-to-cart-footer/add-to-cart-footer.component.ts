import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  Injector
} from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
  selector: 'app-add-to-cart-footer',
  templateUrl: './add-to-cart-footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddToCartFooterComponent extends AppComponentBase {
  @Input() cancelLabel = this.l('Cancel');
  @Input() cancelDisabled: boolean;
  @Input() saveLabel = this.l('Add To Cart');
  @Input() saveDisabled: boolean;

  @Output() onCancelClick = new EventEmitter<number>();

  constructor(injector: Injector) {
    super(injector);
  }
}