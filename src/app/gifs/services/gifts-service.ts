import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchResponse, Gifs } from 'src/app/shared/interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GiftsServices {

    private _tagsHistory: string [] = [];
    private apiKey: string = 'BAVUaZPkbSDDXhY6d7wqYHeyuz3MVhYx';
    private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

    public gifList: Gifs[] = [];
    constructor(private http: HttpClient) { 
        this.loadLocalStorage();
        console.log('Gift service Ready');
    }

    get tagsHistory() {
        return [...this._tagsHistory];
    }

    //async searchTag( tag: string): Promise<void> {
    searchTag( tag: string): void {
        if(tag.length === 0) return;
        this.organizeHistory(tag);
        // promesa sin esperar
        // fetch('https://api.giphy.com/v1/gifs/search?api_key=BAVUaZPkbSDDXhY6d7wqYHeyuz3MVhYx&q=Home&limit=10')
        //     .then(resp => resp.json())
        //     .then(data => console.log(data))
        // promesa asincrona va a esperar
        // const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=BAVUaZPkbSDDXhY6d7wqYHeyuz3MVhYx&q=Home&limit=10')
        // const data = await resp.json();
        // console.log(data);

        //hacemos llamadas con client http de angular HttpClient, no es una promesa es un observable
        const params = new HttpParams()
            .set('api_key', this.apiKey)
            .set('limit', '10')
            .set('q', tag)

        // this.http.get(`${this.serviceUrl}/gifs/search?api_key=BAVUaZPkbSDDXhY6d7wqYHeyuz3MVhYx&q=Home&limit=10`) --> llamamos con todos los parametros de la url juntos
        this.http.get<SearchResponse>(`${this.serviceUrl}/search`,{params}) // mandamos parametros a traves de HttpParams
        .subscribe( resp => {
            this.gifList = resp.data;
        })

    }

    private organizeHistory(tag: string) {
        //debugger;
        tag = tag.toLocaleLowerCase();

        if(this._tagsHistory.includes(tag)){ // busco si el tag es el mismo que alguno guardado
            this._tagsHistory = this._tagsHistory.filter ( (oldTag: string) => oldTag !== tag);
        }
        this._tagsHistory.unshift(tag);
        this._tagsHistory = this._tagsHistory.splice(0,10); // establecemos un historial de 10 busquedas
        this.saveLocalStorage();
    }

    private saveLocalStorage(): void { // guardamos el historial en sessionStorage local, solo va a ser visible en el puerto que me encuentro (pagina web)
        localStorage.setItem('History', JSON.stringify(this._tagsHistory));
    }

    private loadLocalStorage(): void { // guardamos el historial en sessionStorage local, solo va a ser visible en el puerto que me encuentro (pagina web)
       if(!localStorage.getItem('History')) return; // si no tenemos data
        this._tagsHistory = JSON.parse(localStorage.getItem('History')!); // pasamos los datos a array y le indicamos con el operador ! de que siempre tendra información
        if(this._tagsHistory.length > 0){
            this.searchTag(this._tagsHistory.shift()!);
        }
    }
    
}