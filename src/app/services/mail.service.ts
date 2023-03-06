import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) { }

  send(data) {
    return this.http.post(
      this.apiUrl + '/sendmail',
      {
        user_id: parseInt(localStorage.getItem('user_id')),
        "agent_code": data.agent_code,
        "type": data.type,
        "message": data.message,
      }
    );
  }
}
