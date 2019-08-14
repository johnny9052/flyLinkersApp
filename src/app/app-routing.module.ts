import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'log-in', pathMatch: 'full' },
  { path: 'log-in', loadChildren: './pages/log-in/log-in.module#LogInPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'founding-partners', loadChildren: './pages/founding-partners/founding-partners.module#FoundingPartnersPageModule' },
  { path: 'fame-gallery', loadChildren: './pages/fame-gallery/fame-gallery.module#FameGalleryPageModule' },
  { path: 'mission-vision', loadChildren: './pages/mission-vision/mission-vision.module#MissionVisionPageModule' },
  { path: 'first100', loadChildren: './pages/first100/first100.module#First100PageModule' },
  { path: 'master-page', loadChildren: './pages/master-page/master-page.module#MasterPagePageModule' },
  { path: 'notification', loadChildren: './pages/notification/notification.module#NotificationPageModule' },
  { path: 'messages', loadChildren: './pages/messages/messages.module#MessagesPageModule' },
  { path: 'event', loadChildren: './pages/event/event.module#EventPageModule' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'network', loadChildren: './pages/network/network.module#NetworkPageModule' },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
  { path: 'sponsor', loadChildren: './pages/sponsor/sponsor.module#SponsorPageModule' },
  { path: 'interests', loadChildren: './pages/interests/interests.module#InterestsPageModule' },
  { path: 'identify', loadChildren: './pages/identify/identify.module#IdentifyPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
