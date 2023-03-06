import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { AlertController, LoadingController, MenuController, ModalController, NavController } from '@ionic/angular';
import { StoryComponent } from '../../components/story/story.component';
import { StoriesService } from '../../services/stories.service';
import { AuthService } from 'src/app/services/auth.service';
import { JwtHelperService } from 'src/app/services/jwt-helper.service';
import { ArticleService } from '../../services/explore/article.service';
import { Share } from '@capacitor/share';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { ReactionService } from '../../services/reaction.service';
import { Router } from '@angular/router';
import { PostAccessService } from 'src/app/services/post-access.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<boolean>();
  images: any;
  visited: any;
  user: any;
  posts: any;
  date = new Date().getFullYear();

  constructor(
    public menuCtrl: MenuController,
    public navCtrl: NavController,
    public modalController: ModalController,
    private stories: StoriesService,
    private jwtHelper: JwtHelperService,
    private authService: AuthService,
    private articleService: ArticleService,
    private reactions: ReactionService,
    private iab: InAppBrowser,
    private getPostAccess: PostAccessService,
    private loadingCtrl: LoadingController,
    private alertController: AlertController,

    private renderer: Renderer2,
    private elem: ElementRef,
    private router: Router,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    this.getUserData();
    this.getArticles();
  }

  ionViewDidEnter() {
    this.getStories();
    this.getArticles();
    console.log(this.visited);
  }

  getUserData() {
    this.authService.userData(this.jwtHelper.id())
      .subscribe((res: any) => {
        console.log(res);
        this.user = res;
        localStorage.setItem('user', JSON.stringify(res));
      }, (err: any) => {
        console.log(err);
      });
  }

  getStories() {
    this.stories
      .getStories()
      .subscribe((response) => {
        this.images = response;
        console.log(this.images);
        this.visited = Array(this.images.length);
      });
  }

  getArticles() {
    this.articleService.articleList('Home')
      .subscribe((res: any) => {
        console.log(res);
        this.posts = res;
      }, (err: any) => {
        console.log(err);
      });
  }

  toggleMenu() {
    this.menuCtrl.toggle();
  }

  toExplore() {
    localStorage.setItem('lastTab', '0');
    this.navCtrl.navigateForward('/explora');
  }

  async openModal(image, position) {
    const modal = await this.modalController.create({
      component: StoryComponent,
      backdropDismiss: true,
      swipeToClose: true,
      cssClass: 'bottom-pop-up',
      componentProps: {
        img: image,
        pos: position,
        visited: this.visited,
      }
    });
    modal.onWillDismiss().then(data => {
      console.log('dismissed', data);
      this.getStories();
    });
    return await modal.present();
  }

  open(article) {
    // The user click to see the article
    this.view(article);

    if (article.post_type === 'post') {
      this.internalPost(article);
    } else if (article.post_type === 'external') {
      this.externalPost(article.external_link);
    }
  }

  externalPost(url) {
    this.iab.create(url, '_self', 'beforeload=yes,location=yes,clearcache=yes,navigationbuttoncolor=#ffc404');
  }

  async internalPost(data) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      translucent: true,
    });
    await loading.present();
    this.getPostAccess.sendAccess(data).subscribe((res: any) => {
      if (!res) {
        this.presentAlert();
      } else {
        loading.dismiss();
        console.log('/post/', data.id);
        //this.router.navigateByUrl('/post/' + data.id);
        this.router.navigate(['/post', data.id]);
      }
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
    console.log('share', window.location.href);
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

  view(post) {
    this.reactions
      .doView(post)
      .subscribe((response) => {
        console.log('view', response);
      });
  }

  redirect(page) {
    this.navCtrl.navigateForward(page);
  }
}
