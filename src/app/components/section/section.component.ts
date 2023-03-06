import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { PostAccessService } from 'src/app/services/post-access.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent implements OnInit {

  constructor(
    private router: Router,
    public navCtrl: NavController,
    private iab: InAppBrowser,
    private getPostAccess: PostAccessService,
    private loadingCtrl: LoadingController,
    private alertController: AlertController,
  ) { }

  ngOnInit() { }

  clickPost(id) {
    let data = {};
    localStorage.removeItem('post');

    switch (id) {
      case 1:
        this.externalPost('https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkcy5hY2FzdC5jb20vcHVibGljL3Nob3dzLzE1MWI1MmIyLWNjOWEtNTQzZS05Zjk3LWMyNzk1MTk0M2I2OQ/episode/NjIzNGVmMTkxNTJjN2EwMDEyZjVmM2Fj?sa=X&ved=0CAUQkfYCahcKEwiwuazF85j3AhUAAAAAHQAAAAAQCg&hl=es');
        break;

      case 2:
        this.externalPost('https://www.estamos-seguros.es/los-clientes-seguros-vida/');
        break;

      case 3:
        data = {
          'title': 'Y tú… ¿lo entiendes?',
          'date': '',
          'description': 'Seguro que tus clientes hay términos que aún no comprenden. Incluso puede que haya algunos que a ti también se te escapen porque se han visto modificados en los últimos años. Si este es el caso, aquí tienes la guía definitiva, un glosario de términos elaborado por la asociación empresarial del seguro, UNESPA.',
          'cta': 'Descárgatela ya',
          'cta_content': 'https://www.estamos-seguros.es/main-files/uploads/2019/04/Te%CC%81rminos.pdf',
          'internal_route': '',
          'img': '3.jpg'
        };
        this.internalPost(data);
        break;

      case 4:
        this.externalPost('https://www.cyberclick.es/curso-transformacion-digital-equipos-ventas');
        /* this.externalPost('https://www.estamos-seguros.es/main-files/uploads/2019/04/Te%CC%81rminos.pdf');
        break; */

      case 5:
        this.externalPost('https://www.cualifica2.es/cursos/curso-gratis-tecnologias-ventas-atencion-al-cliente');
        break;

      case 6:
        this.externalPost('https://www.linkedin.com/learning/habilidades-blandas-para-profesionales-de-las-ventas/la-importancia-de-las-habilidades-blandas-para-especialistas-en-ventas?autoplay=true');
        break;

      case 7:
        data = {
          'title': '¿Has visto todo lo que tenemos para ti?',
          'date': '25 de Abril de 2021',
          'description': 'Esta aplicación es para ti, para que puedas conocer todas las campañas en las que estás participando, para que sepas, quieras y puedas adoptar una nueva herramienta, para que seas recompensado, para que accedas a contenido exclusivo para ti, por ser tú... Descubre todo lo que tiene, explórala, ¡úsala en tu día a día, te ayudará a lograr el éxito comercial que estás buscando!',
          'cta': 'Explora',
          'cta_content': '',
          'cta_intern_link': '/explora',
          'internal_route': 'explora',
          'img': '7.jpg'
        }
        this.internalPost(data);
        break;

      default:
        break;
    }
  }

  externalPost(url) {
    /* window.open(url, '_system'); */
    this.iab.create(url, '_self', 'beforeload=yes,location=yes,clearcache=yes,navigationbuttoncolor=#ffc404');
  }

  async internalPost(data) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      translucent: true,
    });
    await loading.present();
    this.getPostAccess.sendAccess(data).subscribe((res: any)  => {
      if (res == 0) {  
        // console.log(res, "No puedes entrar");
        this.presentAlert();
        }
      else {
        localStorage.setItem('post', JSON.stringify(data)); 
        this.navCtrl.navigateForward("/post" + "/" + data.id);
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
