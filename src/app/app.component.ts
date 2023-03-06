import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PushNotificationService } from './services/push-notification.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public href: string = window.location.pathname;

  constructor(
    private router: Router,
    public pushNotifications: PushNotificationService,
  ) {
    this.pushNotifications.initPush();
  }

}
