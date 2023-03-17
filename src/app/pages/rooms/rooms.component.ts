import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { NavController, IonRouterOutlet, AlertController, LoadingController } from '@ionic/angular';
import { ArticleService } from '../../services/explore/article.service';
import { ReactionService } from '../../services/reaction.service';
import { Share } from '@capacitor/share';
import { AuthService } from 'src/app/services/auth.service';
import { PostAccessService } from 'src/app/services/post-access.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit {
  visited: any;
  posts: any;

  constructor(
    public navCtrl: NavController,
    public routerOutlet: IonRouterOutlet,
    public alertController: AlertController,
    private iab: InAppBrowser,
    private articleService: ArticleService,
    private reactions: ReactionService,
    private authService: AuthService,
    private getPostAccess: PostAccessService,
    private loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
    this.getArticles();
  }

  ionViewDidEnter() {
    this.getArticles();
  }

  getArticles() {
    this.articleService.articleList('Clubes')
      .subscribe((res: any) => {
        console.log(res);
        this.posts = res;
      }, (err: any) => {
        console.log(err);
      });
  }

  clickPost(article) {
    if (article.external_link?.length) {
      this.externalPost(article.external_link);
    } else {
      localStorage.removeItem('post');
      this.internalPost(article);
    }
  }

  like(post, event) {
    console.log('event', event);
    const target = event.target || event.srcElement || event.currentTarget;
    this.reactions
      .doLike(post)
      .subscribe((response) => {
        if (response > 0) {
          target.setAttribute('class', 'icon md hydrated liked');
          target.setAttribute('name', 'heart');
        } else {
          target.setAttribute('class', 'icon md hydrated');
          target.setAttribute('name', 'heart-outline');
        }
      });

    console.log(this.visited);
  }

  async shareApp(post) {
    if (post.external_link != null) {
      await Share.share({
        title: post.title,
        text: post.short_description,
        url: post.external_link,
        dialogTitle: '¡Comparte con tus amigos!',
      });
    } else {
      await Share.share({
        title: post.title,
        text: post.short_description,
        url: window.location.href + '/post/' + post.id,
        dialogTitle: '¡Comparte con tus amigos!',
      });
    }
  }

  externalPost(url) {
    this.iab.create(url, '_self', 'beforeload=yes,location=yes,clearcache=yes,navigationbuttoncolor=#ffc404');
  }

  internalPost(article) {
    localStorage.setItem('room', JSON.stringify(article));
    this.navCtrl.navigateForward('/room-list');
  }

  async showAlert() {
    const mapUrl = '../../../assets/images/unauth.gif';
    const alert = await this.alertController.create({
      message: `<div class="unauth-title">¡En esta no puedes entrar!</div> <img src="${mapUrl}" class="unauth-alert">`,
      buttons: ['Cerrar']
    });
    await alert.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: '¡ERROR!',
      subHeader: 'No tienes autorizacion para visualizar este contenido.',
      buttons: ['Aceptar'],
    });

    await alert.present();
  }

  async checkAuth(article) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      translucent: true,
    });

    this.getPostAccess.sendSectionAccess(article).subscribe((res: any) => {
      console.log(res);
      if (res === 0) {
        this.presentAlert();
      } else {
        this.clickPost(article);
      }
      loading.dismiss();
    }, (err: any) => {
      console.log(err);
    });
  }
}
