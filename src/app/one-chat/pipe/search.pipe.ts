import { Pipe, PipeTransform } from '@angular/core';
import { NewUser } from 'src/app/shared/models/user.model';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: NewUser[] | null, searchTerm: any): any {
    if(value)
    return value.filter((data:any) => data.first_name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)
  }
}
