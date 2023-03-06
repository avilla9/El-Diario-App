import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ExploreComponent } from './explore/explore.component';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../components/components.module';
import { PostComponent } from './post/post.component';
import { SharedDirectivesModule } from '../directives/shared-directives.module';
import { AdoptionComponent } from './adoption/adoption.component';
import { CampaignComponent } from './campaign/campaign.component';
import { RewardsComponent } from './rewards/rewards.component';
import { RoomsComponent } from './rooms/rooms.component';
import { AccessComponent } from './access/access.component';
import { ChartsModule } from 'ng2-charts';
import { HeaderComponent } from '../components/header/header.component';
import { PostListComponent } from './post-list/post-list.component';
import { KnowledgeComponent } from './knowledge/knowledge.component';
import { RoomListComponent } from './room-list/room-list.component';
import { MailboxComponent } from './mailbox/mailbox.component';
import { AlertsComponent } from './alerts/alerts.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SettingsComponent } from "./settings/settings.component";
import { ChangePasswordComponent } from './change-password/change-password.component';

import { GetEmailPasswordComponent } from './get-email-password/get-email-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const ENTRYCOMPONENTS = [
  AdoptionComponent,
  CampaignComponent,
  RewardsComponent,
  RoomsComponent,
  AccessComponent,
  KnowledgeComponent,
  SettingsComponent,
  ChangePasswordComponent
];

const COMPONENTS = [ExploreComponent];

@NgModule({
  declarations: [
    HomeComponent,
    PostComponent,
    PostListComponent,
    RoomListComponent,
    MailboxComponent,
    AlertsComponent,
    LoginComponent,
    GetEmailPasswordComponent,
    ForgotPasswordComponent,
    COMPONENTS,
    ENTRYCOMPONENTS,
    /* ExploreComponent,
    AdoptionComponent,
    CampaignComponent,
    RewardsComponent,
    RoomsComponent,
    AccessComponent, */
  ],
  imports: [
    CommonModule,
    IonicModule,
    ComponentsModule,
    SharedDirectivesModule,
    ChartsModule,
    ReactiveFormsModule,
  ]
})
export class PagesModule { }
