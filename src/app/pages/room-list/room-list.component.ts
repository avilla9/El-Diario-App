import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { AlertController, LoadingController, MenuController, NavController } from '@ionic/angular';
import { PostAccessService } from 'src/app/services/post-access.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss'],
})
export class RoomListComponent implements OnInit {

  list: any;

  constructor(
    public menuCtrl: MenuController,
    public navCtrl: NavController,
    private iab: InAppBrowser,
    private getPostAccess: PostAccessService,
    private loadingCtrl: LoadingController,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.list = JSON.parse(localStorage.getItem("room"));
  }

  ionViewDidEnter() {
    console.log(this.list);
    this.list = JSON.parse(localStorage.getItem("room"));
  }

  toggleMenu() {
    this.menuCtrl.toggle();
  }

  clickPost(article) {
    if (article.link?.length) {
      this.externalPost(article.link)
    } else {
      localStorage.removeItem('post');
      this.internalPost(article)
    }
  }

  externalPost(url) {
    this.iab.create(url, '_self', 'beforeload=yes,location=yes,clearcache=yes,navigationbuttoncolor=#ffc404');
  }

  async internalPost(article) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      translucent: true,
    });
    await loading.present();
    this.getPostAccess.sendAccess(article).subscribe((res: any)  => {
      if (res == 0) {  
        // console.log(res, "No puedes entrar");
        this.presentAlert();
        }
      else {
        localStorage.setItem('post', JSON.stringify(article)); 
        this.navCtrl.navigateForward("/post" + "/" + article.id);
      }
      loading.dismiss();
        }, (err: any) => {
          console.log(err);
        });
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: '¡ERROR!',
      subHeader: 'No tienes autorizacion para visualizar este contenido.',
      buttons: ['Aceptar'],
    });

    await alert.present();
  }
}
