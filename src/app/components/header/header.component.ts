import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(public menuCtrl: MenuController, public navCtrl: NavController) { }

  ngOnInit() { }

  toggleMenu() {
    this.menuCtrl.toggle();
  }

  goBack() {
    this.navCtrl.back();
  }
}
