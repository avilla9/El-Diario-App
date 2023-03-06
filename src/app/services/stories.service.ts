import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoriesService {
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) { }

  getStories() {
    return this.http.post(
      this.apiUrl + '/posts/stories',
      {
        user_id: parseInt(localStorage.getItem('user_id'))
      }
    );
  }
}
