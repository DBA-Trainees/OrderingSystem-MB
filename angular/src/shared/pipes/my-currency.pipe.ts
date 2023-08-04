import { Pipe, PipeTransform } from '@angular/core';
import { formatCurrency, getCurrencySymbol } from '@angular/common';
@Pipe({
    name: 'mycurrency',
  })
  export class MycurrencyPipe implements PipeTransform {
    transform(
        value: number,
        currencyCode: string = 'PHP',
        display:
            | 'code'
            | 'symbol'
            | 'symbol-narrow'
            | string
            | boolean = 'symbol',
        digitsInfo: string = '3.2-2',
      
    ): string | null {
        return formatCurrency(
          value,
         getCurrencySymbol(currencyCode, 'wide'),
          currencyCode,
          digitsInfo,
        );
    }
}