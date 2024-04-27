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

const routes: Routes = [
  {
      path: '', component: SidenavComponent,
      children: [
        {
          path: 'character-editor', component: CharacterEditorComponent
        },
        {
          path: 'dashboard', component: DashboardComponent
        },
        {
          path: 'characters', component: CharactersComponent
        },
        {
          path: 'character-connections', component: CharacterConnectionsComponent
        },
        {
          path: 'gallery', component: GalleryComponent
        },
        {
          path: 'doc-editor', component: DocEditorComponent
        },
        {
          path: 'chapters', component: ChaptersComponent
        },
        {
          path: 'events', component: EventsComponent
        },
        {
          path: 'event-editor', component: EventEditorComponent
        },
        {
          path: 'timeline', component: TimelineComponent
        }

      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SidenavRoutingModule { }
