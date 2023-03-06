import { Component, OnInit, ViewChild } from '@angular/core';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { AlertController, IonContent, LoadingController, NavController } from '@ionic/angular';
import { ArticleService } from '../../services/explore/article.service';
import { ReactionService } from '../../services/reaction.service';
import { Share } from '@capacitor/share';
import { PostAccessService } from 'src/app/services/post-access.service';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.scss'],
})
export class RewardsComponent implements OnInit {

  /* data: any = [
    {
      id: 1,
      title: 'Challenge you',
      custom_class: 'challenge-you',
      subtitle: '¿Serás capaz de superarlos todos?',
      articles: [
        {
          id: 1,
          title: 'Adivina la palabra',
          created_at: '2022/08/03 12:00',
          description: 'A la hora de realizar una venta, lo más importante eres tú. Debes conocer a tu cliente (o futuro cliente) para poder ofrecerle el producto más adecuado. Saber aquello que más le preoputa, saber qué es lo que más le importa… Vendes seguros. Ayudas a las perdonas a protegerse y proteger a los suyos. Por eso, lo más importante es que tú no vendes, sino que conviertes los problemas en.... ???????',
          short_description: 'Te retamos a adivinar la palabra que se esconde detrás y gana 20 SECI COINS.',
          cta: 'Quiero resolver',
          cta_content: 'https://wordle.danielfrg.com/personalizada/?p=U2FsdGVkX1%2Bfw3dMvE%2BWA9uTjWMuGrchprBNM51w%2B0c%3D&t=false',
          internalRoute: '',
          img: '../../../assets/images/rewards/1.png',
          link: '',
          link_short_description: 'https://www.google.com/',
        },
        {
          id: 2,
          title: 'El desafío',
          created_at: '2022/08/03 12:00',
          description: '<p>Un hombre vive en el décimo piso de un edificio. Cada día coge el ascensor hasta la planta baja para ir al trabajo. Cuando vuelve, siempre sube en el ascensor hasta el séptimo piso y luego por las escaleras los restantes tres pisos hasta su apartamento, en el décimo. ¿Por qué lo hace?</p><p>Envíanos la respuesta a través del buzón que encontrarás en el menú</p>',
          short_description: 'Te lanzamos un reto que pondrá a prueba tu capacidad para pensar de otra manera. Resuelve el acertijo y gana 15 SECI COINS',
          cta: '',
          cta_content: '',
          internalRoute: '',
          img: '../../../assets/images/rewards/2.png',
          link: '',
        },
        {
          id: 3,
          title: 'El intruso',
          created_at: '2022/08/03 12:00',
          description: 'Hay algo en la aplicación que no debería estar… Si eres capaz de encontrarlo, dinos qué es a través del buzón que encontrarás en el menú y ganarás 30 SECI COINS',
          short_description: 'Hay algo en la aplicación que no debería estar. ¿Serás capaz de encontrarlo?',
          cta: '',
          cta_content: '',
          internalRoute: '',
          img: '../../../assets/images/rewards/3.png',
          link: '',
          link_short_description: 'https://www.google.com/',
        },
      ],
    },
    {
      id: 2,
      title: 'Share today',
      custom_class: 'learn-today',
      subtitle: 'Comparte y gana SECI COINs por ello.',
      articles: [
        {
          id: 1,
          title: 'Compartir genera valor',
          created_at: '2022/08/03 12:00',
          description: 'Comparte la APP con tus compañeros y gana 30 SECI COINs por cada uno que se los descargue. Solo una condicioón: tienen que ser nuevos usuarios ;)',
          short_description: 'Comparte la APP y gana SECI COINs',
          cta: '',
          cta_content: '',
          internalRoute: '',
          img: '../../../assets/images/rewards/4.png',
          link: '',
          link_short_description: 'https://www.google.com/',
        },
        {
          id: 2,
          title: 'Compartir es vivir',
          created_at: '2022/08/03 12:00',
          description: 'Comparte 10 de los artículos que publiquemos este mes y ganarás 20 SECI COINs. ¡No pierdas la oportunidad!',
          short_description: 'Comparte 10 artículos este mes',
          cta: '',
          cta_content: '',
          internalRoute: '',
          img: '../../../assets/images/rewards/5.png',
          link: '',
        },
      ],
    },
    {
      id: 3,
      title: 'Love today',
      custom_class: 'wall-of-fame',
      subtitle: 'Dinos lo que te gusta y gana SECI COINs por hacerlo!',
      articles: [
        {
          id: 1,
          title: 'Dale mucho amor',
          created_at: '2022/08/03 12:00',
          description: 'Dale a like a 10 de los artículos que publiquemos este mes y ganarás 20 SECI COINs. ¡No pierdas la oportunidad!',
          short_description: 'Dale like a 10 artículos este mes',
          cta: '',
          cta_content: '',
          internalRoute: '',
          img: '../../../assets/images/rewards/6.png',
          link: '',
          link_short_description: 'https://www.google.com/',
        },
        {
          id: 2,
          title: 'En busca y captura del agente más molón',
          created_at: '2022/08/03 12:00',
          description: '<p>Ese agente que tiene un don innato para hacer reír al cliente, incluso cuando está de bajón. Que se acuerda de su cumpleaños, del de sus hijos, del de su suegra. Que se pone en sus zapatos, sabe detectar necesidades y ofrece el producto adecuado, en el momento adecuado porque conoce realmente a su cliente. ESE AGENTE.</p><p>Seguro que al leer esto, algún compañero tuyo de la delegación te ha venido a la cabeza. Dinos quién es y por qué has pensado en él. Recogeremos todas las respuestas, las analizaremos y seleccionaremos al mejor candidato, por lo que cuanto más lo describas, ¡mejor!. Si tu compañero resulta seleccionado, ganaréis 30 SECI COINs cada uno y esa persona tendrá una mención muy muy muy especial.</p><p>Envíanoslo a comunicacionescomercialesSECI@info.seguroseci.es</p>',
          short_description: 'Vota ahora!',
          cta: '',
          cta_content: '',
          internalRoute: '',
          img: '../../../assets/images/rewards/7.png',
          link: '',
        },
        {
          id: 3,
          title: '¿Qué incentivo es el más motivante para ti?',
          created_at: '2022/08/03 12:00',
          description: '',
          short_description: '¡Vota!',
          cta: '',
          cta_content: '',
          internalRoute: '',
          img: '../../../assets/images/rewards/8.png',
          link: 'https://forms.office.com/Pages/ResponsePage.aspx?id=Vg4G2kZeXUeLdF-xh70hd_D23D1WFdZAgOfsu8ngH2dUNFFaWTdGSUlWOUY1OUVLVVlKRTFJUEZLVC4u',
          link_short_description: 'https://www.google.com/',
        },
      ],
    },
    {
      id: 4,
      title: 'Happy box',
      custom_class: 'happy-box',
      subtitle: '',
      articles: [],
    },
  ]; */

  @ViewChild(IonContent, { static: false }) content: IonContent;
  posts: any;
  visited: any;
  user: any;

  scrollToLabel(label) {
    console.log(label);
    var id = document.getElementById(label);
    this.content.scrollToPoint(0, id.offsetTop - 10, 700)
  }

  constructor(
    public navCtrl: NavController,
    private iab: InAppBrowser,
    private articleService: ArticleService,
    private reactions: ReactionService,
    private getPostAccess: PostAccessService,
    private loadingCtrl: LoadingController,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.getArticles();
    this.user = JSON.parse(localStorage.getItem('user'));
    // console.log(this.user);
  }

  ionViewDidEnter() {
    this.getArticles();
  }

  getArticles() {
    this.articleService.articleList('Recompensas')
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
