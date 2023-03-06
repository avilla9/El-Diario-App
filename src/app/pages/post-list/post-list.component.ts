import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { AlertController, LoadingController, MenuController, NavController } from '@ionic/angular';
import { PostAccessService } from 'src/app/services/post-access.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {

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
    this.list = JSON.parse(localStorage.getItem("post-list"));
    console.log(this.list)
  }

  ionViewDidEnter() {
    this.list = JSON.parse(localStorage.getItem("post-list"));
    console.log(this.list)
  }

  toggleMenu() {
    this.menuCtrl.toggle();
  }

  clickPost(article) {
    if (article.post_type === 'external') {
      this.externalPost(article.external_link)
    } else if(article.post_type === 'post') {
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
