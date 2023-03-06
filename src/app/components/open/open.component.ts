import { Component, OnInit } from '@angular/core';
import { ActivationEnd, NavigationStart, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-open',
  templateUrl: './open.component.html',
  styleUrls: ['./open.component.scss'],
})
export class OpenComponent implements OnInit {

  activeMenu: boolean = false;

  constructor(
    public menuCtrl: MenuController,
    private router: Router,
  ) {

  }

  ngOnInit() {
  }

  toggleMenu() {
    this.menuCtrl.toggle();
  }
}
