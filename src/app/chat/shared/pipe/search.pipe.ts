import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(items: User[] | null, searchTerm: string): any {
    if (!searchTerm) {
      return items
    }
    return items.filter(items => {
      return items.first_name.toLowerCase().includes(searchTerm.toLowerCase())
    });
  }
}