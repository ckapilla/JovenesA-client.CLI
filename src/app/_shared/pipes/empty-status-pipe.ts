import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emptyStatus'
})

export class EmptyStatusPipe implements PipeTransform {
  transform(value: string): string {
    // console.log('TruncateDatePipe has value ' + value);
    let img: string;
    if (value > '') {
      img = 'Yes';
    } else {
      img = '';
    }

    return img;
  }
}
