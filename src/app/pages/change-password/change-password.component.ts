import { Component, OnInit } from '@angular/core';
import { LoadingController, MenuController, NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { NewPasswordServiceService } from 'src/app/services/new-password-service.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  error;
  ok;
  loading;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    private changePasswords: NewPasswordServiceService,
    private loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
    this.error = ""
    this.ok = ""
   }

  redirect(page) {
    this.navCtrl.navigateForward(page);
  }


  toggleMenuAccess() {
    this.menuCtrl.toggle();
  }
  oldTextFieldType: boolean;
  ismyTextFieldType: boolean;

  togglemyNewPasswordFieldType() {
    //    $event.stopPropagation();
    return this.ismyTextFieldType = !this.ismyTextFieldType;
  }
  togglemyOldPasswordFieldType() {
    return this.oldTextFieldType = !this.oldTextFieldType;
  }

  async send(info) {
    this.error = '';
    this.ok = '';
    // console.log(info);
    if (!info.old_password) {
      console.log(info.old_password);
      this.error = 'El campo de contraseña anterior no puede estar vacio.';
      return;
    }
    const loading = await this.loadingCtrl.create({
      message: 'Enviando...',
      translucent: true,
    });
    await loading.present();
    
    this.changePasswords.send(info).subscribe((res: any) => {
      if (res.status != 202) {
        let errorMessage = res.message.replace('new password', 'contraseña nueva');
        this.error = errorMessage;
      } else {
        this.ok = res.message;
      }
      loading.dismiss();
    }, (err: any) => {
          loading.dismiss();
          this.error = "No se ha podido cambiar la contraseña, intente nuevamente."
      });
  }
}