import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModelPosts } from '../interfaces/posts';
import { HelperService } from '../util/HelperService';

@Injectable({
  providedIn: 'root'
})
export class MasterPageService {

  constructor(private http: HttpClient,
              public helperService: HelperService) { }

  getPosts(pkUser: string) {
    return this.http.get<ModelPosts>('https://flylinkers.com/es/content_network/get_news_app/?userPk=' + pkUser);
  }
}
