import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginate'
})
export class PaginationPipe implements PipeTransform {
  transform(array: Array<any>, page_size: number = 10, page_number: number = 1): Array<any> {
    --page_number;
    return array.slice(page_number * page_size, (page_number + 1) * page_size);
  }
}