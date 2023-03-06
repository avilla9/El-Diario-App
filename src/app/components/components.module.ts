import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionComponent } from './section/section.component';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { TabsComponent } from './tabs/tabs.component';
import { StoryComponent } from './story/story.component';
import { OpenComponent } from './open/open.component';
import { ModalMessageComponent } from '../pages/modal-message/modal-message.component';


@NgModule({
  declarations: [
    SectionComponent,
    HeaderComponent,
    MenuComponent,
    TabsComponent,
    StoryComponent,
    OpenComponent,
    ModalMessageComponent
  ],
  exports: [
    SectionComponent,
    HeaderComponent,
    MenuComponent,
    TabsComponent,
    OpenComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
  ]
})
export class ComponentsModule { }
