import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ExploreComponent } from './pages/explore/explore.component';
import { PostComponent } from './pages/post/post.component';
import { PostListComponent } from './pages/post-list/post-list.component';
import { RoomListComponent } from './pages/room-list/room-list.component';
import { MailboxComponent } from './pages/mailbox/mailbox.component';
import { AlertsComponent } from './pages/alerts/alerts.component';
import { AccessComponent } from './pages/access/access.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuardService } from './services/auth-guard.service';
import { GuestGuardService } from './services/guest-guard.service';
import { SettingsComponent } from './pages/settings/settings.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';

import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { GetEmailPasswordComponent } from './pages/get-email-password/get-email-password.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [GuestGuardService] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
  /* { path: 'post', component: PostComponent, canActivate: [AuthGuardService] }, */
  { path: 'post/:id', component: PostComponent, canActivate: [AuthGuardService] },
  { path: 'explora', component: ExploreComponent, canActivate: [AuthGuardService] },
  { path: 'accesos', component: AccessComponent, canActivate: [AuthGuardService] },
  { path: 'post-list', component: PostListComponent, canActivate: [AuthGuardService] },
  { path: 'room-list', component: RoomListComponent, canActivate: [AuthGuardService] },
  { path: 'mailbox', component: MailboxComponent, canActivate: [AuthGuardService] },
  { path: 'alerts', component: AlertsComponent, canActivate: [AuthGuardService] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuardService] },
  { path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuardService] },
  /* { path: '**', redirectTo: 'home', pathMatch: 'full', canActivate: [AuthGuardService] }, */
  { path: 'forgot-password/:id', component: ForgotPasswordComponent, canActivate: [GuestGuardService] },
  { path: 'get-email', component: GetEmailPasswordComponent, canActivate: [GuestGuardService] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
