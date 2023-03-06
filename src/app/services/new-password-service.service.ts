import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NewPasswordServiceService {
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) { }
  send(data): Observable<any> {
    // console.log(data);
    return this.http.post(
      this.apiUrl + '/users/change-password',
      {
        user_id: parseInt(localStorage.getItem('user_id')),
        "new_password": data.new_password,
        "old_password": data.old_password,
      }
    )
    
  }
}
