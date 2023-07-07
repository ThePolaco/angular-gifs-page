import { Component } from '@angular/core';
import { GiftsServices } from '../../../gifs/services/gifts-service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private giftsServices:GiftsServices) {}

  public get tags(): string[] {
    return this.giftsServices.tagsHistory;
  }

  //mi solucion añadir en el ng for en el array este metodo
  tagsHistorys():string[] {
    return this.giftsServices.tagsHistory;
  }

  recoverGifs(tag: string): void {
    this.giftsServices.searchTag(tag);
  }

}
