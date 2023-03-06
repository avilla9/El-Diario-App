import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecoverPasswordService {
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  emailExists(data): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/password`, data);
  }

  newPassword(data): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/reset-password`, data);
  }
}
