import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidenavComponent } from './sidenav.component';
import { CharacterEditorComponent } from '../character-editor/character-editor.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CharactersComponent } from '../characters/characters.component';

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
        }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SidenavRoutingModule { }
