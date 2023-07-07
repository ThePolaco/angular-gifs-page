import { Component, Input,  } from '@angular/core';
import { Gifs } from 'src/app/shared/interfaces/gifs.interfaces';

@Component({
    selector: 'gifs-card-list',
    templateUrl: 'card-list.component.html'
})

export class CardListComponent {
    constructor() { }

    @Input()
    public gifsList: Gifs[] = [];
}