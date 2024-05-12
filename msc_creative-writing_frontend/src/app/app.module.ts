import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharacterEditorComponent } from './character-editor/character-editor.component';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { StarterComponent } from './starter/starter.component';
import { ImgSliderComponent } from './img-slider/img-slider.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { SidenavModule } from './sidenav/sidenav.module';
import { CharactersComponent } from './characters/characters.component';
import {MatDialogModule} from '@angular/material/dialog';
import { CharacterConnectionsComponent } from './character-connections/character-connections.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatTableModule} from '@angular/material/table';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgxEditorModule } from 'ngx-editor';
import { MatSelectModule } from '@angular/material/select';
import { StoryEditorComponent } from './story-editor/story-editor.component';
import { ChaptersComponent } from './chapters/chapters.component';
import { EventsComponent } from './events/events.component';
import { NgxLeaderLineModule } from 'ngx-leader-line';
import { MatExpansionModule } from '@angular/material/expansion';
import { TimelineComponent } from './timeline/timeline.component';
import { EventEditorComponent } from './event-editor/event-editor.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { ToastrModule } from 'ngx-toastr';
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ProfileComponent } from './profile/profile.component';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { SettingsComponent } from './settings/settings.component';
import { InfoComponent } from './info/info.component';
import { DemoComponent } from './demo/demo.component';
import { DocEditorComponent } from './doc-editor/doc-editor.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    CharacterEditorComponent,
    DashboardComponent,
    LoginComponent,
    RegistrationComponent,
    StarterComponent,
    CharactersComponent,
    CharacterConnectionsComponent,
    StoryEditorComponent,
    ChaptersComponent,
    EventsComponent,
    EventEditorComponent,
    ProfileComponent,
    SettingsComponent,
    InfoComponent,
    DemoComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ImgSliderComponent,
    MatToolbarModule,
    SidenavModule,
    MatDialogModule,
    MatSelectModule,
    MatTooltipModule,
    DragDropModule,
    MatTableModule,
    ColorPickerModule,
    NgxLeaderLineModule,
    MatExpansionModule,
    TimelineComponent,
    NgxLeaderLineModule,
    //AngularFireModule.initializeApp(environment.firebaseConfig),
    //AngularFireAuthModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    ToastrModule.forRoot(),
    DocEditorComponent
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
