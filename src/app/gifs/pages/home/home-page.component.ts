import { Component } from '@angular/core';
import { GiftsServices } from '../../services/gifts-service';
import { Gifs } from 'src/app/shared/interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  constructor(private giftsServices: GiftsServices){}

  get gifs(): Gifs[] {
    return this.giftsServices.gifList;
  }
}
