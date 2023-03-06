import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) { }

  articleList(page) {
    return this.http.post(
      this.apiUrl + '/posts/list',
      {
        user_id: parseInt(localStorage.getItem('user_id'), 10),
        page: page,
      }
    );
  }
}
