import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxJS/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class CardService {

  constructor(private http: Http) {
  }

  getCards(): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/photos')
      .map(response => response.json());
  }


}
