import { Component, Input, OnInit } from '@angular/core';
import { NavigationStart, Router, NavigationEnd, GuardsCheckEnd, ResolveStart } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {
  show: boolean = false;
  unShow: any = ['login', 'get-email', 'forgot-password'];

  constructor(
    public navCtrl: NavController,
    private router: Router
  ) {
    router.events.subscribe((val: any) => {
      if (val instanceof ResolveStart) {
        if (!this.unShow.includes(val.url.split('/')[1])) {
          this.show = true;
        } else {
          this.show = false;
        }
      }
    });
  }

  ngOnInit() { }
}