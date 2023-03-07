import { Component, OnInit, ViewChild } from '@angular/core';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { AlertController, IonContent, LoadingController, NavController } from '@ionic/angular';
import { ArticleService } from '../../services/explore/article.service';
import { ReactionService } from '../../services/reaction.service';
import { Share } from '@capacitor/share';
import { PostAccessService } from 'src/app/services/post-access.service';

@Component({
  selector: 'app-knowledge',
  templateUrl: './knowledge.component.html',
  styleUrls: ['./knowledge.component.scss'],
})
export class KnowledgeComponent implements OnInit {

  /* data: any = [
    {
      id: 1,
      title: 'El Cliente',
      subtitle: 'Hábitos de compra, tendencias, curiosidades',
      articles: [
        {
          id: 1,
          title: 'Palabras que venden',
          date: '',
          description: 'Te recomendamos un libro lleno de sabiduría y sencillez que nos indica exactamente qué es lo que debemos decir, y en qué circunstancias, para influir en las personas y tener un mayor impacto.',
          short_description: 'Te recomendamos un libro lleno de sabiduría y sencillez.',
          cta: 'Comprar',
          cta_content: 'https://www.amazon.es/Palabras-que-venden-influir-conocimiento/dp/8416997179/ref=asc_df_8416997179/?tag=googshopes-',
          internalRoute: '',
          img: 'knowledge/1.jpg',
          link: '',
        },
        {
          id: 2,
          title: 'Cómo vender seguros aprovechando tus contactos.',
          date: '',
          description: '',
          short_description: 'Te lo contamos en el siguiente post.',
          cta: '',
          cta_content: '',
          internalRoute: '',
          img: 'knowledge/2.jpg',
          link: 'https://www.linkedin.com/pulse/buyer-persona-en-los-seguros-dayza-del-moral/?originalSubdomain=es/',
        },
        {
          id: 3,
          title: 'Eres importante para tus clientes.',
          date: '',
          description: '',
          short_description: 'El experto es la figura clave en la que confían los españoles para adquirir productos financieros/seguros.',
          cta: '',
          cta_content: '',
          internalRoute: '',
          img: 'knowledge/3.jpg',
          link: 'https://www.inese.es/el-perfil-del-cliente-de-seguros-conservador-preocupado-por-sus-finanzas-y-le-gusta-pedir-consejo/',
        },
        {
          id: 4,
          title: 'Y tú… ¿lo entiendes?',
          date: '',
          description: '<p>Seguro que tus clientes hay términos que aún no comprenden. Incluso puede que haya algunos que a ti también se te escapen porque se han visto modificados en los últimos años. Si este es el caso, aquí tienes la guía definitiva, un glosario de términos elaborado por la asociación empresarial del seguro, UNESPA.</p><p>Tras meses de trabajo, el sector ha identificado cuáles son los términos más complejos dentro de la documentación aseguradora habitual y ha buscado para ellos sinónimos o breves explicaciones que puedan entender la totalidad de consumidores.</p>',
          short_description: 'Puede que tus clientes tampoco… Sigue leyendo.',
          cta: 'Descárgatela ya',
          cta_content: 'https://drive.google.com/file/d/1kUPB6098Va09OKE-loq8NKW6Pn3-6LiX/view?usp=sharing',
          internalRoute: '',
          img: 'knowledge/3.jpg',
          link: '',
        },
      ],
    },
    {
      id: 2,
      title: 'El Producto',
      subtitle: 'Tendencias, nuevos productos, comparativas',
      articles: [
        {
          id: 1,
          title: 'La salud es innegociable',
          date: '',
          description: '',
          short_description: 'El deterioro del sistema público de salud puede arrastrar a la sanidad privada.',
          cta: '',
          cta_content: '',
          internalRoute: '',
          img: 'knowledge/4.jpg',
          link: 'https://www.inese.es/el-deterioro-del-sistema-publico-de-salud-puede-arrastrar-a-la-sanidad-privada/',
        },
        {
          id: 2,
          title: 'La obligatoriedad de contratar un seguro de coche, es una oportunidad',
          date: '',
          description: '',
          short_description: '',
          cta: '',
          cta_content: '',
          internalRoute: '',
          img: 'knowledge/6.jpg',
          link: 'https://www.lainformacion.com/economia-negocios-y-finanzas/multa-no-tener-seguro-coche-dinero/2864980/',
        },
        {
          id: 3,
          title: 'Los menores de 40 también contratan seguros',
          date: '',
          description: '',
          short_description: 'La principal ventaja, es que la prima es muy baja.',
          cta: '',
          cta_content: '',
          internalRoute: '',
          img: 'knowledge/4.jpg',
          link: 'https://asociacioneuropea.com/seguros-de-deceso-para-menores-de-40-anos',
        },
      ],
    },
    {
      id: 3,
      title: 'El Trabajo',
      subtitle: 'Consejos, buenas prácticas, ejemplos',
      articles: [
        {
          id: 1,
          title: 'Las primeras impresiones, importan',
          date: '',
          description: '',
          short_description: 'Tu ropa dice mucho de ti.',
          cta: '',
          cta_content: '',
          internalRoute: '',
          img: 'knowledge/2.jpg',
          link: 'https://asociacioneuropea.com/como-vestir-para-vender-seguros',
        },
        {
          id: 2,
          title: 'El comienzo es la parte más importante del trabajo',
          date: '',
          description: '',
          short_description: '6 maneras de comenzar la venta de un seguro.',
          cta: '',
          cta_content: '',
          internalRoute: '',
          img: 'knowledge/2.jpg',
          link: 'https://asociacioneuropea.com/como-vender-seguros',
        },
        {
          id: 3,
          title: 'Los medidadores somos más importantes que nunca',
          date: '',
          description: '',
          short_description: 'Descubre cómo ha cambiado la sociedad y sabrás por qué tu función es más importante que nunca.',
          cta: '',
          cta_content: '',
          internalRoute: '',
          img: 'knowledge/4.jpg',
          link: 'https://www.estamos-seguros.es/aftermask/',
        },
      ],
    },
    {
      id: 4,
      title: 'La Actitud',
      subtitle: 'Conocimiento, constancia, actitud positiva.',
      articles: [
        {
          id: 1,
          title: 'Ser vendedor no está bien visto, ¿verdad?',
          date: '',
          description: '<p>Victor Küppers es conferenciante, formador, consultor, escritor… y sobre todo entusiasta. Cada vez alguien va a alguna conferencia de Vícto, sale con ganas de comerse el mundo, es capaz de transmitirte pasión y entusiasmo tanto por las pequeñas cosas de la vida como por las grandes. Aprendes a dar valor a  las pequeñas cosas, como dice él.</p><p>Hoy te traemos un extracto de un vídeo de Kuppers, sobre el que habla de ser vendedor y sus disficultades. ¿Te sientes identificado?</p>',
          short_description: 'Victor Kuppers nos habla del trabajo del vendedor',
          cta: 'Ver a Victor Kuppers',
          cta_content: 'https://www.youtube.com/watch?v=LheaR9NnsiA',
          internalRoute: '',
          img: 'knowledge/2.jpg',
          link: '',
        },
        {
          id: 2,
          title: 'Empieza el día con fuerza',
          date: '',
          description: '<p>El Lobo de Wall Street es una de esas películas que ha dado que hablar. Para unos, una cinta brillantemente pensada y dirigida, protagonizada de forma impecable por Leo Dicaprio. Para otros, tres horas de desenfreno, drogas y palabras malsonantes, sin mucho sentido.</p><p>Lo que es indudable es que ésta escena que te recomendamos, es una dosis de energía. Te recomendamos que te la pongas antes de abrir Salesforce y comenzare tu jornada. No te dejará indiferente ;)</p><p>P.D.: para poder acceder a ello, lógate con tu usuario y contraseña de SECI</p>',
          short_description: 'Motivación para comenzar el día con fuerza',
          cta: 'Quiero animarme',
          cta_content: 'https://elcorteingles-my.sharepoint.com/:v:/g/personal/comunicacionescomercialesseci_info_seguroseci_es/ES4A4bFJLeFNqEZ5rR5R5PUB8nj5HZ-TG5YW1gUV6DIRrw?e=1bpj4j',
          internalRoute: '',
          img: 'knowledge/5.jpg',
          link: '',
        },
        {
          id: 3,
          title: 'Pueden porque creen que pueden',
          date: '',
          description: '',
          short_description: 'Álex Rovira sobre el valor de la actitud…',
          cta: '',
          cta_content: '',
          internalRoute: '',
          img: 'knowledge/5.jpg',
          link: 'https://www.youtube.com/watch?v=rsztkM2V2SQ',
        },
        {
          id: 4,
          title: 'Te recomendamos: En Busca de la Felicidad',
          date: '',
          description: '<p>¿Qué podemos aprender de la película En Busca de la Felicidad?</p><p>La superación, la paciencia, saber valorarse, no caer ni deprimirnos. La historia, basada en el recorrido vital de Chris Gardner, hace un conjunto de moralejas encaminadas a insuflar ánimo.</p><p>1) Sigue a alguien a quien admires. Es preciso conocer y reconocer otras situaciones análogas a las tuyas en otros personajes, sea una persona conocida o anónima, donde puedas identificar tus dones y fortalezas y absorber la inspiración que trasmita.</p><p>2) No te dejes incluenciar por malos pensamientos. Durante tu vida, podrás encontrarte gente frustrada, amargada y acomplejada, y tratarán que tú creas que eres igual que ellos. Pero todo lo bueno y malo que te ocurra dependerá de ti mismo.</p><p>3) Pon la mjor actitud y trabaja duro. Mantén tu pensamiento enfocado en aquellas cosas que permitieron conseguir metas en el pasado. Además, las cosas no llegan porque sí ni de casualidad, sino que es un trabajo constante en el que debemos orientar nuestra vida y acciones hacia lo que deseamos. Quien la sigue la consigue.</p>',
          short_description: '¿Qué podemos aprender de la película En Busca de la Felicidad?',
          cta: 'Ver la película',
          cta_content: 'https://www.netflix.com/es/title/70044605?source=35',
          internalRoute: '',
          img: 'knowledge/2.jpg',
          link: '',
        },
      ],
    },
    {
      id: 5,
      title: 'El Entorno',
      subtitle: 'Macroeconómico, legal, social.',
      articles: [
        {
          id: 1,
          title: 'Hay una oportunidad',
          date: '',
          description: '',
          short_description: 'Sector Seguros: Año 1 después de la pandemia (10 IESE Insurance)',
          cta: '',
          cta_content: '',
          internalRoute: '',
          img: 'knowledge/4.jpg',
          link: 'https://www.youtube.com/watch?v=x9t1XBkFFx8',
        },
        {
          id: 2,
          title: 'Planificar es más importante que nunca',
          date: '',
          description: '',
          short_description: 'Nueva regulación fiscal y planes de pensiones.',
          cta: '',
          cta_content: '',
          internalRoute: '',
          img: 'knowledge/6.jpg',
          link: 'https://cincodias.elpais.com/cincodias/2021/10/22/fondos_y_planes/1634909570_201415.html',
        },
        {
          id: 3,
          title: 'La facturación del seguro crece',
          date: '',
          description: '',
          short_description: 'Información del sector para que estés al día',
          cta: '',
          cta_content: '',
          internalRoute: '',
          img: 'knowledge/3.jpg',
          link: 'https://www.unespa.es/notasdeprensa/negocio-asegurador-marzo-2022/',
        },
      ],
    },
    {
      id: 6,
      title: 'El Competidor',
      subtitle: 'Ventajas competitivas, análisis, comparativas',
      articles: [
        {
          id: 1,
          title: 'Los "game changers" del sector asegurador',
          date: '',
          description: '',
          short_description: 'Lo grandes disruptores tecnológicos son los que cambian las reglas de juego',
          cta: '',
          cta_content: '',
          internalRoute: '',
          img: 'knowledge/4.jpg',
          link: 'https://www2.deloitte.com/es/es/pages/operations/articles/game-changers-sector-asegurador.html',
        },
        {
          id: 2,
          title: 'Insurtech es la unión de las palabras insurance y technology',
          date: '',
          description: '',
          short_description: 'Mayor inversión, madurez del mercado, tecnología como base de las tendencias',
          cta: '',
          cta_content: '',
          internalRoute: '',
          img: 'knowledge/4.jpg',
          link: 'https://www.elmundofinanciero.com/noticia/101454/empresas/la-inversion-en-insurtech-supera-los-10.000-millones-y-aumenta-un-38-comparado-con-2020.html',
        },
        {
          id: 3,
          title: 'La competencia por la transformación digital de las empresas',
          date: '',
          description: '',
          short_description: '"No es la especie más fuerte la que sobrevive, ni la más inteligente. Es la que más se adapta al cambio"',
          cta: '',
          cta_content: '',
          internalRoute: '',
          img: 'knowledge/6.jpg',
          link: 'https://www.ekosnegocios.com/articulo/la-competencia-por-la-transformacion-digital-de-las-empresas',
        },
      ],
    },
    {
      id: 7,
      title: 'La Compañía',
      subtitle: 'El Grupo, su cultura, una marca líder y referencia en España.',
      articles: [
        {
          id: 1,
          title: '¿Conoces la sede Central de El Corte Inglés Seguros?',
          date: '',
          description: '<p>Apolo ofendió a Eros diciendo que sus flechas no servían más que para herir a los enamoradizos. En respuesta, le hirió con una flecha dorada, que hizo que Apolo se enamorara prendidamente de Dafne. A la vez, le lanzó a ella una con punta de plomo que le provocó una honda repulsión hacia Apolo. Cuando acudió a cortejar a Dafne, esta echó a correr horrorizada e imploró desesperada al río Ladón que hiciera desaparecer su cuerpo. Sus pies se metieron en el suelo como raíces su piel se convirtió en corteza y su pelo en hojas. Toda ella acabó convirtiéndose en el árbol del laurel. A pesar de todo, Apolo siguió enamorado de ella y declaró que sería el árbol sagrado de su deidad y que, en adelante, se coronaría a los triunfadores con hojas de laurel.<p><p>En octubre de 2018, el Edificio Laurel pasa a ser el de El Corte Inglés Seguros, para que no olvidemos que siempre debemos perseguir la suerte de los triunfadores: trabajo duro, inteligencia y equipo.</p>',
          short_description: 'El edificio Laurel es la sede Central de El Corte Inglés Seguros. Conoce su historia',
          cta: 'Conoce más',
          cta_content: 'https://www.elcorteingles.es/empresas/reforma-edificio-laurel/',
          internalRoute: '',
          img: 'knowledge/6.jpg',
          link: '',
        },
        {
          id: 2,
          title: 'Comprometidos con la sociedad',
          date: '',
          description: '',
          short_description: 'El Corte Inglés es una empresa comprometida con la sociedad y por ello mantiene una relación de cercanía con las personas',
          cta: '',
          cta_content: '',
          internalRoute: '',
          img: 'knowledge/3.jpg',
          link: 'https://www.elcorteingles.es/informacioncorporativa/es/rsc/compromiso-sociedad/',
        },
        {
          id: 3,
          title: 'Un paseo por el tiempo',
          date: '',
          description: '',
          short_description: 'Formas parte de un grupo con más de 80 años de historia. ¡Conócela!',
          cta: '',
          cta_content: '',
          internalRoute: '',
          img: 'knowledge/3.jpg',
          link: 'https://www.elcorteingles.es/informacioncorporativa/es/quienes-somos/historia-del-grupo/un-paseo-por-el-tiempo/',
        },
      ],
    },
  ]; */

  posts;
  visited;

  @ViewChild(IonContent, { static: false }) content: IonContent;

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
  }

  ionViewDidEnter() {
    this.getArticles();
  }

  getArticles() {
    this.articleService.articleList('Conocimiento')
      .subscribe((res: any) => {
        console.log('knowledge', res);
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

  externalPost(url) {
    this.iab.create(url, '_self', 'beforeload=yes,location=yes,clearcache=yes,navigationbuttoncolor=#ffc404');
  }

  async internalPost(article) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      translucent: true,
    });
    await loading.present();
    this.getPostAccess.sendAccess(article).subscribe((res: any) => {
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
}

