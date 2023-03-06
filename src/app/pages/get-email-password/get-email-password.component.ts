import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule, RequiredValidator, EmailValidator } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { RecoverPasswordService } from 'src/app/services/password/recover-password.service';
import { ModalMessageComponent } from '../modal-message/modal-message.component';

@Component({
  selector: 'app-get-email-password',
  templateUrl: './get-email-password.component.html',
  styleUrls: ['./get-email-password.component.scss'],
})
export class GetEmailPasswordComponent implements OnInit {

  error: string = '';
  date = new Date().getFullYear();
  formPassword = this.fb.group({
    email: ['', {
      validators: [
        Validators.required,
        Validators.email
      ],
      updateOn: 'blur'
    }],
  });

  constructor(
    private fb: FormBuilder,
    private recoveryPassword: RecoverPasswordService,
    private modalCtrl: ModalController,
    private router: Router,
  ) { }

  ngOnInit(): void { }

  getEmail(): void {
    this.error = '';
    if (!this.formPassword.controls['email'].valid) {
      this.error = 'Debe ingresar un email válido';
      return;
    }

    let body = {
      email: this.formPassword.value['email'],
      origin: window.location.hostname + '/forgot-password'
    }

    this.recoveryPassword.emailExists(body).subscribe((response) => {
      if (response.status !== 202) {
        this.error = response.errors['email'];
      } else {
        this.showModal(this.formPassword.value['email']);
      }
    });
  }

  async showModal(email) {
    const modal = await this.modalCtrl.create({
      component: ModalMessageComponent,
      backdropDismiss: true,
      swipeToClose: true,
      animated: true,
      componentProps: {
        message: 'Se ha enviado un enlace para reestablecer la contraseña al correo: ' + email,
      }
    });

    modal.onWillDismiss().then(data => {
      this.router.navigate(['/']);
    });

    return await modal.present();
  }
}
