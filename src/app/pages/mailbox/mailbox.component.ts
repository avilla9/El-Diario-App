import { Component, OnInit } from '@angular/core';
import { LoadingController, MenuController } from '@ionic/angular';
import { MailService } from '../../services/mail.service';

@Component({
  selector: 'app-mailbox',
  templateUrl: './mailbox.component.html',
  styleUrls: ['./mailbox.component.scss'],
})
export class MailboxComponent implements OnInit {
  error;
  ok;
  loading;

  constructor(
    public menuCtrl: MenuController,
    private mail: MailService,
    private loadingCtrl: LoadingController,
  ) { }

  ngOnInit() { }

  toggleMenu() {
    this.menuCtrl.toggle();
  }

  async send(info) {
    let error = '';

    if (!info.type?.length) {
      error = 'Debe seleccionar una Sugerencia/Incidencia';
    } else if (!info.agent_code.length) {
      error = 'Debe ingresar su código de agente';
    } else if (!info.message.length) {
      error = 'Debe ingresar un mensaje';
    }

    if (error.length) {
      console.log(error)
      this.error = error;
    } else {
      const loading = await this.loadingCtrl.create({
        message: 'Enviando...',
        translucent: true,
      });
      await loading.present();
      this.loading = true;
      this.error = '';

      this.mail.send(info).subscribe((res: any) => {
        loading.dismiss();
        this.loading = false;
        this.ok = 'Mensaje enviado';
      }, (err: any) => {
        loading.dismiss();
        this.loading = false;
        this.error = 'Ha habido un error al enviar el mensaje';
      });
    }
  }

}
