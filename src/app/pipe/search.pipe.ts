import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../models/employee';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(EmpCollection?: Employee[], filterinput?: string): Employee[]|null {

    if(EmpCollection && filterinput)
    {
      return EmpCollection.filter(x => x.name.toUpperCase().startsWith(filterinput.toUpperCase()));
    }
    return null;
  }

}
