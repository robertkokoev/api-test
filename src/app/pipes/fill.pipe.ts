import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fill'
})
export class FillPipe implements PipeTransform {

  arr: number[] = [];
  new;

  transform(number: number) {
    for (let i = 0; i < number; i++) {
      this.arr.push(i);
      this.new = this.arr.slice(5, 10);
    } 
    return this.new; 
  }
}