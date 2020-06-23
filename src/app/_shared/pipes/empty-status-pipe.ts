import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emptyStatus'
})

export class EmptyStatusPipe implements PipeTransform {
  transform(value: string): string {
    // console.log('TruncateDatePipe has value ' + value);
    let img: string;
    if (value > '') {
      img = value; // .substr(0, 12);
    } else {
      img = '';
    }

    return img;
  }
}
