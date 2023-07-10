import { Component, Input, OnInit,  } from '@angular/core';
import { Gifs } from 'src/app/shared/interfaces/gifs.interfaces';

@Component({
    selector: 'gifs-card',
    templateUrl: 'gifs-card.component.html'
})

export class GifsCardComponent implements OnInit {
    constructor() { }
    

    @Input()
    public gif!: Gifs


    ngOnInit(): void {
        if(!this.gif) throw new Error('Gif property is required.');
    }

}