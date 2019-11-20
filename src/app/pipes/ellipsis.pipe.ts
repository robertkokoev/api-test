import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis'
})
export class EllipsisPipe implements PipeTransform {
  transform(s: string) {
    let i = 198;
    if (s.length > 200) {
      for (let char of s.substr(199)) {
        i++;
        if (char == " ") {
          s = s.substr(0, i);
          s += '...';
          break;
        }
      }
    }
    return s;
  }
}