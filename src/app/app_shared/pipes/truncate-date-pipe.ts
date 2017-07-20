import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'truncateDate'
})

export class TruncateDatePipe implements PipeTransform {
  transform(value: string) : string {
    console.log('TruncateDatePipe has value ' + value);
    let x =  (value !== undefined  && value !== null) ? value.indexOf ('T') : 0;
    console.log('TruncateDatePipe has index of ' + x);
    return (x > 0) ?  value.substring(0, (x)) : '[NO DATE!]';
  }
}
