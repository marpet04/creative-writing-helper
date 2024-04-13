import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterEditorComponent } from './character-editor/character-editor.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { StarterComponent } from './starter/starter.component';

const routes: Routes = [
  {
    path: '', 
    component: StarterComponent
  },
  {
    path: 'login', 
    component: LoginComponent
  },
  {
    path: 'registration', 
    component: RegistrationComponent
  },
  {
    path: 'nav',
    loadChildren: () => import('./sidenav/sidenav.module').then(m => m.SidenavModule)
  },
  { path: '**', redirectTo: '/registration' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
