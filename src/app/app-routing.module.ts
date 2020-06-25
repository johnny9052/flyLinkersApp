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
  { path: 'profile-edit', loadChildren: './pages/profile-edit/profile-edit.module#ProfileEditPageModule' },
  { path: 'new-post', loadChildren: './pages/new-post/new-post.module#NewPostPageModule' },
  { path: 'detail-post', loadChildren: './pages/detail-post/detail-post.module#DetailPostPageModule' },
  { path: 'view-detail-post', loadChildren: './pages/view-detail-post/view-detail-post.module#ViewDetailPostPageModule' },
  { path: 'profile-detail', loadChildren: './pages/profile-detail/profile-detail.module#ProfileDetailPageModule' },  { path: 'chat', loadChildren: './pages/chat/chat.module#ChatPageModule' },
  { path: 'list-user-likes-post', loadChildren: './pages/list-user-likes-post/list-user-likes-post.module#ListUserLikesPostPageModule' },

  // { path: 'denunciar-post', loadChildren: './pages/denunciar-post/denunciar-post.module#DenunciarPostPageModule' },
  // { path: 'denunciar-usuario', loadChildren: './pages/denunciar-usuario/denunciar-usuario.module#DenunciarUsuarioPageModule' },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
