import { Injectable } from '@angular/core';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { Device } from '@capacitor/device';
import { AlertController, NavController } from '@ionic/angular';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {
  pushNotificationToken: any; // I save the token to database because i need it in my backend code.
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private alertController: AlertController,
    private iab: InAppBrowser,
    public navCtrl: NavController
  ) {

  }

  createNotification(notification): Observable<any> {
    return this.http.post(
      this.apiUrl + '/notification/store',
      notification
    );
  }

  showNotification(): Observable<any> {
    return this.http.post(
      this.apiUrl + '/notification/show',
      { userId: parseInt(localStorage.getItem('user_id'), 10), }
    );
  }

  updateNotification(notification): Observable<any> {
    return this.http.put(
      this.apiUrl + '/notification/update',
      {
        isOpen: true,
        userId: parseInt(localStorage.getItem('user_id'), 10),
        postId: notification.id
      }
    );
  }

  resetBadgeCount() {
    Device.getInfo().then(res => {
      if (res.platform !== 'web') {
        PushNotifications.removeAllDeliveredNotifications();
      }
    });
  }

  initPush() {
    Device.getInfo().then(res => {
      if (res.platform !== 'web') {
        this.registerPush();
      }
    });
  }

  private registerPush() {
    PushNotifications.requestPermissions().then((permission) => {
      if (permission.receive) {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // No permission for push granted
        console.log('error ' + permission);
      }
    });

    // On success, we should be able to receive notifications
    PushNotifications.addListener(
      'registration',
      (token: Token) => {
        console.log('My token: ' + JSON.stringify(token));
        this.pushNotificationToken = JSON.stringify(token.value);
      }
    );

    PushNotifications.addListener('registrationError', (error: any) => {
      console.log('Error: ' + JSON.stringify(error));
    });

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener(
      'pushNotificationReceived',
      async (notification: PushNotificationSchema) => {

        const data = notification;

        const alert = await this.alertController.create({
          header: JSON.stringify(notification.title).substring(1, JSON.stringify(notification.title).length - 1),
          message: JSON.stringify(notification.body).substring(1, JSON.stringify(notification.body).length - 1),
          buttons: [
            {
              text: 'OK',
              handler: () => {
                const notificationData = {
                  isOpen: false,
                  userId: parseInt(localStorage.getItem('user_id'), 10),
                  title: notification.title,
                  body: notification.body,
                  image: '',
                  post: '',
                };
                if ('post' in notification.data) {
                  notificationData.isOpen = true;
                  notificationData.post = notification.data.post;
                  console.log(notification.data.post);
                  this.navCtrl.navigateForward(notification.data.post);
                } else if (data.data.url !== '' && data.data.url !== undefined) {
                  const browser = this.iab.create(data.data.url, '_blank', { location: 'no' });
                }
                this.createNotification(notificationData);
              }

            }
          ]
        });
        await alert.present();
      }
    );


    // Method called when tapping on a notification
    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      async (notification: ActionPerformed) => {
        const data = notification.notification.data;
        console.log('Action performed: ' + JSON.stringify(notification.notification));

        const notificationData = {
          isOpen: true,
          userId: parseInt(localStorage.getItem('user_id'), 10),
          title: data.notification.title,
          body: data.notification.body,
          image: '',
          post: '',
        };
        if ('post' in data) {
          console.log(data.post);
          notificationData.post = data.post;
          this.navCtrl.navigateForward(data.post);
        } else if (data.url) {
          if (data.url !== '' && data.url !== undefined) {
            const browser = this.iab.create(data.url, '_blank', { location: 'no' });
          }
        }
        this.createNotification(notificationData);
      }
    );
  }
}
