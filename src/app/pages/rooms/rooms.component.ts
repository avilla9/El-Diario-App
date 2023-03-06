import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { NavController, IonRouterOutlet, AlertController } from '@ionic/angular';
import { ArticleService } from '../../services/explore/article.service';
import { ReactionService } from '../../services/reaction.service';
import { Share } from '@capacitor/share';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit {
  visited: any;
  posts: any /* = [
    {
      title: 'TOP DELEGADOS',
      description: 'Información para ti y sobre tus agentes, ¿sabes para qué? ¡Pues claro! ¡Para que hables con ellos! ;)',
      img: 'post-list1.jpg',
      authorized: false,
      articles: [
        {
          id: 1,
          title: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
          date: '23 de abril de 2022',
          description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum',
          short_description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
          cta: '',
          cta_content: '',
          internalRoute: '',
          img: '1.jpg',
          link: '',
        },
        {
          id: 2,
          title: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
          date: '23 de abril de 2022',
          description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum',
          short_description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
          cta: '',
          cta_content: '',
          internalRoute: '',
          img: '2.jpg',
          link: 'https://es.wikipedia.org/wiki/Titanic_(pel%C3%ADcula_de_1997)',
        },
        {
          id: 3,
          title: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
          date: '23 de abril de 2022',
          description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum',
          short_description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
          cta: '',
          cta_content: '',
          internalRoute: '',
          img: '3.jpg',
          link: '',
        },
        {
          id: 4,
          title: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
          date: '23 de abril de 2022',
          description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum',
          short_description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
          cta: '',
          cta_content: '',
          internalRoute: '',
          img: '4.jpg',
          link: '',
        },
        {
          id: 5,
          title: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
          date: '23 de abril de 2022',
          description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum',
          short_description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
          cta: '',
          cta_content: '',
          internalRoute: '',
          img: '5.jpg',
          link: '',
        },
        {
          id: 6,
          title: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
          date: '23 de abril de 2022',
          description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum',
          short_description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
          cta: '',
          cta_content: '',
          internalRoute: '',
          img: '6.jpg',
          link: '',
        },
        {
          id: 7,
          title: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
          date: '23 de abril de 2022',
          description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum',
          short_description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
          cta: '',
          cta_content: '',
          internalRoute: '',
          img: '7.jpg',
          link: '',
        }
      ],
    },
    {
      title: 'TOP AGENTES',
      description: 'Pues si, si puedes entrar aquí es que eres el MVP de tu delegación.',
      img: 'post-list4.jpg',
      authorized: true,
      articles: [
        {
          id: 1,
          title: 'Persuade con tu voz',
          date: '',
          description: '',
          short_description: 'La importancia de sonar creíble y como conseguirlo, ¡clave para tu éxito comercial!',
          cta: '',
          cta_content: '',
          internalRoute: '',
          img: 'rooms/1.jpg',
          link: 'https://www.youtube.com/watch?v=YlI-e4QJWG0',
        },
      ],
    },
    {
      title: 'AGENTES EN FORMACIÓN',
      description: 'Dicen que el conocimiento no ocupa lugar y todo lo que encontrarás aquí, ¡tampoco!',
      img: 'post-list3.jpg',
      authorized: false,
      articles: [
        {
          id: 1,
          title: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
          date: '23 de abril de 2022',
          description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum',
          short_description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
          cta: '',
          cta_content: '',
          internalRoute: '',
          img: '1.jpg',
          link: '',
        },
        {
          id: 2,
          title: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
          date: '23 de abril de 2022',
          description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum',
          short_description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
          cta: '',
          cta_content: '',
          internalRoute: '',
          img: '2.jpg',
          link: 'https://es.wikipedia.org/wiki/Titanic_(pel%C3%ADcula_de_1997)',
        },
        {
          id: 3,
          title: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
          date: '23 de abril de 2022',
          description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum',
          short_description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
          cta: '',
          cta_content: '',
          internalRoute: '',
          img: '3.jpg',
          link: '',
        },
        {
          id: 4,
          title: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
          date: '23 de abril de 2022',
          description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum',
          short_description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
          cta: '',
          cta_content: '',
          internalRoute: '',
          img: '4.jpg',
          link: '',
        },
        {
          id: 5,
          title: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
          date: '23 de abril de 2022',
          description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum',
          short_description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
          cta: '',
          cta_content: '',
          internalRoute: '',
          img: '5.jpg',
          link: '',
        },
        {
          id: 6,
          title: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
          date: '23 de abril de 2022',
          description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum',
          short_description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
          cta: '',
          cta_content: '',
          internalRoute: '',
          img: '6.jpg',
          link: '',
        },
        {
          id: 7,
          title: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
          date: '23 de abril de 2022',
          description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum',
          short_description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
          cta: '',
          cta_content: '',
          internalRoute: '',
          img: '7.jpg',
          link: '',
        }
      ],
    },
  ]; */

  constructor(
    public navCtrl: NavController,
    public routerOutlet: IonRouterOutlet,
    public alertController: AlertController,
    private iab: InAppBrowser,
    private articleService: ArticleService,
    private reactions: ReactionService,
    private authService: AuthService,
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
      this.externalPost(article.external_link)
    } else {
      localStorage.removeItem('post');
      this.internalPost(article)
    }
  }

  like(post, event) {
    console.log('event', event);
    var target = event.target || event.srcElement || event.currentTarget;
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

    console.log(this.visited)
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
    this.navCtrl.navigateForward("/room-list");
  }

  async showAlert() {
    var mapUrl = '../../../assets/images/unauth.gif';
    const alert = await this.alertController.create({
      message: `<div class="unauth-title">¡En esta no puedes entrar!</div> <img src="${mapUrl}" class="unauth-alert">`,
      buttons: ['Cerrar']
    });
    await alert.present();
  }

  checkAuth(post) {
    this.authService.checkLevel()
      .subscribe((res: any) => {
        console.log(res, post.section);
        console.log(res.role_name.toLowerCase())
        let role = res.role_name.toLowerCase();

        switch (role) {
          case 'super usuario':
            this.clickPost(post);
            break;

          case 'agente veterano':
            this.clickPost(post);
            break;

          case 'agente':
            this.clickPost(post);
            break;

          case 'delegado':
            if (post.section === 'TOP DELEGADOS') {
              this.clickPost(post);
            } else {
              this.showAlert();
            }
            break;

          case 'agente en formación':
            if (post.section === 'AGENTES EN FORMACIÓN') {
              this.clickPost(post);
            } else {
              this.showAlert();
            }
            break;

          default:
            this.showAlert();
            break;
        }
      });
  }
}
