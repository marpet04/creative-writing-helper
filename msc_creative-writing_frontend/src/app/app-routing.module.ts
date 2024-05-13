import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterEditorComponent } from './pages/character-editor/character-editor.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { StarterComponent } from './pages/starter/starter.component';
import { InfoComponent } from './pages/info/info.component';
import { DemoComponent } from './pages/demo/demo.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'starter', 
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
    loadChildren: () => import('./pages/sidenav/sidenav.module').then(m => m.SidenavModule)
  },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
