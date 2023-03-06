import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) { }

  campaignList(page) {
    return this.http.post(
      this.apiUrl + '/campaign/list',
      {
        user_id: parseInt(localStorage.getItem('user_id')),
        page_name: page,
      }
    );
  }

  campaignData(page, campaign) {
    return this.http.post(
      this.apiUrl + '/campaign/data',
      {
        user_id: parseInt(localStorage.getItem('user_id')),
        campaign_id: campaign,
        page: page,
      }
    );
  }
}
