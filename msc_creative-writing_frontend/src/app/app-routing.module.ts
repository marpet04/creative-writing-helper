import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterEditorComponent } from './character-editor/character-editor.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { StarterComponent } from './starter/starter.component';
import { InfoComponent } from './info/info.component';
import { DemoComponent } from './demo/demo.component';
import { AuthGuard } from './guards/auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';

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
    path: 'info', 
    component: InfoComponent
  },
  {
    path: 'demo', 
    component: DemoComponent
  },
  {
    path: 'not-found', 
    component: NotFoundComponent
  },
  {
    path: 'nav',
    loadChildren: () => import('./sidenav/sidenav.module').then(m => m.SidenavModule)
  },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
