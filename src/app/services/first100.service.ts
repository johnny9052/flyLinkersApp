import { Injectable } from '@angular/core';
import { HelperService } from '../util/HelperService';
import { ModelFirst100Data } from '../interfaces/first100';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class First100Service {

  constructor(private http: HttpClient,
              public helperService: HelperService) { }

  getFirst100() {
    return this.http.get<ModelFirst100Data>('https://flylinkers.com/es/founding_partners_app');
  }
}


