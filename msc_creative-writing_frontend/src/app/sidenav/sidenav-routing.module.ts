import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidenavComponent } from './sidenav.component';
import { CharacterEditorComponent } from '../character-editor/character-editor.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CharactersComponent } from '../characters/characters.component';
import { CharacterConnectionsComponent } from '../character-connections/character-connections.component';
import { GalleryComponent } from '../gallery/gallery.component';
import { DocEditorComponent } from '../doc-editor/doc-editor.component';
import { ChaptersComponent } from '../chapters/chapters.component';
import { EventsComponent } from '../events/events.component';
import { TimelineComponent } from '../timeline/timeline.component';
import { EventEditorComponent } from '../event-editor/event-editor.component';
import { ProfileComponent } from '../profile/profile.component';
import { SettingsComponent } from '../settings/settings.component';
import { AuthGuard } from '../guards/auth.guard';
import { MenuGuard } from '../guards/menu.guard';
import { NotFoundComponent } from '../not-found/not-found.component';

const routes: Routes = [
  {
      path: '', component: SidenavComponent,
      children: [
        {
          path: 'character-editor', component: CharacterEditorComponent,
          canActivate: [AuthGuard, MenuGuard]
        },
        {
          path: 'dashboard', component: DashboardComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'characters', component: CharactersComponent,
          canActivate: [AuthGuard, MenuGuard]
        },
        {
          path: 'character-connections', component: CharacterConnectionsComponent,
          canActivate: [AuthGuard, MenuGuard]
        },
        {
          path: 'gallery', component: GalleryComponent,
          canActivate: [AuthGuard, MenuGuard]
        },
        {
          path: 'doc-editor', component: DocEditorComponent,
          canActivate: [AuthGuard, MenuGuard]
        },
        {
          path: 'chapters', component: ChaptersComponent,
          canActivate: [AuthGuard, MenuGuard]
        },
        {
          path: 'events', component: EventsComponent,
          canActivate: [AuthGuard, MenuGuard]
        },
        {
          path: 'event-editor', component: EventEditorComponent,
          canActivate: [AuthGuard, MenuGuard]
        },
        {
          path: 'timeline', component: TimelineComponent,
          canActivate: [AuthGuard, MenuGuard]
        },
        {
          path: 'profile', component: ProfileComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'settings', component: SettingsComponent,
          canActivate: [AuthGuard]
        }

      ]
  },
  {
    path: 'not-found', 
    component: NotFoundComponent
  },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SidenavRoutingModule { }
