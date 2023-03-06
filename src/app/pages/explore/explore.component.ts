import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AdoptionComponent } from '../adoption/adoption.component';
import { CampaignComponent } from '../campaign/campaign.component';
import { RewardsComponent } from '../rewards/rewards.component';
import { RoomsComponent } from '../rooms/rooms.component';
import { AccessComponent } from '../access/access.component';
import { KnowledgeComponent } from '../knowledge/knowledge.component';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
})
export class ExploreComponent implements OnInit {
  @ViewChild('pageContainer', { read: ViewContainerRef }) pageContainer;
  activeTab = 0;
  currentTitle: string;

  tabs = [
    {
      component: CampaignComponent,
      title: 'Campaña',
      icon: 'add.svg',
    },
    {
      component: AdoptionComponent,
      title: 'Adopción',
      icon: 'adopta.svg',
    },
    {
      component: KnowledgeComponent,
      title: 'Conocimiento',
      icon: 'head.svg',
    },
    {
      component: RewardsComponent,
      title: 'Recompensas',
      icon: 'like.svg',
    },
    {
      component: RoomsComponent,
      title: 'Salas',
      icon: 'estrella.svg',
    },
  ]

  constructor(
    public menuCtrl: MenuController,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (localStorage.getItem('lastTab')) {
      this.changeTab(parseInt(localStorage.getItem('lastTab')));
    } else {
      this.changeTab(0);
    }
  }
  
  /* ionViewWillLeave() {
    this.menuCtrl.getMenus().then((menu) => {
      console.log('menu explore', menu);
      menu.splice(0, 1);
      console.log('menu explore after', menu);
      
      if (menu.length > 1) {
        menu.splice(1, 1);
        menu[0].disabled = false;
        console.log('menu explore after', menu);
      }
    })
  } */

  changeTab(pos) {
    localStorage.setItem('lastTab', pos);
    this.activeTab = pos;
    this.currentTitle = this.tabs[pos].title;
    this.pageContainer.clear();
    this.pageContainer.createComponent(this.tabs[pos].component);
  }

  toggleExplore() {
    this.menuCtrl.toggle();
  }
}
