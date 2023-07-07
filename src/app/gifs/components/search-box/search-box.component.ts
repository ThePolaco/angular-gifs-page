import { Component, ElementRef, ViewChild,  } from '@angular/core';
import { GiftsServices } from '../../services/gifts-service';

@Component({
    selector: 'gifs-search-box',
    template: `
        <h5>Buscar</h5>
        <input type="text" 
        class="form-control" 
        placeholder="buscar gifts..." 
        (keyup.enter)="searchTagViewChild()"
        #txtTagInput
        >
        <!-- (keyup.enter)="newTag(txtTagInput.value) -->
    `
})

export class SearchBoxComponent  {
    constructor(private giftsServices: GiftsServices) {}

    @ViewChild('txtTagInput')
    tagInput!: ElementRef<HTMLInputElement>

    searchTag( newTag: string){
        //console.log(newTag);
    }

    searchTagViewChild() {
        const newTag = this.tagInput.nativeElement.value;
        //console.log(newTag);
        this.giftsServices.searchTag(newTag);
        this.tagInput.nativeElement.value = '';
    }

}