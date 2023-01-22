import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(clients: any[], searchText: string): any[] {
    if(!clients) return [];
    if(!searchText) return clients;
    searchText = searchText && searchText.toLowerCase();
    return clients.filter( it => {
      return (it.nombre && it.nombre.toLowerCase().includes(searchText)) || (it.apellidos && it.apellidos.toLowerCase().includes(searchText));

    });
  }
}