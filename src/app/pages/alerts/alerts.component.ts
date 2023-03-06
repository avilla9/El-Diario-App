import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController, NavController } from '@ionic/angular';
import { PushNotificationService } from '../../services/push-notification.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss'],
})
export class AlertsComponent implements OnInit {

  notificationList: any;
  months = {
    '01': 'Enero',
    '02': 'Febrero',
    '03': 'Marzo',
    '04': 'Abril',
    '05': 'Mayo',
    '06': 'Junio',
    '07': 'Julio',
    '08': 'Agosto',
    '09': 'Septiembre',
    10: 'Octubre',
    11: 'Noviembre',
    12: 'Diciembre',
  };

  constructor(
    public menuCtrl: MenuController,
    public navCtrl: NavController,
    private notification: PushNotificationService,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.getNotification();
  }

  getNotification() {
    this.notification.showNotification().subscribe((res: any) => {
      this.notificationList = Object.keys(res).map(key => ({month: key, value: res[key]}));
      console.log('notificationList', this.notificationList);
    }, (err: any) => {
      console.log(err);
    });
  }

  updateNotification(notification) {
    this.notification.updateNotification(notification).subscribe((res: any) => {
      console.log(res);
      this.getNotification();
    }, (err: any) => {
      console.log(err);
    });
  }

  redirect(notification) {
    this.navCtrl.navigateForward(notification.post);
  }

  async clickNotification(notification) {
    console.log(notification);
    const alert = await this.alertController.create({
      header: notification.title,
      message: notification.body,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.updateNotification(notification);
            if (notification.post) {
              this.redirect(notification);
            }
          }
        }
      ]
    });
    await alert.present();
  }

}
